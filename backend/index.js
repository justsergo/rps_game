const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const socketio = require("socket.io");


require('dotenv').config();

const { RoomList } = require('./utils/roomList');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);
const roomList = new RoomList();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter(app, express));

const {
  getWinPoints,
  mapGameElements
} = require("./utils/battle");

const emitAvailableRooms = () => {
  const freeRooms = Object.keys(roomList.getAllRooms()).filter( (i) => i !== i.length <3 );
  io.emit("available-rooms", freeRooms);
};

io.on("connection", socket => {

  socket.on('reconnect',(userId = '')=>{
    const availableRooms = Object.entries(roomList.getAllRooms());
    if( availableRooms.length !== 0) {
      const [roomName] = availableRooms.find(([_,obj]) => obj[userId]);
      const players = roomList.getPlayers(roomName)
      io.emit('reconnect-room', roomName, players)
    }
  })

  socket.on("get-rooms", () => {
    emitAvailableRooms();
    })

  socket.on("create-room", ({roomId, playerName, playerId}) => {
    socket.join(roomId);
    roomList.addRoom(roomId);
    roomList.addPlayer(roomId, playerName, playerId);
    io.to(roomId).emit("created", roomList.getPlayers(roomId));
    io.to(roomId).emit("created-message", `Room "${roomId}" was created`);
    emitAvailableRooms();
  });

  socket.on("join-room", ({roomId, playerName, playerId}) => {
    const keysRoom = Object.keys(roomList.getRoom(roomId));
    if (keysRoom.length < 3) {

      socket.join(roomId);
      roomList.addPlayer(roomId, playerName, playerId);
      io.to(roomId).emit("joined", roomList.getPlayers(roomId));
      emitAvailableRooms();
    } else {

      io.to(roomId).emit("joined", `${roomId} already exist`);
    }
  });

  socket.on("leave-room",({roomId, playerId}) => {
    socket.leave(roomId);
    roomList.removePlayer(roomId,  playerId);
    io.to(roomId).emit("leaved", roomList.getPlayers(roomId));
    emitAvailableRooms();
  })

  socket.on("remove-room",({roomId})=>{
    roomList.removeRoom(roomId);
    emitAvailableRooms();
  });

  socket.on("choice",({choice, roomId}) => {
    roomList.changeChoice(roomId, socket.id, choice);
    roomList.changeStatus(roomId, socket.id, 'done');
    const playersInRoom = roomList.getRoom(roomId);
    const notReadyPlayers = Object.values(playersInRoom).filter((item)=>item.status !== 'ready');
    if(notReadyPlayers.length === 0) {
      io.to(roomId).emit("choice-result", roomList.getPlayers(roomId));
      roomList.changeChoice(roomId, socket.id, '');
    }
  });

  socket.on("change-status",({status, roomId, playerId }) => {
    roomList.changeStatus(roomId, playerId, status);
    const playersInRoom = roomList.getPlayers(roomId)
    io.to(roomId).emit("status-result", playersInRoom);
    const notReadyPlayers = playersInRoom.filter((item)=>item.status !== 'ready');
    if(notReadyPlayers.length === 0) {
      io.to(roomId).emit("status-ready", roomList.getPlayers(roomId));
    }
  });

  socket.on("multi-battle", ({playerChoices, roomId})=>{
    const output = getWinPoints(playerChoices);
    const result = {
      conclusion: output,
      user: output[1],
      oponents: output[0]
    }
    io.to(roomId).emit("multi-battle-result",result)
  });

  socket.on("single-battle", ({playerChoices, roomId})=>{
    const varibleToChoice = [mapGameElements.ROCK.title, mapGameElements.PAPER.title, mapGameElements.SCISSORS.title];
    const computerChoice = varibleToChoice[Math.floor(Math.random() * varibleToChoice.length)];
    const choices  = [computerChoice,playerChoices];
    const output = getWinPoints(choices);
    const result = {
      conclusion: output,
      user: choices[1],
      computer: choices[0]
    }
    io.to(roomId).emit("single-battle-result",result)
  });

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })

})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

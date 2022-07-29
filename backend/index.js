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
 
  socket.on("create-room", ({roomId, playerName}) => {
    socket.join(roomId);
    roomList.addRoom(roomId);
    roomList.addPlayer(roomId, socket.id, playerName);
    io.to(roomId).emit("created", roomId);
    emitAvailableRooms();
    console.log(1)
  });

  socket.on("join-room", ({roomId, playerName}) => {
    const keysRoom = Object.keys(roomList.getRoom(roomId));
    if (keysRoom.length < 3) {

      socket.join(roomId);
      roomList.addPlayer(roomId, socket.id, playerName);
      io.to(roomId).emit("joined", roomList.getPlayer(roomId, socket.id));
      emitAvailableRooms();

    } else {

      io.to(roomId).emit("joined", `${roomId} already exist`);

    }  
  });
  
  socket.on("leave-room",({roomId}) => {
    socket.leave(roomId);
    roomList.removePlayer(roomId, socket.id);
    io.to(roomId).emit("leaved", roomList.getPlayer(roomId, socket.id));
    emitAvailableRooms();
    console.log(2)
  })

  socket.on("remove-room",({roomId})=>{
    roomList.removeRoom(roomId);
    emitAvailableRooms();
  }); 

  socket.on("choice",({choice, roomId}) => {
    roomList.changeChoice(roomId, socket.id, choice);
    roomList.changeStatus(roomId, socket.id, 'done'); 
    const playersInRoom = roomList.getRoom(roomId);
    const notReadyPlayers = Object.values(playersInRoom).filter((item)=>item.status !== 'done');
    if(notReadyPlayers.length === 0) {
      io.to(roomId).emit("choice-result", roomList.getPlayers(roomId));
      roomList.changeChoice(roomId, socket.id, '');
    }
  });

  socket.on("status",({status, roomId}) => {
    roomList.changeStatus(roomId, socket.id, status);
    io.to(roomId).emit("status-result", roomList.getRoom(roomId)); 
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
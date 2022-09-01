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

const statuses = {
  startBattle: "start",
  readyCheck: "ready-check",
  makeChoice: "make-choice",
  battle: "battle",
  battleFall: "battle-fall",
};

io.on("connection", socket => {

  socket.on('reconnect',({userId = ''})=>{
    const availableRooms = Object.entries(roomList.getAllRooms()) || [];
    if(availableRooms.length !== 0) {
      const [roomName] = availableRooms.find(([_,obj]) => obj.players[userId]) || [];
      if (roomName) {
        const players = roomList.getPlayers(roomName);
        const {roomStatus} = roomList.getRoom(roomName);
        io.emit('reconnect-room', roomName, players, roomStatus);
        return;
      };      
    }
  });

  socket.on("get-rooms", () => {
    emitAvailableRooms();
  });

  socket.on("create-room", ({roomId, playerName, playerId}) => {
    socket.join(roomId);
    roomList.addRoom(roomId);
    roomList.addPlayer(roomId, playerName, playerId);
    io.to(roomId).emit("created", roomList.getPlayers(roomId), `Room "${roomId}" was created`);
    roomList.changeRoomStatus(roomId, statuses.startBattle);
    io.to(roomId).emit("room-status", statuses.startBattle); 
    emitAvailableRooms();
  });

  socket.on("join-room", ({roomId, playerName, playerId}) => {
    const keysRoom = Object.keys(roomList.getRoom(roomId));
    if (keysRoom.length < 6) {
      socket.join(roomId);
      roomList.addPlayer(roomId, playerName, playerId);
      io.to(roomId).emit("joined", roomList.getPlayers(roomId));
      emitAvailableRooms();
      io.to(roomId).emit("room-status", statuses.startBattle); 
    } else {
      io.to(roomId).emit("joined", `${roomId} is full`);
    }
  });

  socket.on("leave-room",({roomId, playerId}) => {   
    const exsisRoom = !!roomList.getRoom(roomId);
    if(exsisRoom) {
      roomList.removePlayer(roomId,  playerId);
      socket.leave(roomId);
      io.to(roomId).emit("leaved", roomList.getPlayers(roomId));
    }   
    emitAvailableRooms();          
  });

  socket.on("remove-room",({roomId})=>{
    roomList.removeRoom(roomId);
    emitAvailableRooms();
  }); 

  socket.on("change-user-status",({status, roomId, playerId }) => {
    roomList.changeUserStatus(roomId, playerId, status);
    const playersInRoom = roomList.getPlayers(roomId);
    io.to(roomId).emit("user-statuses", playersInRoom);
    const readyPlayers = playersInRoom.filter((user)=>user.status === 'user-ready');
    if(readyPlayers.length == playersInRoom.length) {
      roomList.changeRoomStatus(roomId, statuses.makeChoice);
      io.to(roomId).emit("room-status", statuses.makeChoice); 
      return;
    }
    roomList.changeRoomStatus(roomId, statuses.readyCheck);    
    io.to(roomId).emit("room-status", statuses.readyCheck);  
  });

  socket.on("change-user-choice",({choice, roomId, playerId}) => {
    roomList.changeUserChoice(roomId, playerId, choice);   
    io.to(roomId).emit("user-choices", roomList.getPlayers(roomId));  
    // TODO: make status manager and recived i=only statues  
    // io.to(roomId).emit("user-choices", roomList.getPlayersStatus(roomId));
    const playersInRoom = roomList.getPlayers(roomId);
    const notReadyChoices = playersInRoom.filter((user)=> user.choice === '');
    const playersChoices = playersInRoom.map((user)=> user.choice);
    if(!notReadyChoices.length) {
      roomList.changeRoomStatus(roomId, statuses.battle);   
      const winnerResult = getWinPoints(playersChoices);      
      io.to(roomId).emit("battle-result", winnerResult);
    }
  });

  socket.on("single-battle", ({playerChoices, roomId})=>{
    const varibleToChoice = [mapGameElements.ROCK.title, mapGameElements.PAPER.title, mapGameElements.SCISSORS.title];
    const computerChoice = varibleToChoice[Math.floor(Math.random() * varibleToChoice.length)];
    const choices  = [computerChoice, playerChoices];
    const output = getWinPoints(choices);
    const result = {
      conclusion: output,
      user: choices[1],
      computer: choices[0]
    };
    io.to(roomId).emit("single-battle-result", result);
  });

  socket.on("start-battle",({roomId})=>{
    io.to(roomId).emit("room-status", statuses.startBattle);
    const usersId = roomList.getPlayers(roomId).map((user)=>user.userId);
    roomList.changeRoomStatus(roomId, statuses.startBattle);   
    for (let i = 0; i < usersId.length; i++) {
      roomList.changeUserChoice(roomId, usersId[i], '');
      roomList.changeUserStatus(roomId, usersId[i], '');
    }
    io.to(roomId).emit("start-users", roomList.getPlayers(roomId));
  })

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });

})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

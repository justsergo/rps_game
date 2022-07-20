const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const socketio = require("socket.io");


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 
const server = http.createServer(app);
const io = new Server(server);


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

let rooms = {
  room1:{
    socketId1:{
      playerName:'vasya', status:'ready', choice:"ROCK"
    }
  }
};

const availableRooms = () => {  
  io.emit("available-rooms", Object.keys(rooms));
};

io.on("connection", socket => {
 
  socket.on("create-room", ({roomId, playerName}) => {
    socket.join(roomId);
    rooms[roomId] = {[socket.id] : {playerName, status:'waiting', choice:''}};
    io.to(roomId).emit("created", roomId);
    availableRooms();
  });

  socket.on("join-room", ({roomId, playerName}) => {    
    socket.join(roomId);
    rooms[roomId] = {[socket.id] : {playerName, status:'waiting', choice:''}};
    io.to(roomId).emit("joined", Object.values(rooms[roomId]).map((item)=>item.playerName));    
    availableRooms();
  });
  
  socket.on("leave-room",({roomId}) => {
    socket.leave(roomId);
    delete rooms[roomId][socket.id];
    io.to(roomId).emit("leaved", Object.values(rooms[roomId]).map((item)=>item.playerName));
    availableRooms();
  })
  
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

  // event send choice, event status

  socket.on("choice",({choice, roomId}) => {
    const socketData = rooms[roomId][socket.id];
    socketData.choice = choice;
    socketData.status = 'done';
    const notReadyPlayers = Object.values(rooms[roomId]).filter((item)=>item.status !== 'done');
    if(notReadyPlayers.length === 0) {
      io.to(roomId).emit("choice-result", rooms[roomId]);
      rooms[roomId] = Object.values(rooms[roomId]).map((item)=> ({...item, status:'waiting', choice:''}));
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
  })

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })

})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
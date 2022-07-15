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

io.on("connection", socket => {
  io.of("/").adapter.on("join-room", () => {  
    const roomsData = {};
    io.sockets.adapter.rooms.forEach((val, key) => {
      roomsData[key] = Array.from(val).length;
    })
    io.emit("available-rooms", roomsData);    
  });

  socket.on("create-room", ({roomId}) => {
    socket.join(roomId);
    io.to(roomId).emit(`room ${roomId} created`);
  });

  socket.on("join-room", ({roomId, playerName}) => {
    socket.join(roomId);
    io.to(roomId).emit(`player ${playerName} connected`);
  });
  
  socket.on("leave-room",({roomId,playerName})=>{
    socket.leave(roomId);
    io.to(roomId).emit(`player ${playerName} disconnected`);
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
  })

  socket.on("multi-battle", ({playerChoices, roomId})=>{
    const output = getWinPoints(playerChoices);
    const result = {
      conclusion: output,
      user: choices[1],
      oponents: choices[0]
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

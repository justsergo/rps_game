const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const { Server } = require("socket.io");
const { RoomList } = require("./utils/roomList");
const usersRouter = require("./routes/users");
const { timer } = require("./utils/timer");
const { STATUSES } = require("./constants/statuses");


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
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
})

app.use("/users", usersRouter(app, express));

const {
  getWinPoints,
  mapGameElements
} = require("./utils/battle");

const emitAvailableRooms = () => {
  const freeRooms = Object.keys(roomList.getAllRooms()).filter((i) => i.length < 10);
  io.emit("available-rooms", freeRooms);
};

  let timerId = null;
io.on("connection", socket => {

  socket.on("reconnect",({userId = ""})=>{
    const availableRooms = Object.entries(roomList.getAllRooms()) || [];

    if(availableRooms.length !== 0) {
      const [roomName] = availableRooms.find(([_,obj]) => obj.players[userId]) || [];

      if (roomName) {
        const players = roomList.getPlayers(roomName);
        const {roomStatus} = roomList.getRoom(roomName);
        const {roomType} = roomList.getRoom(roomName);
        io.emit("reconnect-room", roomName, players, roomStatus, roomType);
        return;
      };     

    }
  });

  socket.on("get-rooms", () => {
    emitAvailableRooms();
  });

  socket.on("create-room", ({roomId, playerName, playerId, gameType}) => {    
    socket.join(roomId);
    roomList.addRoom(roomId);
    roomList.changeRoomType(roomId, gameType)
    roomList.addPlayer(roomId, playerName, playerId);

    if (gameType === "single") {
      roomList.addBot(roomId);
    }

    io.to(roomId).emit("created", roomList.getPlayers(roomId), `Room ${roomId} was created`);
    roomList.changeRoomStatus(roomId, STATUSES.startBattle);
    io.to(roomId).emit("room-status", STATUSES.startBattle); 
    emitAvailableRooms();
  });

  socket.on("join-room", ({roomId, playerName, playerId}) => {
    const keysRoom = Object.keys(roomList.getRoom(roomId));
    roomList.changeRoomType(roomId, "multi")

    if (keysRoom.length <= 6) {
      socket.join(roomId);
      roomList.addPlayer(roomId, playerName, playerId);
      io.to(roomId).emit("joined", roomList.getPlayers(roomId));
      emitAvailableRooms();
      io.to(roomId).emit("room-status", STATUSES.startBattle); 
    } 
    
    else {
      io.to(roomId).emit("joined", `${roomId} is full`);
    }
  });

  socket.on("leave-room", ({roomId, playerId}) => {   
    const isExsisRoom = !!roomList.getRoom(roomId);
    const playersInRoom = roomList.getPlayers(roomId);

    if(isExsisRoom) {
      roomList.removePlayer(roomId, playerId);
      socket.leave(roomId);
      io.to(roomId).emit("leaved", roomList.getPlayers(roomId));
    }

    if (playersInRoom?.length === 0) {
      roomList.removeRoom(roomId);
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
     
    const readyPlayers = playersInRoom.filter((user)=>user.status === "user-ready");

    if(readyPlayers.length === 1) {
      timerId = timer({ count: 10, callback:(leftTime) => io.to(roomId).emit("timer", leftTime) }); 
    };

    if(readyPlayers.length == playersInRoom.length) {   
      clearInterval(timerId)
      timerId = timer({ count: 5 , callback:(leftTime) => io.to(roomId).emit("timer", leftTime) });
      roomList.changeRoomStatus(roomId, STATUSES.makeChoice);
      io.to(roomId).emit("room-status", STATUSES.makeChoice); 
      return;
    }

    roomList.changeRoomStatus(roomId, STATUSES.readyCheck);    
    io.to(roomId).emit("room-status", STATUSES.readyCheck);  
  });

  socket.on("change-user-choice",({choice, roomId, playerId}) => {
    roomList.changeUserChoice(roomId, playerId, choice);   
    io.to(roomId).emit("user-choices", roomList.getPlayers(roomId));  
    const playersInRoom = roomList.getPlayers(roomId);
    const notReadyChoices = playersInRoom.filter((user)=> user.choice === "" && user.userType === "user");

    if(!notReadyChoices.length) { 
      const {roomType} = roomList.getRoom(roomId) || '';
      const varibleToChoice = [mapGameElements.ROCK.title, mapGameElements.PAPER.title, mapGameElements.SCISSORS.title];
      const computerChoice = varibleToChoice[Math.floor(Math.random() * varibleToChoice.length)];

      clearInterval(timerId);
      timer({ count: 4 , callback:(leftTime) => io.to(roomId).emit("timer", leftTime) });

      if (roomType === "single") {        
        const [{userId}] = roomList.getBot(roomId);
        roomList.changeUserChoice(roomId, userId, computerChoice);   
        io.to(roomId).emit("user-choices", roomList.getPlayers(roomId));    
      }

      const playersChoices = playersInRoom.map((user)=> user.userType === "user" ? user.choice : computerChoice );
      const battleResult = getWinPoints(playersChoices); 
      roomList.changeRoomStatus(roomId, STATUSES.battle);           
      io.to(roomId).emit("battle-result", battleResult);
    }
  });

  socket.on("start-battle",({roomId})=>{   
    const usersId = roomList.getPlayers(roomId).filter((user)=>user.userType === "user").map((user)=>user.userId);
    roomList.changeRoomStatus(roomId, STATUSES.startBattle);  
    io.to(roomId).emit("room-status", STATUSES.startBattle); 

    for (let i = 0; i < usersId.length; i++) {
      roomList.changeUserChoice(roomId, usersId[i], "");
      roomList.changeUserStatus(roomId, usersId[i], "");
    }

    io.to(roomId).emit("start-users", roomList.getPlayers(roomId));
  })

  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });

})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

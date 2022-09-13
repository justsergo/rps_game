import { io } from "socket.io-client";

const socket = io("/");
class SocketList {
  emitCheckAvailableRooms(callback) {
    socket.on("available-rooms", (newRooms) => callback(newRooms));
  }

  emitGetAllRooms(callback) {
    socket.emit("get-rooms", (rooms) => callback(rooms));
  }

  emitReconnect(id) {
    socket.emit("reconnect", ({ userId: id }));
  }

  emitLeaveRoom(rooms, id) {
    socket.emit("leave-room", { roomId: rooms.currentRoom, playerId: id });
  }

  emitCreateRoom(roomId, userName, id, gameType) {
    socket.emit("create-room", {
      roomId, playerName: userName, playerId: id, gameType,
    });
  }

  emitStartBattle(rooms) {
    socket.emit("start-battle", { roomId: rooms.currentRoom });
  }

  emitChangeUserChoice(playerChoice, rooms, id) {
    socket.emit("change-user-choice", {
      choice: playerChoice, roomId: rooms.currentRoom, playerId: id,
    });
  }

  emitChangeUserStatus(rooms, id) {
    socket.emit("change-user-status", { status: "user-ready", roomId: rooms.currentRoom, playerId: id });
  }

  emitJoinRoom(roomId, userName, id) {
    socket.emit("join-room", { roomId, playerName: userName, playerId: id });
  }

  listenerReconnect(callback) {
    socket.on("reconnect-room", (roomName, refreshedUsers, roomStatus, roomtype) => callback(roomName, refreshedUsers, roomStatus, roomtype));
  }

  listenerCreateRoom(callback) {
    socket.on("created", (users, message) => callback(users, message));
  }

  listenerJoinRoom(callback) {
    socket.on("joined", (users) => callback(users));
  }

  listenerLeaveRoom(callback) {
    socket.on("leaved", (users) => callback(users));
  }

  listenerStatusRoom(callback) {
    socket.on("room-status", (roomStatus) => callback(roomStatus));
  }

  listenerStatusUser(callback) {
    socket.on("user-statuses", (playersStatus) => callback(playersStatus));
  }

  listenerChoiceUser(callback) {
    socket.on("user-choices", (choice) => callback(choice));
  }

  listenerResultBattle(callback) {
    socket.on("battle-result", (res) => callback(res));
  }

  listenerRefreshBattle(callback) {
    socket.on("start-users", (refreshedUsers) => callback(refreshedUsers));
  }

  listenerTimer(callback) {
    socket.on("timer", (leftTime) => callback(leftTime));
  }
}

export default SocketList;

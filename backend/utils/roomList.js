class RoomList {
    constructor(){
        this.roomList = {};
    }

    addRoom (roomId) {
        this.roomList = { ...this.roomList, [roomId]: {roomStatus: 'start', players:{}}};
    }

    getRoom (roomId) {
        return this.roomList[roomId];
    }

    getAllRooms () {
        return this.roomList;
    }

    removeRoom (roomId) {
        delete this.roomList[roomId];
    }

    changeRoomStatus (roomId, status) {
        this.roomList[roomId].roomStatus = status;
    }

    addPlayer (roomId, playerName, playerId) {
        this.roomList[roomId].players = { ...this.roomList[roomId].players, [playerId] : {playerName, status:'', choice:'', userId: playerId} };
    }

    getPlayer (roomId, playerId) {
        return this.roomList[roomId].players[playerId];
    }

    getPlayers (roomId) {
        return Object.values(this.roomList[roomId].players);
    }

    getPlayersStatus (roomId) {
        return Object.values(this.roomList[roomId].players).map((user)=>({...user, choice:''}));
    }

    removePlayer (roomId, playerId) {
        delete this.roomList[roomId].players[playerId];
    }

    changeUserStatus (roomId, playerId, status) {
        this.roomList[roomId].players[playerId] = { ...this.roomList[roomId].players[playerId], status };
    }

    changeUserChoice (roomId, playerId, choice) {
        this.roomList[roomId].players[playerId] = { ...this.roomList[roomId].players[playerId], choice };
    }

    clearUserInfo (roomId) {
        this.roomList[roomId].players = { ...this.roomList[roomId].players, choice:'', status:'' };
    }
}

module.exports = { RoomList };

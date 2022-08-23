class RoomList {
    constructor(){
        this.roomList = {};
    }

    addRoom (roomId) {
        this.roomList = { ...this.roomList, [roomId]: {} };
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

    addPlayer (roomId, playerName, playerId) {
        this.roomList[roomId] = { ...this.roomList[roomId], [playerId] : {playerName, status:'', choice:''} };
    }

    getPlayer (roomId, playerId) {
        return this.roomList[roomId][playerId];
    }

    getPlayers (roomId) {
        return Object.values(this.roomList[roomId]);
    }

    removePlayer (roomId, playerId) {
        delete this.roomList[roomId][playerId];
    }

    changeStatus (roomId, playerId, status) {
        this.roomList[roomId][playerId] = { ...this.roomList[roomId][playerId], status };
    }

    changeChoice (roomId, playerId, choice) {
        this.roomList[roomId][playerId] = { ...this.roomList[roomId][playerId], choice };
    }
}

module.exports = { RoomList };

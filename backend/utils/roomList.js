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

    addPlayer (roomId, socketId, playerName) {
        this.roomList[roomId] = { ...this.roomList[roomId], [socketId] : {playerName, status:'', choice:''} };      
    }

    getPlayer (roomId, socketId) {
        return this.roomList[roomId][socketId];
    }

    getPlayers (roomId) {
        return Object.values(this.roomList[roomId]);
    }

    removePlayer (roomId, socketId) {
        delete this.roomList[roomId][socketId];
    }

    changeStatus (roomId, socketId, status) {
        this.roomList[roomId][socketId] = { ...this.roomList[roomId][socketId], status };
    }

    changeChoice (roomId, socketId, choice) {
        this.roomList[roomId][socketId] = { ...this.roomList[roomId][socketId], choice };
    }
}

module.exports = { RoomList };
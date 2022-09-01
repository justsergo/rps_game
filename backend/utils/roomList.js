class RoomList {
    constructor(){
        this.roomList = {};
    }

    addRoom (roomId) {
        this.roomList = { ...this.roomList, [roomId]: {roomType:'', roomStatus: 'start', players:{}}};
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
        if (this.roomList[roomId]?.roomStatus) {
            this.roomList[roomId].roomStatus = status;
        }
    }

    changeRoomType (roomId, type) {
        this.roomList[roomId].roomType = type;
    }

    addPlayer (roomId, playerName, playerId, userType='user') {
        this.roomList[roomId].players = { ...this.roomList[roomId].players, [playerId] : {playerName, status:'', choice:'', userId: playerId, userType} };
    }

    addBot (roomId, userType='bot') {
        const botID = `bot${Math.random()}`;
        this.roomList[roomId].players = { 
            ...this.roomList[roomId].players, [botID] : {
                playerName:'BOT', status:'user-ready', choice:'', userId: botID, userType
            } 
        };
    }

    getBot (roomId) {
        return Object.values(this.roomList[roomId].players).filter((user)=>user.userType === 'bot');
    }

    getPlayer (roomId, playerId) {
        return this.roomList[roomId].players[playerId];
    }

    getPlayers (roomId) {
        if (this.roomList[roomId]?.players) {
            return Object.values(this.roomList[roomId].players);
        }
        return []
    }

    getPlayersStatus (roomId) {
        return Object.values(this.roomList[roomId].players).map((user)=>({...user, choice:''}));
    }

    removePlayer (roomId, playerId) {
        delete this.roomList[roomId].players[playerId];
    }

    changeUserStatus (roomId, playerId, status) {
        if (this.roomList[roomId]?.players) {
            this.roomList[roomId].players[playerId] = { ...this.roomList[roomId].players[playerId], status };
        }
    }

    changeUserChoice (roomId, playerId, choice) {
        if (this.roomList[roomId]?.players) {
            this.roomList[roomId].players[playerId] = { ...this.roomList[roomId].players[playerId], choice };
        }
    }

    clearUserInfo (roomId) {
        this.roomList[roomId].players = { ...this.roomList[roomId].players, choice:'', status:'' };
    }
}

module.exports = { RoomList };

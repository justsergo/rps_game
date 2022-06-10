const rooms = {};

const createRoom = (roomId, player1Id) => {
    rooms[roomId] = [player1Id, ""];
}

const joinRoom = (roomId, player2Id) => {
    rooms[roomId][1] = player2Id;
}

const exitRoom = (roomId, player) => {
    if (player === 1) {
        delete rooms[roomId];
    } else {
        rooms[roomId][1] = "";
    }
}

const RPS = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2,
  };
  
const winMatrix = [
[0, -1, 1],
[1, 0, -1],
[-1, 1, 0],
];

const getWinPoints = (player1Chose, player2Chose) => {
    const player_index = Object.keys(RPS).find((key) => RPS[key] === player1Chose);
    const opponent_index = Object.keys(RPS).find((key) => RPS[key] === player2Chose);
return winMatrix[RPS[player_index]][RPS[opponent_index]];
};


module.exports = {
    rooms,
    createRoom,
    joinRoom,
    exitRoom,
    getWinPoints
};
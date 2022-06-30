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

// EXAMPLE how it`s works
// const elems = [RPS.ROCK, RPS.ROCK,RPS.ROCK,RPS.PAPER,RPS.SCISSORS, RPS.SCISSORS,RPS.PAPER, RPS.PAPER,RPS.SCISSORS,]
// const uniquElem = elems.filter((x, i, a) => a.indexOf(x) == i)
// console.log(uniquElem) [0,1,2]

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

const getWinPoints = (playerChoices) => {
    if (Array.isArray(playerChoices)) {
        const uniqueChoises = playerChoices.filter((x, i, a) => a.indexOf(x) == i)
        if (uniqueChoises.length === 2) {
            return winMatrix[uniqueChoises[0]][uniqueChoises[1]]
        } else { 
            return 0
        }        
    } else {
        return 'incorrect choises or it`s not array'
    }
};

module.exports = {
    rooms,
    createRoom,
    joinRoom,
    exitRoom,
    getWinPoints
};

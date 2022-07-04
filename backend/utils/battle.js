const mapElements = {
    ROCK: {
        value: 0,
        title: 'ROCK'
    },
    PAPER: {
        value: 1,
        title: 'PAPER'
    },
    SCISSORS: {
        value: 2,
        title: 'SCISSORS'
    },
};


const winMatrix = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0],
];

const drawValues = [1, 3];

const matchWinner = (a, b) => {
    const aValue = mapElements[a].value;
    const bValue = mapElements[b].value;
    const result = winMatrix[aValue][bValue];

    if (result === 1) return mapElements[a].title;
    if (result === -1) return mapElements[b].title;
    return "DRAW";
}

const getWinPoints = (playerChoices) => {
    if (!Array.isArray(playerChoices)) {
        return 'Incorrect choises or it`s not array';
    }

    const uniqueChoises = playerChoices.filter((x, i, a) => a.indexOf(x) == i);
    if (drawValues.includes(uniqueChoises.length)) {
        return 'DRAW';
    }
    
    return matchWinner(uniqueChoises[0],uniqueChoises[1]);
};

module.exports = {
   getWinPoints
};
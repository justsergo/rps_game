const mapGameElements = {
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

const matchWinner = (a, b) => {
    const aValue = mapGameElements[a].value;
    const bValue = mapGameElements[b].value;
    const result = winMatrix[aValue][bValue];

    if (result === 1) return mapGameElements[a].title;
    if (result === -1) return mapGameElements[b].title;
    return null;
}

const getWinPoints = (playerChoices) => {
    if (!Array.isArray(playerChoices)) {
        return 'Incorrect choises or it`s not array';
    }

    const uniqueChoises = playerChoices.filter((x, i, a) => a.indexOf(x) == i && x !== undefined && x !== '');
    if (uniqueChoises.length!==2) {
        return null;
    }
    
    return matchWinner(uniqueChoises[0],uniqueChoises[1]);
};

module.exports = {
   getWinPoints,
   mapGameElements
};
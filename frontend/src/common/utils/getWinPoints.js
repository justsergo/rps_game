export const RPS = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};

const winMatrix = [
  [0, -1, 1],
  [1, 0, -1],
  [-1, 1, 0],
];

export const getWinPoints = (playerChoice, computerChoice) => winMatrix[RPS[playerChoice]][RPS[computerChoice]];

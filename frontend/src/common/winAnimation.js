export const winAnimation = ({ isPlayer, resultPoint }) => {
  if (isPlayer && resultPoint === 1) {
    return true;
  }
  return !isPlayer && resultPoint === -1;
};

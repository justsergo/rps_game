import { getWinPoints } from "frontend/src/common/utils/getWinPoints";
import { GAME_ITEMS } from "frontend/src/constants/names";
import {
  createContext, useCallback, useMemo, useState,
} from "react";

export const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const [myChoice, setMyChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [resultPoint, setResultPoint] = useState(null);

  const newComputerChoice = useCallback(() => {
    const randomChoice = Math.floor(Math.random() * Object.keys(GAME_ITEMS).length);
    setComputerChoice(Object.values(GAME_ITEMS)[randomChoice]);
  }, []);

  const result = useCallback(() => {
    setResultPoint(getWinPoints(myChoice, computerChoice));
  }, [computerChoice, myChoice]);

  const clearChoice = () => {
    setResultPoint(null);
  };

  const contextValue = useMemo(() => ({
    setMyChoice,
    myChoice,
    computerChoice,
    newComputerChoice,
    result,
    resultPoint,
    clearChoice,
  }), [setMyChoice, myChoice, computerChoice, newComputerChoice, result, resultPoint]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

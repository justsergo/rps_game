import {
  createContext, useEffect, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [isBattle, toggleBattle] = useState(false);

  const [result, setResultBattle] = useState({
    conclusion: "",
    user: "",
    computer: "",
  });

  const [messageOptions, setMessageOptions] = useState([]);

  const [score, setScore] = useState(0);

  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (result.conclusion === result.user && !counter) {
      setMessageOptions(["You", "Win"]);
      setScore((s) => s + 1);
    }
    if (result.conclusion === result.computer && !counter) {
      setMessageOptions(["You", "Lose"]);
      setScore((s) => s - 1);
    }
    if (result.conclusion === null && !counter) {
      setMessageOptions(["Draw", ""]);
      setScore((s) => s + 0);
    }
  }, [result, counter]);

  useEffect(() => {
    let timer = 0;
    if (isBattle) {
      timer = counter > 0 ? setTimeout(() => {
        setCounter(counter - 1);
      }, 1000) : 0;
    }
    if (!isBattle) {
      setCounter(3);
      clearTimeout(timer);
    }
  }, [isBattle, counter]);

  const emitUserChoice = ({ playerChoice }) => {
    socket.emit("single-battle", { playerChoices: playerChoice, roomId: "free1" });
    toggleBattle(true);
  };

  useEffect(() => {
    socket.on("single-battle-result", (res) => {
      setResultBattle({
        conclusion: res.conclusion,
        computer: res.computer,
        user: res.user,
      });
    });
    return () => socket.off("single-battle-result");
  }, []);

  const contextValue = useMemo(() => ({
    isBattle,
    toggleBattle,
    socket,
    emitUserChoice,
    result,
    messageOptions,
    score,
    counter,
  }), [isBattle, toggleBattle, result, messageOptions, score, counter]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

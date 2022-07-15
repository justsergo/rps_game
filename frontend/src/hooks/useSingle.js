import { useContext, useEffect, useState } from "react";

import { GameContext } from "../services/gameContext";

export const useSingle = () => {
  const { isBattle, toggleBattle, socket } = useContext(GameContext);

  const [result, setResultBattle] = useState({
    conclusion: "",
    user: "",
    computer: "",
  });

  const [messageOptions, setMessageOptions] = useState([]);

  const [score, setScore] = useState(0);

  // TODO: fix that, return only you lose
  useEffect(() => {
    if (result.conclusion && result.conclusion === result.user) {
      setMessageOptions(["You", "Win"]);
      setScore((s) => s + 1);
    }
    if (result.conclusion && result.conclusion === result.computer) {
      setMessageOptions(["You", "Lose"]);
      setScore((s) => s - 1);
    }
    if (result.conclusion && result.conclusion === null) {
      setMessageOptions(["Draw", ""]);
      setScore((s) => s + 0);
    }
  }, [result]);

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

  return {
    isBattle, toggleBattle, emitUserChoice, result, messageOptions, score,
  };
};

import { Typography } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import GameTimer from "./timer";

const ExpectationBattle = () => {
  const { isBattle, toggleBattle } = useContext(GameContext);

  if (!isBattle.multi) {
    return (
      <>
        <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>
          battle is coming
        </Typography>
        <GameTimer startTime={3} callBack={() => toggleBattle({ ...isBattle, multi: true })} />
      </>
    );
  }
  return null;
};

export default ExpectationBattle;

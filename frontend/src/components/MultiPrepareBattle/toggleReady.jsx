import { Button, Typography } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import GameTimer from "./timer";

const ToggleReadyEvent = ({ changeStatus }) => {
  const { isBattle } = useContext(GameContext);

  if (isBattle.users.isUserReady) {
    return (
      <>
        <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>waiting for opponents</Typography>
        <GameTimer c />
      </>
    );
  }
  if (!isBattle.users.isAllPlayersReady) {
    return (
      <Button size="medium" variant="contained" color="common" sx={{ mt: "20px" }} onClick={() => changeStatus()}>
        I`m ready
      </Button>
    );
  }
  return null;
};

export default ToggleReadyEvent;

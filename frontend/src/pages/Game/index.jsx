import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";

import BattleMessage from "../../components/gameLogic/battleMessage";
import MakeChoice from "../../components/gameLogic/makeChoice";
import Players from "../../components/gameLogic/players";
import GameTimer from "../../components/gameLogic/timer";
import RequestSnackbar from "../../components/ui/RequestSnackbar";
import { STATUSES } from "../../constants/statuses";
import { GameContext } from "../../services/gameContext";

const Game = () => {
  const {
    successRoomMessage, emitChangeStatus, battleManager, thisUser, timer,
  } = useContext(GameContext);

  const changeStatus = () => {
    emitChangeStatus();
  };

  console.log(battleManager.roomStatus);

  const ToggleScreens = () => {
    switch (battleManager.roomStatus) {
      case STATUSES.startBattle:
        return (
          <Button size="medium" variant="contained" color="common" sx={{ mt: "20px" }} onClick={() => changeStatus()}>
            I`m ready
          </Button>
        );

      case STATUSES.readyCheck:
        if (thisUser.status === STATUSES.userReady) {
          return (
            <>
              <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>waiting for opponents</Typography>
              <GameTimer leftTime={timer} />
            </>
          );
        }
        return (
          <>
            <Button size="medium" variant="contained" color="common" sx={{ position: "absolute", top: "56%" }} onClick={() => changeStatus()}>
              I`m ready
            </Button>
            <GameTimer leftTime={timer} />
            <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>Are you ready?</Typography>
          </>
        );

      case STATUSES.makeChoice:
        return <MakeChoice />;

      case STATUSES.battle:
        return timer !== 0
          ? (
            <>
              <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>
                battle is coming
              </Typography>
              <GameTimer leftTime={timer} />
            </>
          ) : <BattleMessage />;

      case STATUSES.userFall:
        return <BattleMessage />;

      case STATUSES.battleFall:
        return <BattleMessage />;

      default:
        return null;
    }
  };

  return (
    <>
      <Grid
        container
        height="100%"
        sx={{
          position: "relative", alignItems: "center", justifyContent: "center",
        }}
      >
        <Players />
        <ToggleScreens />
      </Grid>
      <RequestSnackbar success={successRoomMessage} />
    </>
  );
};

export default Game;

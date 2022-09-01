import { Button, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { GameContext } from "../../services/gameContext";
import { RequestSnackbar } from "../Snackbars/RequestSnackbar";
import BattleMessage from "./battleMessage";
import MakeChoice from "./makeChoice";
import Players from "./players";
import GameTimer from "./timer";

const PrepareBattle = () => {
  const {
    successRoomMessage, emitChangeStatus, battle, emitMultiUserChoice, toggleBattle, statuses, thisUser,
  } = useContext(GameContext);

  const [isComingBattle, toggleComingBattle] = useState(true);

  const iconEvent = (e) => {
    emitMultiUserChoice({ playerChoice: e.currentTarget.id });
  };
  const changeStatus = () => {
    emitChangeStatus();
    toggleBattle({ ...battle, users: { isUserReady: true } });
  };

  const ToggleScreens = () => {
    switch (battle.roomStatus) {
      case statuses.startBattle:
        return (
          <Button size="medium" variant="contained" color="common" sx={{ mt: "20px" }} onClick={() => changeStatus()}>
            I`m ready
          </Button>
        );

      case statuses.readyCheck:
        if (thisUser.status === "user-ready") {
          return (
            <>
              <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>waiting for opponents</Typography>
              <GameTimer startTime={10} />
            </>
          );
        }
        return (
          <>
            <Button size="medium" variant="contained" color="common" sx={{ position: "absolute", top: "56%" }} onClick={() => changeStatus()}>
              I`m ready
            </Button>
            <GameTimer startTime={10} />
            <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>Are you ready?</Typography>
          </>
        );

      case statuses.makeChoice:
        return isComingBattle
          ? (
            <>
              <Typography variant="opponentTittle" sx={{ position: "absolute", top: "40%" }}>
                battle is coming
              </Typography>
              <GameTimer startTime={3} callBack={() => toggleComingBattle(false)} />
            </>
          )

          : <MakeChoice iconEvent={iconEvent} />;

      case statuses.battle:
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

export default PrepareBattle;

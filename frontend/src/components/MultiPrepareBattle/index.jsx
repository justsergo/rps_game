import { Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import { RequestSnackbar } from "../Snackbars/RequestSnackbar";
import ExpectationBattle from "./expectationBattle";
import MakeChoice from "./makeChoice";
import Players from "./players";
import ToggleReadyEvent from "./toggleReady";

const PrepareBattle = () => {
  const {
    successRoomMessage, emitChangeStatus, isBattle, emitMultiUserChoice, toggleBattle,
  } = useContext(GameContext);

  const iconEvent = (e) => {
    emitMultiUserChoice({ playerChoice: e.currentTarget.id });
  };
  const changeStatus = () => {
    emitChangeStatus();
    toggleBattle({ ...isBattle, users: { isUserReady: true } });
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
        {!isBattle.multi && (<ToggleReadyEvent changeStatus={changeStatus} />)}
        {isBattle.users.isAllPlayersReady && (<ExpectationBattle />)}
        {isBattle.multi && <MakeChoice iconEvent={iconEvent} />}
      </Grid>
      <RequestSnackbar success={successRoomMessage} />
    </>
  );
};

export default PrepareBattle;

import { Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import { RequestSnackbar } from "../Snackbars/RequestSnackbar";
import Triangle from "../Triangle";
import UserInfoBlock from "../UserBattleInfo";

const MultiSelectionButtons = () => {
  const { emitMultiUserChoice, successRoomMessage } = useContext(GameContext);

  const iconEvent = (e) => {
    emitMultiUserChoice({ playerChoice: e.currentTarget.id });
  };

  return (
    <>
      <Grid container height="100%">

        <UserInfoBlock />

        <Grid
          container
          sx={{
            flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", height: "100%",
          }}
        >
          <Triangle onClick={iconEvent} />
        </Grid>

      </Grid>
      <RequestSnackbar success={successRoomMessage} />
    </>
  );
};

export default MultiSelectionButtons;

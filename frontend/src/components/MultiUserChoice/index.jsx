import {
  Box, Button, Grid, Typography,
} from "@mui/material";
import { useContext, useState } from "react";

import { GameContext } from "../../services/gameContext";
// import UserInfoBlock from "../UserBattleInfo";
import ChoiceButton from "../ChoiceButton";
import { RequestSnackbar } from "../Snackbars/RequestSnackbar";
import Triangle from "../Triangle";
import { Circle } from "./style";

const UsersChoice = () => {
  const {
    successRoomMessage, players, emitChangeStatus,
  } = useContext(GameContext);
  const [isOpenTriangle, toggleOpenTriangle] = useState(false);

  const iconEvent = () => {
    // emitMultiUserChoice({ playerChoice: e.currentTarget.id });
    toggleOpenTriangle((prev) => !prev);
  };
  const Players = () => players
    .map((infoPlayer, index, array) => {
      const angle = (360 / array.length) * index;
      const x = (Math.sin(angle / (180 / Math.PI)) * 240) * -1;
      const y = (Math.cos(angle / (180 / Math.PI)) * 240) * -1;
      const marginTop = 10;
      return (
        <Grid
          item
          xs={4}
          sx={{
            transform: `translate(${x}%, ${y + marginTop}%)`, position: "absolute",
          }}
          key={infoPlayer + Math.random()}
        >
          <Typography
            sx={{
              position: "absolute", top: "-30px", transform: "translateX(-50%)", left: "50%",
            }}
            variant="playerTittle"
          >{infoPlayer.user}
          </Typography>
          <Box
            onClick={infoPlayer.status === "1" ? (e) => iconEvent(e) : null}
            sx={{ height: "fit-content", position: "relative" }}
          >
            <ChoiceButton choice="" isPlayer size="iconWrap" />
            <Circle />

          </Box>

        </Grid>
      );
    });
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
        {!isOpenTriangle && <Button size="medium" variant="contained" color="common" sx={{ mt: "20px" }} onClick={() => emitChangeStatus()}>I`m ready</Button>}
        {isOpenTriangle && <Triangle onClick={(e) => iconEvent(e)} size="iconWrapXS" />}
      </Grid>
      <RequestSnackbar success={successRoomMessage} />
    </>
  );
};

export default UsersChoice;

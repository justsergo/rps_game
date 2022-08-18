import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import ChoiceButton from "../ChoiceButton";
import { Circle } from "./style";

const Players = () => {
  const { players } = useContext(GameContext);

  return players.map((infoPlayer, index, array) => {
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
        >{infoPlayer.playerName}
        </Typography>
        <Box sx={{ height: "fit-content", position: "relative" }}>
          <ChoiceButton choice="" isPlayer size="iconWrap" />
          <Circle status={!!infoPlayer.status} />

        </Box>

      </Grid>
    );
  });
};

export default Players;

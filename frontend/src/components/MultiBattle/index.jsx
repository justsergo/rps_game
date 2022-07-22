import { Box, Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import ChoiceButton from "../ChoiceButton";
import GameItemContainer from "../GameItemContainer";
import ResultMessage from "../ResultMessage";
import { GameResultGrid, StyledTypography } from "./style";

const MultiBattle = () => {
  const { multiBattleResult, counter, players } = useContext(GameContext);

  const Oponents = () => players.map((i) => {
    return (
      <Grid item xs={4} sx={{ margin: "auto", flexDirection: "column" }} key={i + Math.random()}>
        <Box sx={{ height: "105px" }}>
          <StyledTypography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>The House Picked</StyledTypography>
        </Box>
        <Box sx={{ height: "fit-content", marginTop: "10px" }}>
          {counter === 0
            ? <ChoiceButton choice="ROCK" timeout={counter} isPlayer={false} />
            : <GameItemContainer timer={counter} />}
        </Box>
      </Grid>
    );
  });

  return (
    <Grid container sx={{ margin: "auto", paddingTop: "7%", position: "relative" }}>
      <Grid item xs={4} sx={{ margin: "auto", flexDirection: "column" }}>
        <Box sx={{ height: "105px" }}>
          <StyledTypography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>You Picked</StyledTypography>
        </Box>

        <Box sx={{ height: "fit-content", marginTop: "10px" }}>
          <ChoiceButton choice={multiBattleResult.user} isPlayer />
        </Box>

      </Grid>

      <GameResultGrid item xs={8} sm={3} md={2}>
        {counter === 0
      && (
        <ResultMessage />
      )}
      </GameResultGrid>

      <Oponents />

    </Grid>
  );
};

export default MultiBattle;

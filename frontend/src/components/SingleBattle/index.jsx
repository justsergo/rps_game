import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { GameResultGrid, StyledTypography } from "../../pages/single_player/Battle/styles";
import { GameContext } from "../../services/gameContext";
import ChoiceButton from "../ChoiceButton";
import GameItemContainer from "../GameItemContainer";
import ResultMessage from "../ResultMessage";

const SingleBattle = () => {
  const {
    result, myChoice, computerChoice, newComputerChoice,
  } = useContext(GameContext);
  const [counter, setCounter] = useState(3);

  useEffect(() => {

  });

  useEffect(() => {
    newComputerChoice();
  }, []);

  useEffect(() => {
    const timer = counter > 0 ? setTimeout(() => {
      setCounter(counter - 1);
    }, 1000) : result();
    return () => {
      clearTimeout(timer);
    };
  }, [counter, result]);

  return (
    <Grid container xs={12} sx={{ margin: "auto", paddingTop: "7%", position: "relative" }}>
      <Grid item xs={4} sx={{ margin: "auto", flexDirection: "column" }}>
        <Box sx={{ height: "105px" }}>
          <StyledTypography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>You Picked</StyledTypography>
        </Box>

        <Box sx={{ height: "fit-content", marginTop: "10px" }}>
          <ChoiceButton choice={myChoice} isPlayer />
        </Box>

      </Grid>

      <GameResultGrid item xs={8} sm={3} md={2}>
        <ResultMessage />
      </GameResultGrid>

      <Grid item xs={4} sx={{ margin: "auto", flexDirection: "column" }}>
        <Box sx={{ height: "105px" }}>
          <StyledTypography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>The House Picked</StyledTypography>
        </Box>
        <Box sx={{ height: "fit-content", marginTop: "10px" }}>
          {counter === 0 ? (
            <>
              <ChoiceButton choice={computerChoice} timeout={counter} isPlayer={false} />
            </>
          ) : <GameItemContainer timer={counter} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SingleBattle;

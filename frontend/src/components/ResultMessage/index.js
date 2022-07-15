import {
  Box, Button, Grow, Typography,
} from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";

const ResultMessage = () => {
  const { toggleBattle, messageOptions } = useContext(GameContext);

  const [firstValue, secondValue] = messageOptions;

  const backTo = () => {
    toggleBattle(false);
  };

  if (messageOptions.length === 0) {
    return null;
  }

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grow in={!!firstValue}>
          <Typography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>{firstValue}</Typography>
        </Grow>

        <Grow
          in={!!secondValue}
          style={{ transformOrigin: "0 0 0" }}
          timeout={1000}
        >
          <Typography
            variant="h2"
            color="textPrimary"
            sx={{ textTransform: "uppercase", ml: "8px" }}
          >{secondValue}
          </Typography>
        </Grow>

      </Box>
      <div>
        <Button size="medium" variant="contained" color="common" sx={{ mt: "20px" }} onClick={backTo}>Play again</Button>
      </div>
    </div>
  );
};

export default ResultMessage;

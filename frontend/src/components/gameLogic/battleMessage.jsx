import {
  Box, Button, Grow, Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { GameContext } from "../../services/gameContext";

const BattleMessage = () => {
  const {
    emitStartBattle, battleManager, thisUser, gameStatus,
  } = useContext(GameContext);

  const [message, setMessage] = useState([]);

  const [firstValue, secondValue] = message;

  useEffect(() => {
    if (gameStatus === "battle") {
      if (battleManager.battleResult === thisUser.choice) {
        setMessage(["You", "Win"]);
      }
      if (battleManager.battleResult !== thisUser.choice && battleManager.battleResult !== null) {
        setMessage(["You", "Lose"]);
      }
      if (battleManager.battleResult === null) {
        setMessage(["Draw", ""]);
      }
    }
  }, [gameStatus, thisUser, battleManager.battleResult]);

  if (message.length === 0) {
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
        <Button size="medium" variant="contained" color="common" sx={{ mt: "20px" }} onClick={() => emitStartBattle()}>
          Play again
        </Button>
      </div>
    </div>
  );
};

export default BattleMessage;

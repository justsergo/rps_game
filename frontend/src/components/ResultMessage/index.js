import {
  Box, Button, Grow, Typography,
} from "@mui/material";
import { GameContext } from "frontend/src/services/gameContext";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ResultMessage = () => {
  const navigate = useNavigate();
  const { resultPoint, clearChoice } = useContext(GameContext);

  const messageOptions = useMemo(() => {
    switch (resultPoint) {
      case 1:
        return ["You", "Win"];
      case -1:
        return ["You", "Lose"];
      case 0:
        return ["Draw", ""];
      default: return [];
    }
  }, [resultPoint]);

  const [firstValue, secondValue] = messageOptions;

  const backTo = () => {
    navigate("/game");
    clearChoice();
  };

  return (
    <>
      {messageOptions.length !== 0
        && (
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
        )}
    </>
  );
};

export default ResultMessage;

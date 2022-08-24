import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { StyledContainer } from "./style";

const GameTimer = ({ startTime, callBack = () => {} }) => {
  const [leftTime, setLeftTime] = useState(startTime);

  useEffect(() => {
    const intervalId = setInterval(() => setLeftTime((state) => state - 1), 1000);
    if (leftTime < 0) {
      clearInterval(intervalId);
      if (callBack) {
        callBack();
      }
    }
    return () => clearInterval(intervalId);
  }, [callBack, leftTime]);

  return (
    <StyledContainer>
      <Typography variant="h2" color="textPrimary">
        {leftTime}
      </Typography>
    </StyledContainer>
  );
};

export default GameTimer;

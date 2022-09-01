import { Typography } from "@mui/material";

import { StyledContainer } from "../../pages/Game/style";

const GameTimer = ({ leftTime }) => {
  return (
    <StyledContainer>
      <Typography variant="h2" color="textPrimary">
        {leftTime}
      </Typography>
    </StyledContainer>
  );
};

export default GameTimer;

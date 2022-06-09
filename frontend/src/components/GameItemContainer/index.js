import { Typography } from "@mui/material";
import { StyledContainer } from "frontend/src/components/GameItemContainer/styles";

const GameItemContainer = ({ timer }) => {
  return (
    <StyledContainer>
      <Typography variant="h2" color="textPrimary">
        {timer}
      </Typography>
    </StyledContainer>
  );
};

export default GameItemContainer;

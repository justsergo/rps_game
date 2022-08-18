import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import ChatBar from "../ChatBar";
import {
  ScoreGridContainer, ScoreText, ScoreValue, StyledGrid, Text, TextGridContainer,
} from "./styles";

const Header = () => {
  const { score } = useContext(GameContext);

  return (
    <StyledGrid container item xs={11} lg={8}>
      <TextGridContainer item component="div">
        <Text variant="h1" color="textPrimary">rock</Text>
        <Text variant="h1" color="textPrimary">paper</Text>
        <Text variant="h1" color="textPrimary">scissors</Text>
      </TextGridContainer>
      <ScoreGridContainer item component="div" xs={3} md={2} lg={2}>
        <ScoreText variant="body2" color="textPrimaryScore">SCORE</ScoreText>
        <ScoreValue variant="caption" color="textSecondary">
          {score}
        </ScoreValue>
      </ScoreGridContainer>
      <ChatBar />
    </StyledGrid>
  );
};

export default Header;

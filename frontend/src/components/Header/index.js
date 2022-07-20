import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import {
  AvailableRooms, ScoreGridContainer, ScoreText, ScoreValue, StyledGrid, Text, TextGridContainer,
} from "./styles";

const Header = () => {
  const { score, rooms } = useContext(GameContext);

  const renderRooms = rooms.availableRooms.map((elem) => {
    return (
      <div key={Math.random()}>
        <p>Название комнаты {elem[0]}</p>
        <p>Количество людей {elem[1]}</p>
      </div>
    );
  });
  return (
    <StyledGrid container item xs={11} lg={8}>
      <TextGridContainer item component="div">
        <Text variant="h1" color="textPrimary">rock</Text>
        <Text variant="h1" color="textPrimary">paper</Text>
        <Text variant="h1" color="textPrimary">scissors</Text>
      </TextGridContainer>
      <AvailableRooms>
        {rooms.availableRooms && [renderRooms] }
      </AvailableRooms>
      <ScoreGridContainer item component="div" xs={3} md={2} lg={2}>
        <ScoreText variant="body2" color="textPrimaryScore">SCORE</ScoreText>
        <ScoreValue variant="caption" color="textSecondary">
          {score}
        </ScoreValue>
      </ScoreGridContainer>
    </StyledGrid>
  );
};

export default Header;

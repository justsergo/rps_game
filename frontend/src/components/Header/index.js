import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import ScoreHelper from "../../common/utils/scoreHelper";
import {
  AvailableRooms,
  ScoreGridContainer, ScoreText, ScoreValue, StyledGrid, Text, TextGridContainer,
} from "./styles";

const Header = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const socket = io("/");
    socket.on("connect", () => {
      socket.on("available-rooms", (aRooms) => {
        // eslint-disable-next-line no-param-reassign
        delete aRooms[socket.id];
        setRooms(aRooms);
      });
    });
  }, []);
  const renderRooms = Object.keys(rooms).map((it) => {
    return (
      <div>
        <p>Название комнаты {it}</p>
        <p>Количество людей {rooms[it]}</p>
      </div>
    );
  });
  return (
    <StyledGrid container xs={11} lg={8}>
      <TextGridContainer item component="div">
        <Text variant="h1" color="textPrimary">rock</Text>
        <Text variant="h1" color="textPrimary">paper</Text>
        <Text variant="h1" color="textPrimary">scissors</Text>
      </TextGridContainer>
      <AvailableRooms>
        {rooms && [renderRooms] }
      </AvailableRooms>
      <ScoreGridContainer item component="div" xs={3} md={2} lg={2}>
        <ScoreText variant="body2" color="textPrimaryScore">SCORE</ScoreText>
        <ScoreValue variant="caption" color="textSecondary">
          <ScoreHelper />
        </ScoreValue>
      </ScoreGridContainer>
    </StyledGrid>
  );
};

export default Header;

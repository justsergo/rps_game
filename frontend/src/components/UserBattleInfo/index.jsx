import { Box, Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import { StyledGrid } from "./style";

const UserInfoBlock = () => {
  const { rooms, players, userName } = useContext(GameContext);

  const PlayersInRoom = () => players.filter((elem) => elem.playerName !== userName).map((elem) => {
    return (
      <Box sx={{ color: "red", margin: "0 10px" }} key={Math.random()}>
        player:{elem.playerName}
        <br />
        status:{elem.status}
      </Box>
    );
  });

  return (
    <StyledGrid container item xs={11} lg={8}>
      <Grid item sx={{ color: "green" }}>
        room example:{rooms.currentRoom}
      </Grid>
      <Grid item display="flex">
        <Box sx={{ color: "orange", margin: "0 10px" }} key={Math.random()}>
          player:{userName}
          <br />
          status:
        </Box>
        <PlayersInRoom />
      </Grid>
    </StyledGrid>
  );
};

export default UserInfoBlock;

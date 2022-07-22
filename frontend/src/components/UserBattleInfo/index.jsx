import { Box, Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import { StyledGrid } from "./style";

const UserInfoBlock = () => {
  const { choosedRoom, players, userName } = useContext(GameContext);

  const PlayersInRoom = () => players.filter((elem) => elem.user !== userName).map((elem) => {
    return (
      <Box sx={{ color: "red", margin: "0 10px" }} key={Math.random()}>
        player:{elem.user}
        <br />
        status:{elem.status}
      </Box>
    );
  });
  return (
    <StyledGrid container item xs={11} lg={8}>
      <Grid item sx={{ color: "green" }}>
        room example:{choosedRoom}
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

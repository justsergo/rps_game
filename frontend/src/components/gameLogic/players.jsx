import { Grid, Typography } from "@mui/material";
import { useCallback, useContext } from "react";

import { STATUSES } from "../../constants/statuses";
import { GameContext } from "../../services/gameContext";
import PlayersIcon from "../PlayerIcon";

const Players = () => {
  const { players, gameStatus, thisUser } = useContext(GameContext);

  const choiceManager = useCallback((user) => {
    const isMe = thisUser.userId === user.userId;

    switch (true) {
      case gameStatus === STATUSES.battle:
      case isMe:
        return user.choice;
      default:
        return "";
    }
  }, [gameStatus, thisUser]);

  return players.map((user, index, array) => {
    const angle = (360 / array.length) * index;
    const x = (Math.sin(angle / (180 / Math.PI)) * 240) * -1;
    const y = (Math.cos(angle / (180 / Math.PI)) * 240) * -1;
    const marginTop = 10;

    return (
      <Grid
        item
        xs={4}
        sx={{
          transform: `translate(${x}%, ${y + marginTop}%)`, position: "absolute",
        }}
        key={user.userId}
      >
        <Typography
          sx={{
            position: "absolute", top: "-30px", transform: "translateX(-50%)", left: "50%",
          }}
          variant="playerTittle"
        >{user.playerName}
        </Typography>

        <PlayersIcon
          isPlayer
          status={user.status}
          choice={choiceManager(user)}
        />
      </Grid>
    );
  });
};

export default Players;

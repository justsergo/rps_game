import { Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import Triangle from "../Triangle";
import UserInfoBlock from "../UserBattleInfo";

const MultiSelectionButtons = () => {
  const { emitMultiUserChoice } = useContext(GameContext);

  const iconEvent = (e) => {
    emitMultiUserChoice({ playerChoice: e.currentTarget.id });
  };
  return (
    <Grid container height="100%">

      <UserInfoBlock />

      <Grid
        container
        sx={{
          flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", height: "100%",
        }}
      >
        <Triangle onClick={iconEvent} />
      </Grid>

    </Grid>
  );
};

export default MultiSelectionButtons;

import { Grid } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import Triangle from "../Triangle";
import { AnimatedTittle } from "./style";

const SelectionButtons = () => {
  const { emitSingleUserChoice } = useContext(GameContext);

  const iconEvent = (e) => {
    emitSingleUserChoice({ playerChoice: e.currentTarget.id });
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", height: "100%",
      }}
    >
      <AnimatedTittle spacing={45} variant="caption">make your choice</AnimatedTittle>
      <Triangle onClick={iconEvent} />

    </Grid>
  );
};

export default SelectionButtons;

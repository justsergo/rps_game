import { Box } from "@mui/material";
import MenuButton from "frontend/src/components/MenuButton";
import { GAME_ITEMS } from "frontend/src/constants/names";

export const buttonsNames = Object.values(GAME_ITEMS);

const buttonStyles = {
  [GAME_ITEMS.PAPER]: { top: ["22px", "0px"], left: ["7px", "-30px"] },
  [GAME_ITEMS.SCISSORS]: { top: ["22px", "0"], left: ["215px", "210px"] },
  [GAME_ITEMS.ROCK]: { top: ["233px", "206px"], left: ["113px", "88px"] },
};

const RenderButton = ({ name }) => (
  <Box
    sx={{
      position: "absolute",
      zIndex: 1,
      ...(buttonStyles[name] || {}),
    }}
  >
    <MenuButton id={name} />
  </Box>
);

export default RenderButton;

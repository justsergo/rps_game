import { GAME_ITEMS } from "frontend/src/constants/names";

import { PaperImage, RockImage, ScissorsImage } from "../assets/images";

export const choiceIcons = {
  [GAME_ITEMS.PAPER]: <PaperImage />,
  [GAME_ITEMS.ROCK]: <RockImage />,
  [GAME_ITEMS.SCISSORS]: <ScissorsImage />,
};

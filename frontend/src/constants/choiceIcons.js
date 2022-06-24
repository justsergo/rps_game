import { PaperImage, RockImage, ScissorsImage } from "../assets/images";
import { GAME_ITEMS } from "./names";

export const choiceIcons = {
  [GAME_ITEMS.PAPER]: <PaperImage />,
  [GAME_ITEMS.ROCK]: <RockImage />,
  [GAME_ITEMS.SCISSORS]: <ScissorsImage />,
};

import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import MultiBattle from "../MultiBattle";
import MultiSelectionButtons from "../MultiSelectionButtons";

const MultiGame = () => {
  const { isMultiBattle } = useContext(GameContext);
  if (isMultiBattle) {
    return <MultiBattle />;
  }
  return <MultiSelectionButtons />;
};
export default MultiGame;

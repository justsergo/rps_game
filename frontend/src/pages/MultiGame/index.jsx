import { useContext } from "react";

import MultiBattle from "../../components/MultiBattle";
import MultiSelectionButtons from "../../components/MultiSelectionButtons";
import { GameContext } from "../../services/gameContext";

const MultiGame = () => {
  const { isBattle } = useContext(GameContext);
  if (isBattle.multi) {
    return <MultiBattle />;
  }
  return <MultiSelectionButtons />;
};
export default MultiGame;

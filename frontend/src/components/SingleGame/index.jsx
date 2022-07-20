import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import SelectionButtons from "../SelectionButtons";
import SingleBattle from "../SingleBattle";

const SingleGame = () => {
  const { isSingleBattle } = useContext(GameContext);
  if (isSingleBattle) {
    return <SingleBattle />;
  }
  return <SelectionButtons />;
};
export default SingleGame;

import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import SelectionButtons from "../SelectionButtons";
import SingleBattle from "../SingleBattle";

const SingleGame = () => {
  const { isBattle } = useContext(GameContext);
  if (isBattle) {
    return <SingleBattle />;
  }
  return <SelectionButtons />;
};
export default SingleGame;

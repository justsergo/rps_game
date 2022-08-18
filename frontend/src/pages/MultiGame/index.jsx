import { useContext } from "react";

import MultiBattle from "../../components/MultiBattle";
import UsersChoice from "../../components/MultiUserChoice";
import { GameContext } from "../../services/gameContext";

const MultiGame = () => {
  const { isBattle } = useContext(GameContext);
  if (isBattle.multi) {
    return <MultiBattle />;
  }
  return <UsersChoice />;
};
export default MultiGame;

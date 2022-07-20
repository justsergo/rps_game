import { useContext, useEffect } from "react";

import SelectionButtons from "../../components/SelectionButtons";
import SingleBattle from "../../components/SingleBattle";
import { GameContext } from "../../services/gameContext";

const SingleGame = () => {
  const { isBattle, leaveSingleRoom, createSingleRoom } = useContext(GameContext);
  useEffect(() => {
    createSingleRoom();
    return () => leaveSingleRoom();
  }, []);
  if (isBattle.single) {
    return <SingleBattle />;
  }
  return <SelectionButtons />;
};
export default SingleGame;

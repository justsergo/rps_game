import { useContext, useEffect } from "react";

import SelectionButtons from "../../components/SelectionButtons";
import SingleBattle from "../../components/SingleBattle";
import { GameContext } from "../../services/gameContext";

const SingleGame = () => {
  const { battle, leaveSingleRoom, createSingleRoom } = useContext(GameContext);
  useEffect(() => {
    createSingleRoom();
    return () => leaveSingleRoom();
  }, []);
  if (battle.single) {
    return <SingleBattle />;
  }
  return <SelectionButtons />;
};
export default SingleGame;

import { useContext } from "react";

import { AnimatedTittle } from "../../pages/Game/style";
import { GameContext } from "../../services/gameContext";
import Triangle from "../ui/Triangle";
import GameTimer from "./timer";

const MakeChoice = () => {
  const { emitUserChoice, timer } = useContext(GameContext);
  return (
    <>
      <Triangle onClick={(e) => emitUserChoice(e.currentTarget.id)} size="iconWrapXS" />
      <GameTimer leftTime={timer} />
      <AnimatedTittle spacing={45} variant="caption">make your choice</AnimatedTittle>
    </>
  );
};

export default MakeChoice;

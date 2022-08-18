import Triangle from "../Triangle";
import { AnimatedTittle } from "./style";
import GameTimer from "./timer";

const MakeChoice = ({ iconEvent }) => {
  return (
    <>
      <Triangle onClick={(e) => iconEvent(e)} size="iconWrapXS" />
      <GameTimer startTime={5} callBack={() => {}} />
      <AnimatedTittle spacing={45} variant="caption">make your choice</AnimatedTittle>
    </>
  );
};

export default MakeChoice;

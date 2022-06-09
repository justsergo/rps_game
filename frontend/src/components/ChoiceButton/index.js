import { winAnimation } from "frontend/src/common/utils/winAnimation";
import { choiceIcons } from "frontend/src/constants/choiceIcons";
import { GameContext } from "frontend/src/services/gameContext";
import { useContext } from "react";

import IconButton from "../Button";

const ChoiceButton = ({ choice, isPlayer }) => {
  const { resultPoint } = useContext(GameContext);

  return (
    <IconButton id={choice} $isWin={winAnimation({ isPlayer, resultPoint })} variant="iconWrapXl" figure={choice}>
      {choiceIcons[choice]}
    </IconButton>
  );
};

export default ChoiceButton;

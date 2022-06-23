import { useContext } from "react";

import { winAnimation } from "../../common/utils/winAnimation";
import { choiceIcons } from "../../constants/choiceIcons";
import { GameContext } from "../../services/gameContext";
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

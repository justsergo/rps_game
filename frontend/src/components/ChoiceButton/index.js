import { useContext } from "react";

import { winAnimation } from "../../common/utils/winAnimation";
import { choiceIcons } from "../../constants/choiceIcons";
import { GameContext } from "../../services/gameContext";
import IconButton from "../Button";

const ChoiceButton = ({ choice, isPlayer, size = "iconWrapXl" }) => {
  const { resultPoint } = useContext(GameContext);

  return (
    <IconButton id={choice} $isWin={winAnimation({ isPlayer, resultPoint })} variant={size} figure={choice}>
      {choiceIcons[choice]}
    </IconButton>
  );
};

export default ChoiceButton;

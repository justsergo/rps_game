import { useContext } from "react";

import { winAnimation } from "../../common/winAnimation";
import { choiceIcons } from "../../constants/choiceIcons";
import { GameContext } from "../../services/gameContext";
import IconButton from "./style";

const ChoiceButton = ({ choice, isPlayer, size = "iconWrapXl" }) => {
  const { resultPoint } = useContext(GameContext);

  return (
    <IconButton id={choice} $isWin={winAnimation({ isPlayer, resultPoint })} variant={size} figure={choice}>
      {choiceIcons[choice]}
    </IconButton>
  );
};

export default ChoiceButton;

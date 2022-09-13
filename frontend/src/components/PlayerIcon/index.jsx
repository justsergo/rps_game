import { useContext } from "react";

import { winAnimation } from "../../common/winAnimation";
import { choiceIcons } from "../../constants/choiceIcons";
import { GameContext } from "../../services/gameContext";
import IconButton from "../ChoiceButton/style";
import PlayerIconContent from "./iconStatusContent";

const PlayersIcon = ({
  status, choice, isPlayer, size = "iconWrap",
}) => {
  const { resultPoint } = useContext(GameContext);

  return (
    <IconButton
      id={choice ? choice.toString() : undefined}
      figure={choice ? choice.toString() : undefined}
      variant={size}
      $isWin={winAnimation({ isPlayer, resultPoint })}
    >
      {choice
        ? choiceIcons[choice]
        : <PlayerIconContent status={status} />}
    </IconButton>
  );
};

export default PlayersIcon;

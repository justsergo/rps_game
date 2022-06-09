import { choiceIcons } from "frontend/src/constants/choiceIcons";
import { GameContext } from "frontend/src/services/gameContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import IconButton from "../Button";

const MenuButton = ({ id }) => {
  const { setMyChoice } = useContext(GameContext);

  const setChoice = (e) => {
    setMyChoice(e.currentTarget.id);
  };

  return (
    <NavLink to="battle">
      <IconButton id={id} variant="iconWrap" figure={id} onClick={setChoice}>
        {choiceIcons[id]}
      </IconButton>
    </NavLink>
  );
};

export default MenuButton;

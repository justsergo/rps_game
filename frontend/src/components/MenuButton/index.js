import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { choiceIcons } from "../../constants/choiceIcons";
import { GameContext } from "../../services/gameContext";
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

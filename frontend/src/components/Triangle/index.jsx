import { choiceIcons } from "../../constants/choiceIcons";
import { GAME_ITEMS } from "../../constants/names";
import IconButton from "../Button";
import { IconGridWrap } from "./style";

const iconsInfo = [
  { area: "leftUp", id: GAME_ITEMS.ROCK },
  { area: "rightUp", id: GAME_ITEMS.PAPER },
  { area: "down", id: GAME_ITEMS.SCISSORS },
];

const Triangle = ({ onClick }) => {
  return (
    <IconGridWrap>
      {iconsInfo.map((item) => (
        <IconButton
          key={item.id}
          id={item.id}
          variant="iconWrap"
          figure={item.id}
          onClick={onClick}
          $gridArea={item.area}
          $isShake
        >
          {choiceIcons[item.id]}
        </IconButton>
      ))}
    </IconGridWrap>
  );
};

export default Triangle;

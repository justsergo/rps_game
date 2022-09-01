import ChatIcon from "@mui/icons-material/Chat";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Button, Grid,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../../../services/gameContext";
import { Wrapper } from "./styles";

const ChatBar = () => {
  const { emitLeaveRoom, toggleChat } = useContext(GameContext);
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
    emitLeaveRoom();
  };
  return (
    <Wrapper container>

      <Grid container sx={{ paddingBottom: "10px", flexDirection: "column" }}>
        <Button onClick={backToMain}>
          <MenuOpenIcon color="info" fontSize="medium" />
        </Button>
        <Button onClick={() => toggleChat((prev) => !prev)}>
          <ChatIcon color="info" fontSize="medium" />
        </Button>
      </Grid>

    </Wrapper>

  );
};

export default ChatBar;

import ChatIcon from "@mui/icons-material/Chat";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Button, Grid, Slide,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Chat from "../Chat";
import { Wrapper } from "./styles";

const Footer = () => {
  const [isOpen, toggleChat] = useState(false);
  const navigate = useNavigate();
  return (
    <Wrapper container>

      {isOpen && <Chat isOpen={isOpen} onClose={() => toggleChat(false)} />}

      <Slide in={!isOpen} direction="up" timeout={400}>

        <Grid item sx={{ paddingBottom: "10px" }}>
          <Button onClick={() => navigate("/")}>
            <MenuOpenIcon color="info" fontSize="medium" />
          </Button>
          <Button onClick={() => toggleChat(true)}>
            <ChatIcon color="info" fontSize="medium" />
          </Button>
        </Grid>

      </Slide>
    </Wrapper>

  );
};

export default Footer;

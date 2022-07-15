import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Button, Grid, IconButton, Slide, Typography,
} from "@mui/material";
import React, {
  useContext, useEffect, useRef, useState,
} from "react";

import { GameContext } from "../../services/gameContext";
import {
  AreaMessage, ChatMessages, FormChat, InsertZone,
} from "./style";

const RenderChatMessages = ({ chat, nickName }) => {
  return chat.map(({ message }, index) => (
    <Grid container key={Math.random(index)} sx={{ height: "40px" }}>
      <Typography variant="chat">{nickName}:</Typography>
      <Typography variant="chat">{message}</Typography>
    </Grid>
  ));
};

const Chat = ({ isOpen, onClose }) => {
  const { socket } = useContext(GameContext);
  const [messages, setMessages] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const nickName = "TEST"; // TODO: take nickname from auth nickname

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }]);
      });
    }
  }, [chat, socket, messages]);

  const onTextChange = (e) => {
    setMessages({ ...messages, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { message } = messages;
    socket.emit("message", { nickName, message });
    e.preventDefault();
    setMessages({ message: "", nickName });
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onMessageSubmit(e);
    }
  };

  return (
    <Slide in={isOpen} direction="up" timeout={500}>
      <FormChat onSubmit={onMessageSubmit}>

        <Button
          onClick={onClose}
          sx={{
            zIndex: "2", position: "absolute", right: "0", top: "0",
          }}
        >
          <CloseIcon color="info" fontSize="medium" />
        </Button>

        <ChatMessages container ref={messageRef}>
          <RenderChatMessages chat={chat} nickName={nickName} />
        </ChatMessages>

        <InsertZone container>
          <AreaMessage
            autoComplete="off"
            type="text"
            name="message"
            placeholder="Message"
            value={messages.message}
            minRows={2}
            maxRows={2}
            onChange={(e) => onTextChange(e)}
            onKeyDown={onEnterPress}
          />
          <IconButton type="submit" color="success">
            <SendIcon color="info" fontSize="medium" />
          </IconButton>
        </InsertZone>

      </FormChat>
    </Slide>
  );
};

export default Chat;

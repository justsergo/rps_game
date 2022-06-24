import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Button, Grid, IconButton, Slide, Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

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
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const nickName = "TEST"; // TODO: take nickname from auth nickname

  const socketRef = useRef();

  useEffect(
    () => {
      socketRef.current = io("/");
      socketRef.current.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }]);
      });
      return () => socketRef.current.disconnect();
    },
    [chat],
  );

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { message } = state;
    socketRef.current.emit("message", { nickName, message });
    e.preventDefault();
    setState({ message: "", nickName });
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

        <ChatMessages container>
          <RenderChatMessages chat={chat} nickName={nickName} />
        </ChatMessages>

        <InsertZone container>
          <AreaMessage name="message" placeholder="Message" value={state.message} minRows={2} maxRows={2} onChange={(e) => onTextChange(e)} />
          <IconButton type="submit" color="success"><SendIcon color="info" fontSize="medium" /></IconButton>
        </InsertZone>

      </FormChat>
    </Slide>
  );
};

export default Chat;

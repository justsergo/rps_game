import {
  Box, Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography,
} from "@mui/material";
import { useState } from "react";

import RockIcon from "../../assets/icons/RockIcon";

const Chat2 = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const listChatMessages = chatMessages.map((chatMessageDto) => (
    <ListItem key={Math.random()}>
      <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`} />
    </ListItem>
  ));
  return (
    <Container>
      <Paper elevation={9}>
        <Box p={3} sx={{ width: "50rem" }}>
          <Typography variant="body1" color="textPrimary">
            Happy chatting!
          </Typography>
          <Divider />
          <Grid container spacing={4} alignItems="center">
            <Grid id="chat-window" xs={12} item>
              <List id="chat-window-messages">
                {listChatMessages}
                <ListItem />
              </List>
            </Grid>
            <Grid xs={2} item>
              <FormControl fullWidth>
                <TextField
                  value={user}
                  label="Nickname"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={9} item>
              <FormControl fullWidth>
                <TextField
                  value={message}
                  label="Type your message..."
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={1} item>
              <IconButton
                aria-label="send"
                color="primary"
              >
                <RockIcon />
              </IconButton>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat2;

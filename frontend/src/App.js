import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";

import Chat from "./components/Chat";
import Chat2 from "./components/Chat/last";
import RoutesManager from "./routes/RoutesManager";
import GameContextProvider from "./services/gameContext";
import theme from "./theme";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const socket = io("/");
    socket.on("connect", () => {
      socket.on("available-rooms", (aRooms) => {
        delete aRooms[socket.id];
        console.log(aRooms);
        setRooms(aRooms);
      });
    });

    return () => socket.close();
  }, []);
  const renderRooms = Object.keys(rooms).map((it) => {
    return (
      <div>
        <h4>Название комнаты {it}</h4>
        <h4>Количество людей {rooms[it]}</h4>
      </div>
    );
  });
  return (
    <>
      {rooms && [renderRooms] }
      <ThemeProvider theme={theme}>
        <GameContextProvider>
          <BrowserRouter>
            <RoutesManager />
          </BrowserRouter>
        </GameContextProvider>
      </ThemeProvider>
      <Chat />
      <Chat2 />
    </>
  );
}

export default App;

import { useContext, useEffect, useState } from "react";

import { GameContext } from "../services/gameContext";

export const useMulti = () => {
  const { isBattle, toggleBattle, socket } = useContext(GameContext);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("available-rooms", (aRooms) => {
        const arrayAvailableRooms = Object.entries(aRooms);
        const availableRooms = arrayAvailableRooms.filter((elem) => elem[0] !== socket.id);
        setRooms(availableRooms);
      });
    });
  }, [socket]);

  return {
    isBattle, toggleBattle, rooms,
  };
};

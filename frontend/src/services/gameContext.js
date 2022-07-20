import {
  createContext, useEffect, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [isSingleBattle, toggleSingleBattle] = useState(false);

  const [isMultiBattle, toggleMultiBattle] = useState(false);

  const [availableRooms, setAvailableRooms] = useState([]);

  const [choosedRoom, setRoom] = useState("room4");

  const [userName, setUserName] = useState("");

  const [players, setPlayers] = useState([{ user: userName, status: "" }, { user: userName, status: "" }]);

  const [result, setResultBattle] = useState({
    conclusion: "",
    user: "",
    computer: "",
  });

  const [multiBattleResult, setMultiBattleResult] = useState({
    conclusion: "",
    user: "",
    oponents: "",
  });

  const [messageOptions, setMessageOptions] = useState([]);

  const [score, setScore] = useState(0);

  const [counter, setCounter] = useState(3);

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (result.conclusion === result.user && !counter) {
      setMessageOptions(["You", "Win"]);
      setScore((s) => s + 1);
    }
    if (result.conclusion === result.computer && !counter) {
      setMessageOptions(["You", "Lose"]);
      setScore((s) => s - 1);
    }
    if (result.conclusion === null && !counter) {
      setMessageOptions(["Draw", ""]);
      setScore((s) => s + 0);
    }
  }, [result, counter]);

  useEffect(() => {
    let timer = 0;
    if (isSingleBattle) {
      timer = counter > 0 ? setTimeout(() => {
        setCounter(counter - 1);
      }, 1000) : 0;
    }
    if (!isSingleBattle) {
      setCounter(3);
      clearTimeout(timer);
    }
  }, [isSingleBattle, counter]);

  useEffect(() => {
    socket.on("single-battle-result", (res) => {
      setResultBattle({
        conclusion: res.conclusion,
        computer: res.computer,
        user: res.user,
      });
    });
    return () => socket.off("single-battle-result");
  }, []);

  useEffect(() => {
    socket.on("multi-battle-result", (res) => {
      setMultiBattleResult({
        conclusion: res.conclusion,
        oponents: res.oponents,
        user: res.user,
      });
    });
    return () => socket.off("multi-battle-result");
  }, []);

  const emitSingleUserChoice = ({ playerChoice }) => {
    socket.emit("single-battle", { playerChoices: playerChoice, roomId: "free1" });
    toggleSingleBattle(true);
  };

  const emitMultiUserChoice = ({ playerChoice }) => {
    socket.emit("choice", { choice: playerChoice, roomId: "room4" });
    toggleMultiBattle(true);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", { roomId: choosedRoom });
  };

  useEffect(() => {
    socket.emit("create-room", { roomId: "room4", playerName: "userName" });
  }, []);

  socket.on("available-rooms", (rooms) => {
    setAvailableRooms(rooms);
  });

  socket.on("created", (roomId) => { setRoom(roomId); });

  socket.on("joined", (playerName) => { setPlayers(playerName); });

  socket.on("leaved", (playerName) => { setPlayers(playerName); });

  socket.on("choice-result", (choice) => { setMultiBattleResult({ user: choice[socket.id].choice }); });

  const contextValue = useMemo(() => ({
    isSingleBattle,
    toggleSingleBattle,
    isMultiBattle,
    toggleMultiBattle,
    socket,
    emitSingleUserChoice,
    result,
    messageOptions,
    score,
    counter,
    availableRooms,
    choosedRoom,
    setRoom,
    players,
    emitMultiUserChoice,
    userName,
    multiBattleResult,
    leaveRoom,
  }), [choosedRoom,
    isSingleBattle,
    toggleSingleBattle,
    availableRooms,
    result,
    messageOptions,
    score,
    isMultiBattle,
    counter,
    players,
    userName,
    multiBattleResult,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

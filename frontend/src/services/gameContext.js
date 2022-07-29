import {
  createContext, useCallback, useEffect, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [isBattle, toggleBattle] = useState({
    single: false,
    multi: false,
  });

  const [rooms, setRooms] = useState({
    availableRooms: [],
    currentRoom: "example",
  });

  const [userName, setUserName] = useState("");

  const [players, setPlayers] = useState([{ user: userName, status: "", choice: "" }]);

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

  const [gameTimer, setGameTimer] = useState(3);

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (result.conclusion === result.user && !gameTimer) {
      setMessageOptions(["You", "Win"]);
      setScore((s) => s + 1);
    }
    if (result.conclusion === result.computer && !gameTimer) {
      setMessageOptions(["You", "Lose"]);
      setScore((s) => s - 1);
    }
    if (result.conclusion === null && !gameTimer) {
      setMessageOptions(["Draw", ""]);
      setScore((s) => s + 0);
    }
  }, [result, gameTimer]);

  useEffect(() => {
    let timer = 0;
    if (isBattle.single) {
      timer = gameTimer > 0 ? setTimeout(() => {
        setGameTimer(gameTimer - 1);
      }, 1000) : 0;
    }
    if (!isBattle.single) {
      setGameTimer(3);
      clearTimeout(timer);
    }
  }, [isBattle.single, gameTimer]);

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

  const emitSingleUserChoice = useCallback(
    ({ playerChoice }) => {
      socket.emit("single-battle", { playerChoices: playerChoice, roomId: socket.id });
      toggleBattle({ ...isBattle, single: true });
    },
    [isBattle],
  );

  // TODO: remove when create and join methods will be done
  // useEffect(() => {
  //   socket.emit("create-room", { roomId: rooms.currentRoom, playerName: "ex" });
  //   return () => socket.emit("leave-room", { roomId: rooms.currentRoom });
  // }, []);
  //

  // TODO: toggle battle wil be work, when all plaiers status done
  const emitMultiUserChoice = useCallback(({ playerChoice }) => {
    socket.emit("choice", { choice: playerChoice, roomId: rooms.currentRoom });
    // toggleBattle({ ...isBattle, multi: true });
  }, [isBattle, rooms.currentRoom]);

  const createSingleRoom = () => {
    socket.emit("create-room", { roomId: socket.id, playerName: socket.id });
    socket.emit("join-room", { roomId: socket.id, playerName: socket.id });
  };

  const leaveSingleRoom = () => {
    socket.emit("leave-room", { roomId: socket.id });
  };

  const leaveRoom = useCallback(() => {
    socket.emit("leave-room", { roomId: rooms.currentRoom });
  }, [rooms.currentRoom]);

  const backToChoice = useCallback(() => {
    toggleBattle({ ...isBattle, single: false });
  }, [isBattle]);

  socket.on("available-rooms", (newRooms) => {
    setRooms({ ...rooms, availableRooms: newRooms });
  });

  // TODO: set choice result by nick name

  socket.on("choice-result", (playersResult) => {
    setPlayers(
      [
        ...players,
        ...playersResult,
      ],
    );
  });

  socket.on("created", (roomId) => { setRooms({ ...rooms, currentRoom: roomId }); });

  socket.on("joined", (playerNames) => { setPlayers(...players, playerNames); });

  socket.on("leaved", (playerName) => { setPlayers(...players, playerName); });

  const contextValue = useMemo(() => ({
    leaveSingleRoom,
    createSingleRoom,
    socket,
    emitSingleUserChoice,
    result,
    messageOptions,
    score,
    gameTimer,
    rooms,
    players,
    emitMultiUserChoice,
    userName,
    multiBattleResult,
    leaveRoom,
    isBattle,
    toggleBattle,
    backToChoice,
  }), [
    result,
    messageOptions,
    score,
    gameTimer,
    players,
    userName,
    multiBattleResult,
    isBattle,
    backToChoice,
    emitMultiUserChoice,
    emitSingleUserChoice,
    leaveRoom,
    rooms,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

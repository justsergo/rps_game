import {
  createContext, useCallback, useEffect, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [successRoomMessage, setSuccessRoomMessage] = useState(null);
  const [isBattle, toggleBattle] = useState({
    single: false,
    multi: false,
  });

  const [rooms, setRooms] = useState({
    availableRooms: [],
    currentRoom: "",
  });
  const [userName, setUserName] = useState("");

  const [players, setPlayers] = useState([
    { user: `${userName}gr`, status: "1", choice: "" },
    { user: "49", status: "", choice: "" },
    { user: "Я ЕБ", status: "", choice: "" },
    { user: "3", status: "", choice: "" },
    { user: "4dsfdsfsdf ", status: "", choice: "" },
    { user: "5", status: "", choice: "" },
  ]);

  console.log(userName);

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

  // TODO: toggle battle wil be work, when all plaiers status done
  const emitMultiUserChoice = useCallback(({ playerChoice }) => {
    socket.emit("choice", { choice: playerChoice, roomId: rooms.currentRoom });
    // toggleBattle({ ...isBattle, multi: true });
  }, [isBattle, rooms.currentRoom]);

  // TODO: not ready method
  const emitChangeStatus = useCallback(({ playerChoice }) => {
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

  const emitCreateRoom = (roomId, resetForm, redirectHandle) => {
    socket.emit("create-room", { roomId, playerName: userName });
    setRooms({ ...rooms, currentRoom: roomId });
    if (redirectHandle) { redirectHandle("game/multiplayer"); }
    if (resetForm) {
      resetForm();
    }
  };

  const emitJoinRoom = (roomId, resetForm, redirectHandle) => {
    socket.emit("join-room", { roomId, playerName: userName });
    setRooms({ ...rooms, currentRoom: roomId });
    if (redirectHandle) { redirectHandle("game/multiplayer"); }
    // TODO: set choice result by nick name

    socket.on("choice-result", (playersResult) => {
      setPlayers(
        [
          ...players,
          playersResult,
        ],
      );
    });

    if (resetForm) {
      resetForm();
    }
  };

  const getAllRooms = () => {
    socket.emit("get-rooms", (res) => {
      res.map((i) => { return { name: i }; });
      setRooms({ ...rooms, availableRooms: res });
    });
    return rooms;
  };

  socket.on("available-rooms", (newRooms) => {
    setRooms({ ...rooms, availableRooms: newRooms });
  });
  socket.on("created", (name) => {
    setRooms({ ...rooms, currentRoom: name });
  });
  socket.on("created-message", (name) => { setSuccessRoomMessage(name); });
  socket.on("joined", (users) => { setPlayers(users); });
  socket.on("leaved", (users) => { setPlayers(users); });
  socket.on("choice-result", (choice) => { setMultiBattleResult({ user: choice[socket.id].choice }); });

  const contextValue = useMemo(() => ({
    emitJoinRoom,
    getAllRooms,
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
    emitCreateRoom,
    successRoomMessage,
    setSuccessRoomMessage,
    backToChoice,
    emitChangeStatus,
  }), [
    getAllRooms,
    result,
    messageOptions,
    successRoomMessage,
    toggleBattle,
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
    emitChangeStatus,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

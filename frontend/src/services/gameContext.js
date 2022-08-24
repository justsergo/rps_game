import {
  createContext, useCallback, useEffect, useLayoutEffect, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

import { getUserId, getUserName } from "../common/utils/localstorageGetItems";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [isOpenChat, toggleChat] = useState(false);

  const [successRoomMessage, setSuccessRoomMessage] = useState(null);

  const [battle, setBattle] = useState({
    // TODO: new status for managment sattle state
    // gameType: "",
    // gameStatus: "waiting/start/end",
    single: false,
    multi: false,
    users: {
      isUserReady: false,
      isAllPlayersReady: false,
    },
  });

  const [rooms, setRooms] = useState({
    availableRooms: [],
    currentRoom: "",
  });

  const [userName, setUserName] = useState("");

  const [players, setPlayers] = useState([
    { playerName: "userName", status: "", choice: "" }, // this user must be first in array
  ]);

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

  const id = getUserId();

  useLayoutEffect(() => {
    socket.emit("reconnect", (id));
  }, []);

  useEffect(() => {
    setUserName(getUserName);
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
    if (battle.single) {
      timer = gameTimer > 0 ? setTimeout(() => {
        setGameTimer(gameTimer - 1);
      }, 1000) : 0;
    }
    if (!battle.single) {
      setGameTimer(3);
      clearTimeout(timer);
    }
  }, [battle.single, gameTimer]);

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

  useEffect(() => {
    const notReadyPlayers = players.filter((item) => item.status !== "ready");
    if (notReadyPlayers.length === 0) {
      setBattle({ ...battle, users: { isAllPlayersReady: true } });
    }
  }, [players]);

  const emitSingleUserChoice = useCallback(
    ({ playerChoice }) => {
      socket.emit("single-battle", { playerChoices: playerChoice, roomId: socket.id });
      setBattle({ ...battle, single: true });
    },
    [battle],
  );

  const emitMultiUserChoice = useCallback(({ playerChoice }) => {
    socket.emit("choice", { choice: playerChoice, roomId: rooms.currentRoom });
  }, [battle, rooms.currentRoom]);

  const emitChangeStatus = useCallback(() => {
    socket.emit("change-status", { status: "ready", roomId: rooms.currentRoom, playerId: id });
  }, [rooms.currentRoom]);

  const createSingleRoom = () => {
    socket.emit("create-room", { roomId: socket.id, playerName: socket.id });
    socket.emit("join-room", { roomId: socket.id, playerName: socket.id });
  };

  const leaveSingleRoom = () => {
    socket.emit("leave-room", { roomId: socket.id });
  };

  const leaveRoom = useCallback(() => {
    socket.emit("leave-room", { roomId: rooms.currentRoom, playerId: id });
  }, [id, rooms.currentRoom]);

  const backToChoice = useCallback(() => {
    setBattle({ ...battle, single: false });
  }, [battle]);

  const emitCreateRoom = (roomId, resetForm, redirectHandle) => {
    socket.emit("create-room", { roomId, playerName: userName, playerId: id });
    setRooms({ ...rooms, currentRoom: roomId });
    if (redirectHandle) { redirectHandle("game/multiplayer"); }
    if (resetForm) {
      resetForm();
    }
  };

  const emitJoinRoom = (roomId, resetForm, redirectHandle) => {
    socket.emit("join-room", { roomId, playerName: userName, playerId: id });
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
  socket.on("created", (users) => { setPlayers(users); });
  socket.on("created-message", (name) => { setSuccessRoomMessage(name); });
  socket.on("joined", (users) => {
    setPlayers(users);
  });
  socket.on("leaved", (users) => { setPlayers(users); });
  socket.on("choice-result", (choice) => { setMultiBattleResult({ user: choice[socket.id].choice }); });
  socket.on("status-result", (playersStatus) => { setPlayers(playersStatus); });
  socket.on("status-ready", (readyPlayers) => { setPlayers(readyPlayers); });
  socket.on("reconnect-room", (roomName, refreshedPlayers) => {
    setRooms({ ...rooms, currentRoom: roomName });
    setPlayers(refreshedPlayers);
  });

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
    isBattle: battle,
    toggleBattle: setBattle,
    emitCreateRoom,
    successRoomMessage,
    setSuccessRoomMessage,
    backToChoice,
    emitChangeStatus,
    isOpenChat,
    toggleChat,
  }), [
    getAllRooms,
    result,
    messageOptions,
    successRoomMessage,
    setBattle,
    score,
    gameTimer,
    players,
    userName,
    multiBattleResult,
    battle,
    backToChoice,
    emitMultiUserChoice,
    emitSingleUserChoice,
    leaveRoom,
    rooms,
    emitChangeStatus,
    isOpenChat,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

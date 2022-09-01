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
    roomStatus: "",
    userStatus: "",
    battleResult: "",
    single: false,
  });

  const gameStatus = useMemo(() => battle.roomStatus, [battle]);

  const [rooms, setRooms] = useState({
    availableRooms: [],
    currentRoom: "",
  });

  const [userName, setUserName] = useState("");

  const [players, setPlayers] = useState([
    {
      playerName: "userName", status: "", choice: "", userId: "",
    },
  ]);

  const [result, setResultBattle] = useState({
    conclusion: "",
    user: "",
    computer: "",
  });

  const [messageOptions, setMessageOptions] = useState([]);

  const [score, setScore] = useState(0);

  const [gameTimer, setGameTimer] = useState(3);

  const id = getUserId();

  const thisUser = players.find((user) => user.userId === id) || [id, {
    playerName: "userName", status: "", choice: "", userId: "",
  }];

  const filtredPlayers = (users) => {
    setPlayers(users.sort((a) => { if (a.userId === id) { return -1; } return 0; }));
  };

  const statuses = {
    startBattle: "start",
    readyCheck: "ready-check",
    makeChoice: "make-choice",
    battle: "battle",
    battleFall: "battle-fall", // метод  когда батл не состоялся, например по истечению времени готов 1 юзер или никто не сделал выбор
    userFall: "user-fall", // метод когда юзер в комнате но не участвует в игре, например не нажал готов или не сделал выбор
  };

  useLayoutEffect(() => {
    socket.emit("reconnect", ({ userId: id }));
  }, [id]);

  useEffect(() => {
    setUserName(getUserName);
  }, []);

  // single game

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

  const emitSingleUserChoice = useCallback(
    ({ playerChoice }) => {
      socket.emit("single-battle", { playerChoices: playerChoice, roomId: socket.id });
      setBattle({ ...battle, single: true });
    },
    [battle],
  );

  const createSingleRoom = () => {
    socket.emit("create-room", { roomId: id, playerName: id, playerId: id });
    socket.emit("join-room", { roomId: id, playerName: id, playerId: id });
  };

  const leaveSingleRoom = () => {
    socket.emit("leave-room", { roomId: id, playerId: id });
  };

  const backToChoice = useCallback(() => {
    setBattle({ ...battle, single: false });
  }, [battle]);

  // multi game

  const emitStartBattle = useCallback(() => {
    socket.emit("start-battle", { roomId: rooms.currentRoom });
  }, [rooms.currentRoom]);

  const emitMultiUserChoice = useCallback(({ playerChoice }) => {
    socket.emit("change-user-choice", { choice: playerChoice, roomId: rooms.currentRoom, playerId: id });
  }, [rooms.currentRoom, id]);

  const emitChangeStatus = useCallback(() => {
    socket.emit("change-user-status", { status: "user-ready", roomId: rooms.currentRoom, playerId: id });
  }, [rooms.currentRoom, id]);

  const emitLeaveRoom = useCallback(() => {
    socket.emit("leave-room", { roomId: rooms.currentRoom, playerId: id });
  }, [id, rooms.currentRoom]);

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
    if (resetForm) { resetForm(); }
  };

  const emitGetAllRooms = () => {
    socket.emit("get-rooms", (res) => {
      res.map((i) => { return { name: i }; });
      setRooms({ ...rooms, availableRooms: res });
    });
  };

  socket.on("available-rooms", (newRooms) => {
    setRooms({ ...rooms, availableRooms: newRooms });
  });
  socket.on("reconnect-room", (roomName, refreshedUsers, roomStatus) => {
    setRooms({ ...rooms, currentRoom: roomName });
    filtredPlayers(refreshedUsers);
    setBattle({ ...battle, roomStatus });
  });
  socket.on("created", (users, message) => {
    filtredPlayers(users);
    setBattle({ ...battle, gameStatus: statuses.startBattle });
    setSuccessRoomMessage(message);
  });
  socket.on("joined", (users) => {
    filtredPlayers(users);
    setBattle({ ...battle, gameStatus: statuses.startBattle });
  });
  socket.on("leaved", (users) => { filtredPlayers(users); });
  socket.on("room-status", (roomStatus) => { setBattle({ ...battle, roomStatus }); });
  socket.on("user-choices", (choice) => { filtredPlayers(choice); });
  socket.on("user-statuses", (playersStatus) => { filtredPlayers(playersStatus); });
  socket.on("battle-result", (res) => { setBattle({ ...battle, battleResult: res, roomStatus: statuses.battle }); });
  socket.on("start-users", ((refreshedUsers) => { filtredPlayers(refreshedUsers); setBattle({ ...battle, battleResult: "" }); }));

  const contextValue = useMemo(() => ({
    emitJoinRoom,
    getAllRooms: emitGetAllRooms,
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
    leaveRoom: emitLeaveRoom,
    battle,
    toggleBattle: setBattle,
    emitCreateRoom,
    successRoomMessage,
    setSuccessRoomMessage,
    backToChoice,
    emitChangeStatus,
    isOpenChat,
    toggleChat,
    statuses,
    thisUser,
    emitStartBattle,
    setScore,
    gameStatus,
  }), [
    emitGetAllRooms,
    result,
    messageOptions,
    successRoomMessage,
    setBattle,
    score,
    gameTimer,
    players,
    userName,
    battle,
    backToChoice,
    emitMultiUserChoice,
    emitSingleUserChoice,
    emitLeaveRoom,
    rooms,
    emitChangeStatus,
    isOpenChat,
    thisUser,
    statuses,
    emitStartBattle,
    emitCreateRoom,
    emitJoinRoom,
    setScore,
    gameStatus,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

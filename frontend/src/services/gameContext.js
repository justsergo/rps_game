import {
  createContext, useCallback, useEffect, useLayoutEffect, useMemo, useState,
} from "react";

import SocketList from "../api/socketApi";
import { getUserId, getUserName } from "../common/localstorageGetItems";
import { GAME_TYPES } from "../constants/gameTypes";
import { STATUSES } from "../constants/statuses";

export const GameContext = createContext(null);

const socketMethod = new SocketList();

const GameContextProvider = ({ children }) => {
  const [isOpenChat, toggleChat] = useState(false);

  const [successRoomMessage, setSuccessRoomMessage] = useState(null);

  const [battleManager, setBattleManager] = useState({
    gameType: "",
    roomStatus: "",
    userStatus: "",
    battleResult: "",
  });

  const gameStatus = useMemo(() => battleManager.roomStatus, [battleManager]);

  const [rooms, setRooms] = useState({
    availableRooms: [],
    currentRoom: "",
  });

  const [userName, setUserName] = useState("");

  const [players, setPlayers] = useState([]);

  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(0);

  const id = getUserId();

  const thisUser = useMemo(() => {
    return players.find((user) => user.userId === id) || {
      playerName: "userName", status: "", choice: "", userId: "",
    };
  }, [id, players]);

  const filtredPlayers = (users) => {
    setPlayers(users.sort((a) => { if (a.userId === id) { return -1; } return 0; }));
  };

  useLayoutEffect(() => {
    socketMethod.emitReconnect(id);
  }, []);

  useEffect(() => {
    setUserName(getUserName);
  }, []);

  const connectToSingleRoom = useCallback(() => {
    setBattleManager({ ...battleManager, gameType: GAME_TYPES.single });
    setRooms({ ...rooms, currentRoom: id });
    socketMethod.emitCreateRoom(id, userName, id, GAME_TYPES.single);
  }, [userName, id, rooms, battleManager]);

  const emitStartBattle = useCallback(() => {
    socketMethod.emitStartBattle(rooms);
  }, [rooms]);

  const emitUserChoice = useCallback((playerChoice) => {
    socketMethod.emitChangeUserChoice(playerChoice, rooms, id);
  }, [rooms, id]);

  const emitChangeStatus = useCallback(() => {
    socketMethod.emitChangeUserStatus(rooms, id);
  }, [rooms, id]);

  const emitLeaveRoom = useCallback(() => {
    socketMethod.emitLeaveRoom(rooms, id);
  }, [id, rooms]);

  const emitCreateRoom = useCallback(({
    roomId, resetForm, redirectHandle, gameType,
  }) => {
    const roomIdFromGameType = gameType === GAME_TYPES.single ? id : roomId;
    setBattleManager({ ...battleManager, gameType });
    socketMethod.emitCreateRoom(roomIdFromGameType, userName, id, gameType);
    setRooms({ ...rooms, currentRoom: roomIdFromGameType });
    if (redirectHandle) { redirectHandle(); }
    if (resetForm) {
      resetForm();
    }
  }, [id, userName, rooms, battleManager]);

  const emitJoinRoom = useCallback((roomId, resetForm, redirectHandle) => {
    socketMethod.emitJoinRoom(roomId, userName, id);
    setRooms({ ...rooms, currentRoom: roomId });
    if (redirectHandle) { redirectHandle(); }
    if (resetForm) { resetForm(); }
  }, [rooms, userName, id]);

  const emitGetAllRooms = useCallback(() => {
    socketMethod.emitGetAllRooms((res) => {
      res.map((i) => { return { name: i }; });
      setRooms({ ...rooms, availableRooms: res });
    });
  }, [rooms]);

  socketMethod.emitCheckAvailableRooms((newRooms) => {
    setRooms({ ...rooms, availableRooms: newRooms });
  });
  socketMethod.listenerReconnect((roomName, refreshedUsers, roomStatus, roomType) => {
    setRooms({ ...rooms, currentRoom: roomName });
    filtredPlayers(refreshedUsers);
    setBattleManager({ ...battleManager, roomStatus, gameType: roomType });
  });
  socketMethod.listenerCreateRoom((users, message) => {
    filtredPlayers(users);
    setBattleManager({ ...battleManager, gameStatus: STATUSES.startBattle });
    setSuccessRoomMessage(message);
  });
  socketMethod.listenerJoinRoom((users) => {
    filtredPlayers(users);
    setBattleManager({ ...battleManager, gameStatus: STATUSES.startBattle });
  });
  socketMethod.listenerLeaveRoom((users) => { filtredPlayers(users); });
  socketMethod.listenerStatusRoom((roomStatus) => { setBattleManager({ ...battleManager, roomStatus }); });
  socketMethod.listenerChoiceUser((choice) => { filtredPlayers(choice); });
  socketMethod.listenerStatusUser((playersStatus) => { filtredPlayers(playersStatus); });
  socketMethod.listenerResultBattle((res) => {
    setBattleManager({ ...battleManager, battleResult: res, roomStatus: STATUSES.battle });
  });
  socketMethod.listenerRefreshBattle((refreshedUsers) => {
    filtredPlayers(refreshedUsers); setBattleManager({ ...battleManager, battleResult: "" });
  });
  socketMethod.listenerTimer((leftTime) => setTimer(leftTime));

  const contextValue = useMemo(() => ({
    emitJoinRoom,
    emitGetAllRooms,
    connectToSingleRoom,
    score,
    rooms,
    players,
    emitUserChoice,
    userName,
    emitLeaveRoom,
    battleManager,
    setBattleManager,
    emitCreateRoom,
    successRoomMessage,
    setSuccessRoomMessage,
    emitChangeStatus,
    isOpenChat,
    toggleChat,
    thisUser,
    emitStartBattle,
    setScore,
    gameStatus,
    timer,
  }), [
    emitGetAllRooms,
    successRoomMessage,
    setBattleManager,
    score,
    players,
    userName,
    battleManager,
    emitUserChoice,
    emitLeaveRoom,
    rooms,
    emitChangeStatus,
    isOpenChat,
    thisUser,
    emitStartBattle,
    emitCreateRoom,
    emitJoinRoom,
    setScore,
    gameStatus,
    connectToSingleRoom,
    timer,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

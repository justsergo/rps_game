import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { GameContext } from "../../services/gameContext";
import Chat from "../Chat";
import Header from "../ui/Header";
import { StyledContainer } from "./styles";

const Layout = () => {
  const { isOpenChat } = useContext(GameContext);
  return (
    <StyledContainer fixed>
      <Box component="div" sx={{ height: "15%" }}>
        <Header />
      </Box>

      <Box component="div" sx={{ height: "85%" }}>
        <Outlet />
      </Box>
      {isOpenChat && <Chat />}
    </StyledContainer>
  );
};

export default Layout;

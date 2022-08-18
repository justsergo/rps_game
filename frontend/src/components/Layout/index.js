import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import { StyledContainer } from "./styles";

const Layout = () => {
  return (
    <StyledContainer fixed>
      <Box component="div" sx={{ height: "15%" }}>
        <Header />
      </Box>

      <Box component="div" sx={{ height: "85%" }}>
        <Outlet />
      </Box>

    </StyledContainer>
  );
};

export default Layout;

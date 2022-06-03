import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import { StyledBox, StyledContainer } from "./styles";

const Layout = () => {
  return (
    <StyledContainer fixed>
      <StyledBox component="div">
        <Header />
      </StyledBox>

      <Box component="div">
        <Outlet />
      </Box>

      <Box component="div">
        <Footer />
      </Box>
    </StyledContainer>
  );
};

export default Layout;

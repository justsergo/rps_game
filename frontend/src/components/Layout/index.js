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

      <Box component="div" sx={{ height: "70%" }}>
        <Outlet />
      </Box>

      <Box component="div" sx={{ height: "12%" }}>
        <Footer />
      </Box>
    </StyledContainer>
  );
};

export default Layout;

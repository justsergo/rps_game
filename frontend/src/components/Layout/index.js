import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import { StyledContainer } from "./styles";

const Layout = () => {
  return (
    <StyledContainer fixed>
      <Box component="div" sx={{ height: "15%" }}>
        <Header />
      </Box>

      <Box component="div" sx={{ height: "65%" }}>
        <Outlet />
      </Box>

      <Box component="div" sx={{ height: "20%" }}>
        <Footer />
      </Box>
    </StyledContainer>
  );
};

export default Layout;

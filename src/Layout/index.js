import { Box, Button, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import useStyles from "./styles";

const Layout = () => {
  const classes = useStyles();
  return (
    <Container fixed className={classes.appContainer}>
      <Box component="div" className={classes.headerContainer}>
        <Header />
      </Box>
      <Button variant="gameText">Game</Button>
      <div>
        <Button variant="iconWrap">Game</Button>
        <Button variant="iconWrap">Game</Button>
        <Button variant="iconWrap">Game</Button>
      </div>

      <Box component="div">
        <Outlet />
      </Box>

      <Box component="div">
        <Footer />
      </Box>
    </Container>
  );
};

export default Layout;

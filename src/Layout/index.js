import { Box, Container } from "@material-ui/core";
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

import { Container, Grid } from "@material-ui/core";
import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import useStyles from "./styles";

const Layout = () => {
  const classes = useStyles();
  return (
    <Container fixed className={classes.appContainer}>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        className={classes.gridContainer}
      >

        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Outlet />
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;

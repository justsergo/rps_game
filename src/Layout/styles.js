import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  appContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  gridContainer: {
    height: "100%",
  },
  headerContainer: {
    height: "18%",
  },
}));

export default useStyles;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

  headerContainer: {
    height: "90%",
    margin: "10px auto auto auto",
    border: `3px solid ${theme.palette.background.headerOutline}`,
    borderRadius: theme.spacing(15),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "40%",
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "1rem",
  },

  text: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.9rem",
      lineHeight: "1.5rem",
    },
  },

  scoreContainer: {
    width: "20%",
    height: "85%",
    background: theme.palette.common.white,
    borderRadius: theme.spacing(12),
    marginRight: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "70%",
    },
  },

  scoreText: {
    color: theme.palette.text.score,
  },

  scoreValue: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5rem",
    },
  },
}));

export default useStyles;

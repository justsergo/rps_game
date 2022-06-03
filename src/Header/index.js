import { Grid, Typography } from "@mui/material";

import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.headerContainer} xs={11} lg={8}>
      <Grid item component="div" className={classes.textContainer}>
        <Typography variant="h1" color="textPrimary" className={classes.text}>rock</Typography>
        <Typography variant="h1" color="textPrimary" className={classes.text}>paper</Typography>
        <Typography variant="h1" color="textPrimary" className={classes.text}>scissors</Typography>
      </Grid>

      <Grid item component="div" className={classes.scoreContainer} xs={4} md={2} lg={2}>
        <Typography variant="body2" color="textPrimaryScore" className={classes.scoreText}>SCORE</Typography>
        <Typography variant="caption" color="textSecondary" className={classes.scoreValue}>8</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;

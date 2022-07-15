import {
  Button,
  Grid, Link, Popover, Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RulesImage } from "../../assets/images";
import ModalComponent from "../../components/Modal";
import style, {
  StyledGrid, StyledSubtitle, StyledTitle,
} from "./styles";

const StartPage = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);

  const toPlay = () => navigate("game");
  const toAuth = () => navigate("auth");

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const openPopup = (event) => setAnchorEl(event.currentTarget);
  const closePopup = () => setAnchorEl(null);

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  return (
    <StyledGrid container item xs={10}>
      <Grid container spacing={2} sx={{ flexDirection: "column" }}>
        <Grid item>
          <StyledTitle variant="caption">Rock Paper Scissors</StyledTitle>
        </Grid>

        <StyledSubtitle spacing={45} variant="caption">the game</StyledSubtitle>
      </Grid>

      <Grid container direction="column" spacing={60}>

        <Grid item>
          <Link
            component="button"
            variant="h1"
            color="textPrimary"
            onClick={toPlay}
            sx={style.menu}
          >
            SINGLE PLAYER
          </Link>
        </Grid>

        <Grid item>
          <Link
            component="button"
            variant="h1"
            color="textPrimary"
            aria-describedby={id}
            onClick={openPopup}
            sx={style.menu}
          >
            MULTIPLAYER
          </Link>
          <Popover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={closePopup}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              variant="body1"
              color="textSecondary"
              sx={style.popoverText}
            >Coming soon...
            </Typography>
          </Popover>
        </Grid>

        <Grid item>
          <Link
            component="button"
            variant="body1"
            color="textPrimary"
            aria-describedby={id}
            onClick={toAuth}
            sx={style.authLink}
          >
            AUTHENTICATION
          </Link>
        </Grid>

      </Grid>

      <Grid container flexDirection="column" alignItems="center" spacing={30}>
        <Grid item>
          <Typography variant="body1" color="textPrimary" sx={style.rules}>A classic two-person game. Players start each round by saying,
            “rock, paper, scissors, shoot!” On “shoot,” each player holds out their fist for rock, flat hand for paper,
            or their index and middle finger for scissors. Rock crushes scissors, scissors cut paper, and paper covers
            rock. See who wins each round!
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="outlined" color="common" size="small" onClick={openModal}>see the rules</Button>
          <ModalComponent isOpen={modal} close={closeModal}>
            <RulesImage />
          </ModalComponent>
        </Grid>

      </Grid>

    </StyledGrid>
  );
};

export default StartPage;

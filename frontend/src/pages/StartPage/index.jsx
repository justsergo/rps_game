import {
  Button,
  Grid, Link, Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RulesImage } from "../../assets/images";
import RoomsModalContainer from "../../components/RoomsModal";
import ModalWrapper from "../../components/RoomsModal/modalWrapper";
import { GAME_TYPES } from "../../constants/gameTypes";
import { GameContext } from "../../services/gameContext";
import theme from "../../theme";
import style, {
  StyledGrid, StyledSubtitle, StyledTitle,
} from "./styles";

const StartPage = () => {
  const [modal, setModal] = useState(false);
  const [openRoomsModal, setOpenRoomsModal] = useState(false);
  const { emitCreateRoom } = useContext(GameContext);
  const navigate = useNavigate();

  const startSingleGameParams = {
    redirectHandle: () => navigate("game"),
    gameType: GAME_TYPES.single,
  };

  const toSingle = () => emitCreateRoom(startSingleGameParams);
  const toAuth = () => navigate("auth");

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const closeRoomsModal = () => setOpenRoomsModal(false);
  const toMultiplayer = () => setOpenRoomsModal(true);

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
            onClick={toSingle}
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
            onClick={toMultiplayer}
            sx={style.menu}
          >
            MULTIPLAYER
          </Link>

          {openRoomsModal && <RoomsModalContainer isOpen={openRoomsModal} close={closeRoomsModal} />}
        </Grid>

        <Grid item>
          <Link
            component="button"
            variant="body1"
            color="textPrimary"
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
          <ModalWrapper
            isOpen={modal}
            close={closeModal}
            background={theme.palette.background.headerOutline}
            width="400px"
            padding="16px"
          >
            <RulesImage />
          </ModalWrapper>
        </Grid>

      </Grid>

    </StyledGrid>
  );
};

export default StartPage;

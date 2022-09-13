import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { helperText, isError } from "../../common/formTextHelper";
import { joinRoomValidate } from "../../common/formValidate";
import { resetFormCallback } from "../../common/resetForm";
import { AUTOCOMPLETE } from "../../constants/names";
import { GameContext } from "../../services/gameContext";
import MuiAutocomplete from "./muiAutocomplete";

const JoinRoom = () => {
  const navigate = useNavigate();
  const { emitGetAllRooms, rooms, emitJoinRoom } = useContext(GameContext);

  const resetForm = () => resetFormCallback(formik);

  const redirectHandle = () => navigate("game");

  const formik = useFormik({
    initialValues: {
      joinRoom: "",
    },
    validate: (values) => joinRoomValidate(values),

    onSubmit: (data) => {
      emitJoinRoom(data.joinRoom, resetForm, redirectHandle);
      resetForm();
    },
  });

  useEffect(() => {
    emitGetAllRooms();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container item type="form" sx={{ width: "100%", marginTop: { xs: "20%", sm: "16%" } }}>
        <Grid item xs={8} sx={{ margin: "auto" }}>
          <MuiAutocomplete
            id={AUTOCOMPLETE.JOIN_ROOM}
            name={AUTOCOMPLETE.JOIN_ROOM}
            allRooms={rooms.availableRooms}
            onChange={(e, value) => formik.setFieldValue(AUTOCOMPLETE.JOIN_ROOM, value)}
            value={formik.values.joinRoom}
            isError={
              isError(formik, AUTOCOMPLETE.JOIN_ROOM)
            }
            helperText={
              helperText(formik, AUTOCOMPLETE.JOIN_ROOM)
            }
          />
        </Grid>

        <Grid item xs={9} sx={{ margin: "40px auto auto auto" }}>
          <Button type="submit" variant="contained" sx={{ padding: "10px 30px" }}>JOIN ROOM</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default JoinRoom;

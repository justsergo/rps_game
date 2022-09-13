import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { helperText, isError } from "../../common/formTextHelper";
import { createRoomValidate } from "../../common/formValidate";
import { resetFormCallback } from "../../common/resetForm";
import { TEXT_FIELD_NAMES } from "../../constants/names";
import { TEXT_FIELD_TYPES } from "../../constants/types";
import { GameContext } from "../../services/gameContext";
import MuiTextField from "../ui/MuiTextField";

const CreateRoom = () => {
  const navigate = useNavigate();
  const { emitCreateRoom } = useContext(GameContext);

  const resetForm = () => resetFormCallback(formik);

  const redirectHandle = () => {
    navigate("game");
  };

  const formik = useFormik({
    initialValues: {
      createRoomName: "",
      gameType: "multi",
    },
    validate: (values) => createRoomValidate(values),

    onSubmit: (data) => {
      const { gameType, createRoomName: roomId } = data;
      emitCreateRoom({
        roomId, resetForm, redirectHandle, gameType,
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container item type="form" sx={{ width: "100%", marginTop: { xs: "20%", sm: "16%" } }}>
          <Grid item xs={8} sx={{ margin: "auto" }}>
            <MuiTextField
              type={TEXT_FIELD_TYPES.TEXT}
              name={TEXT_FIELD_NAMES.CREATE_ROOM_NAME}
              label="Create room"
              placeholder="Enter room name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.createRoomName}
              isError={
                isError(formik, TEXT_FIELD_NAMES.CREATE_ROOM_NAME)
              }
              helperText={
                helperText(formik, TEXT_FIELD_NAMES.CREATE_ROOM_NAME)
              }
            />
          </Grid>

          <Grid item xs={9} sx={{ margin: "40px auto auto auto" }}>
            <Button type="submit" variant="contained" sx={{ padding: "10px 30px" }}>Create ROOM</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateRoom;

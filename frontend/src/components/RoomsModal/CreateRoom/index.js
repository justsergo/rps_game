import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { helperText, isError } from "../../../common/utils/formTextHelper";
import { createRoomValidate } from "../../../common/utils/formValidate";
import { resetFormCallback } from "../../../common/utils/resetForm";
import { TEXT_FIELD_NAMES } from "../../../constants/names";
import { TEXT_FIELD_TYPES } from "../../../constants/types";
import { GameContext } from "../../../services/gameContext";
import MuiTextField from "../../MuiTextField";

const CreateRoom = () => {
  const navigate = useNavigate();
  const { emitCreateRoom } = useContext(GameContext);

  const resetForm = () => resetFormCallback(formik);

  const redirectHandle = (navigateTo) => {
    navigate(navigateTo);
  };

  const formik = useFormik({
    initialValues: {
      createRoomName: "",
    },
    validate: (values) => createRoomValidate(values),

    onSubmit: (data) => {
      emitCreateRoom(data.createRoomName, resetForm, redirectHandle);
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

import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";

import { TEXT_FIELD_NAMES } from "../../../constants/names";
import { TEXT_FIELD_TYPES } from "../../../constants/types";
import MuiTextField from "../../MuiTextField";

const CreateRoom = () => {
  const formik = useFormik({
    initialValues: {
      createRoom: "",
    },
    onSubmit: (data) => {
      console.log(data);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container item type="form" sx={{ width: "100%", marginTop: { xs: "20%", sm: "16%" } }}>
        <Grid item xs={8} sx={{ margin: "auto" }}>
          <MuiTextField
            type={TEXT_FIELD_TYPES.TEXT}
            name={TEXT_FIELD_NAMES.CREATE_ROOM}
            label="Create room"
            placeholder="Enter room name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.createRoom}
          />
        </Grid>

        <Grid item xs={9} sx={{ margin: "40px auto auto auto" }}>
          <Button type="submit" variant="contained" sx={{ padding: "10px 30px" }}>Create ROOM</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateRoom;

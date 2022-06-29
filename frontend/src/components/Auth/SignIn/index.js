import {
  Button, Grid, Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInSubmitHandler } from "../../../api/authApi";
import { helperText, isError } from "../../../common/utils/formTextHelper";
import { signInValidate } from "../../../common/utils/formValidate";
import { resetFormCallback } from "../../../common/utils/resetForm";
import { TEXT_FIELD_NAMES } from "../../../constants/names";
import { TEXT_FIELD_TYPES } from "../../../constants/types";
import MuiTextField from "../../MuiTextField";
import { RequestSnackbar } from "../../Snackbars/RequestSnackbar";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorRequest, setErrorRequest] = useState(null);
  const [successRequest, setSuccessRequest] = useState(null);

  const resetForm = () => resetFormCallback(formik);

  const redirectHandle = (navigateTo) => setTimeout(() => {
    navigate(navigateTo);
  }, 3000);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => signInValidate(values),

    onSubmit: (data) => {
      signInSubmitHandler(data, setSuccessRequest, redirectHandle, setErrorRequest, resetForm);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container type="form" sx={{ width: "100%", marginTop: { xs: "20%", sm: "16%" } }}>
          <Grid item xs={9} sx={{ margin: "auto" }}>
            <MuiTextField
              type={TEXT_FIELD_TYPES.TEXT}
              name={TEXT_FIELD_NAMES.USERNAME}
              label="Username"
              placeholder="Enter username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              isError={
                isError(formik, TEXT_FIELD_NAMES.USERNAME)
              }
              helperText={
                helperText(formik, TEXT_FIELD_NAMES.USERNAME)
              }
            />
          </Grid>
          <Grid item xs={9} sx={{ margin: "40px auto auto auto" }}>
            <MuiTextField
              type={TEXT_FIELD_TYPES.PASSWORD}
              name={TEXT_FIELD_NAMES.PASSWORD}
              label="Password"
              placeholder="Enter password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              isError={
                isError(formik, TEXT_FIELD_NAMES.PASSWORD)
              }
              helperText={
                helperText(formik, TEXT_FIELD_NAMES.PASSWORD)
              }
            />
          </Grid>

          <Grid item xs={9} sx={{ margin: "40px auto auto auto" }}>
            <Button type="submit" variant="contained" sx={{ padding: "10px 30px" }}>Sign In</Button>
          </Grid>

          <Grid item xs={9} sx={{ margin: "5% auto auto auto", alignSelf: "flex-end" }}>
            <Typography variant="body2" color="textSecondary">Don't have an Account?</Typography>
            <Typography variant="body2" color="textSecondary">Please use Sign Up</Typography>
          </Grid>
        </Grid>
      </form>
      <RequestSnackbar error={errorRequest} success={successRequest} />
    </>
  );
};

export default SignIn;

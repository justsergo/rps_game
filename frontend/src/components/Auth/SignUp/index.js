import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import { signUpSubmitHandler } from "../../../api/authApi";
import { helperText, isError } from "../../../common/utils/formTextHelper";
import { signUpValidate } from "../../../common/utils/formValidate";
import { resetFormCallback } from "../../../common/utils/resetForm";
import { TEXT_FIELD_NAMES } from "../../../constants/names";
import { TEXT_FIELD_TYPES } from "../../../constants/types";
import MuiTextField from "../../MuiTextField";
import { RequestSnackbar } from "../../Snackbars/RequestSnackbar";

const SignUp = () => {
  const [errorRequest, setErrorRequest] = useState(null);
  const [successRequest, setSuccessRequest] = useState(null);

  const resetForm = () => resetFormCallback(formik);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => signUpValidate(values),
    onSubmit: (data) => {
      signUpSubmitHandler(data, setSuccessRequest, setErrorRequest, resetForm);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container type="form" sx={{ marginTop: { xs: "20%", sm: "14%", lg: "10%" } }}>
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

          <Grid item xs={9} sx={{ margin: "30px auto auto auto" }}>
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

          <Grid item xs={9} sx={{ margin: "30px auto auto auto" }}>
            <MuiTextField
              type={TEXT_FIELD_TYPES.PASSWORD}
              name={TEXT_FIELD_NAMES.CONFIRM_PASSWORD}
              label="Confirm password"
              placeholder="Confirm password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isError={
                isError(formik, TEXT_FIELD_NAMES.CONFIRM_PASSWORD)
                }
              helperText={
                helperText(formik, TEXT_FIELD_NAMES.CONFIRM_PASSWORD)
                }
            />
          </Grid>

          <Grid item xs={9} sx={{ margin: { xs: "40px auto auto auto", sm: "60px auto auto auto" } }}>
            <Button type="submit" variant="contained" sx={{ padding: "10px 30px" }}>Sign Up</Button>
          </Grid>
        </Grid>
      </form>
      <RequestSnackbar error={errorRequest} success={successRequest} />
    </>
  );
};

export default SignUp;

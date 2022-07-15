export const signUpValidate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Field is required";
  } else if (values.username.length < 3) {
    errors.username = "Cannot be less than 3 characters";
  } else if (values.username.length > 10) {
    errors.username = "Cannot be more than 10 characters";
  }
  if (!values.password.length) {
    errors.password = "Field is required";
  } else if (values.password.length < 3) {
    errors.password = "Password is at least 3 characters long";
  }
  if (!values.confirmPassword.length) {
    errors.confirmPassword = "Field is required";
  } else if (values.confirmPassword.length !== values.password.length) {
    errors.confirmPassword = "Password and Confirm Password does not match";
  }
  return errors;
};

export const signInValidate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Field is required";
  } else if (values.username.length < 3) {
    errors.username = "Cannot be less than 3 characters";
  } else if (values.username.length > 10) {
    errors.username = "Cannot be more than 10 characters";
  }
  if (!values.password.length) {
    errors.password = "Field is required";
  } else if (values.password.length < 3) {
    errors.password = "Password is at least 3 characters long";
  }
  return errors;
};

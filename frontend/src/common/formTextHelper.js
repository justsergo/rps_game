export const isError = (formik, fieldName) => Boolean(formik.errors[fieldName] && formik.touched[fieldName]);

export const helperText = (formik, fieldName) => formik.errors[fieldName]
  && formik.touched[fieldName]
  && String(formik.errors[fieldName]);

import axios from "axios";

const instance = axios.create({ baseURL: process.env.BASE_URL });

export const authAPI = {
  signIn(username, password) { return instance.post("/users/login", { username, password }); },

  signUp(username, password) {
    return instance.post("/users/registration", { username, password });
  },
};

export const signInSubmitHandler = async (
  data,
  setSuccessRequest,
  redirectHandle,
  setErrorRequest,
  resetForm,
) => {
  try {
    const res = await authAPI.signIn(data.username, data.password);
    if (res.data.username) {
      setSuccessRequest(`${res.data.username} login successful`);
      localStorage.setItem("username", JSON.stringify(res.data.username));
      redirectHandle("/");
    } else setErrorRequest(res.data);
  } catch (error) {
    setErrorRequest(error.message);
  }
  if (resetForm) {
    resetForm();
  }
};

export const signUpSubmitHandler = async (data, setSuccessRequest, setErrorRequest, resetForm) => {
  try {
    const res = await authAPI.signUp(data.username, data.password);
    setSuccessRequest(res.data);
  } catch (error) {
    setErrorRequest(error.message);
  }
  if (resetForm) {
    resetForm();
  }
};

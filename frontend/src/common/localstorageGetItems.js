export const getUserName = () => {
  const initial = JSON.parse(localStorage.getItem("user"));
  if (initial !== null) {
    return JSON.stringify(initial.username);
  } return "";
};

export const getUserId = () => {
  const initial = JSON.parse(localStorage.getItem("user"));
  if (initial) {
    return JSON.stringify(initial.id);
  } return "";
};

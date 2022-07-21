import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const username = localStorage.getItem("username");
  return username ? children : <Navigate to="/auth" />;
};

export default Private;

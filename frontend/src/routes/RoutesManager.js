import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "../components/Auth";
import Layout from "../components/Layout";
import SingleGame from "../pages/SingleGame";
import StartPage from "../pages/StartPage";

const RoutesManager = () => {
  const shouldRedirect = true;
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/auth/:type" element={<Auth />} />
        <Route
          path="auth"
          element={
          shouldRedirect ? (
            <Navigate replace to="/auth/signIn" />
          ) : (
            <StartPage />
          )
         }
        />
        <Route path="game" element={<Layout />}>
          <Route index element={<SingleGame />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesManager;

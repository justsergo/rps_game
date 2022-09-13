import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import AuthMangaer from "../pages/Authentication";
import Game from "../pages/Game";
import StartPage from "../pages/StartPage";

const RoutesManager = () => {
  const shouldRedirect = true;
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/auth/:type" element={<AuthMangaer />} />
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
          <Route
            index
            element={<Game />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesManager;

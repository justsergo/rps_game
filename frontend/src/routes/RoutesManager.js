import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import SingleGame from "../components/SingleGame";
import Battle from "../pages/single_player/Battle";
// import Menu from "../pages/single_player/Menu";
import StartPage from "../pages/StartPage";

const RoutesManager = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="game" element={<Layout />}>
          <Route index element={<SingleGame />} />
          <Route path="battle" element={<Battle />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesManager;

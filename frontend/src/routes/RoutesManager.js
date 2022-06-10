import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import Battle from "../pages/Battle";
import Menu from "../pages/Menu";
import StartPage from "../pages/StartPage";

const RoutesManager = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="game" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="battle" element={<Battle />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesManager;

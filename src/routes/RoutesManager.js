import { Route, Routes } from "react-router-dom";

import Game from "../Game";
import Layout from "../Layout";
import Play from "../Play";

const RoutesManager = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Play />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesManager;

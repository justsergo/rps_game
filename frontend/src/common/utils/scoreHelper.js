import { useContext, useEffect, useState } from "react";

import { GameContext } from "../../services/gameContext";

const ScoreHelper = () => {
  const { resultPoint } = useContext(GameContext);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(score + resultPoint);
  }, [resultPoint]);

  return (
    <>
      {score}
    </>
  );
};

export default ScoreHelper;

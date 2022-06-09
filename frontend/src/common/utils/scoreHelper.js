import { GameContext } from "frontend/src/services/gameContext";
import { useContext, useEffect, useState } from "react";

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

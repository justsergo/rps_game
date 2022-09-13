import { Button } from "@mui/material";
import styled from "styled-components";

const IconButton = styled(Button)`
  @keyframes shake {
    0% {
      top: 0;
    }
    50% {
      top: 1rem;
    }
    100% {
      top: 0;
    }
  };

  @keyframes win {
    0% {
      box-shadow: none;
    }
    30% {
      box-shadow: ${({ theme }) => theme.shadows.winLayerOne};
    }
    60% {
      box-shadow: ${({ theme }) => theme.shadows.winLayerOne}, ${({ theme }) => theme.shadows.winLayerTwo};
    }
    100% {
      box-shadow: ${({ theme }) => theme.shadows.winLayerOne},
      ${({ theme }) => theme.shadows.winLayerTwo},
      ${({ theme }) => theme.shadows.winLayerThree};
    }
  };

 
  
  grid-area: ${({ $gridArea }) => $gridArea};

  &::before {
    animation: ${({ $isWin }) => $isWin && "win 1s linear 3 forwards"};
  }

  &:hover {
    will-change: top;
    animation: ${({ $isShake }) => $isShake && "shake 0.4s 3"};
  }
`;

export default IconButton;

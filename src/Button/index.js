import { Button } from "@mui/material";
import styled from "styled-components";

const IconButton = styled(Button)`
  @keyframes shake{
    0% { top: 0; }
    50% { top: 1rem; }
    100% { top: 0; }
  };
  will-change: top;
  animation: ${({ isShake }) => isShake && "shake 0.4s 3"};
`;

export default IconButton;

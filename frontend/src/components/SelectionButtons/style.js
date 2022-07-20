import { Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0%, 18%, 20%, 50.1%, 65.1%, 80%, 90.1%, 92% {
    color: ${({ theme }) => theme.palette.text.secondary};
    text-shadow: none;
  }
  18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100% {
    color: #fff;
    text-shadow: 0 0 10px #03bcf4,
    0 0 20px #03bcf4,
    0 0 40px #03bcf4,
    0 0 80px #03bcf4,
    0 0 160px #03bcf4;
  }
`;

export const AnimatedTittle = styled(Typography)`
  position: relative;
  margin-top: 25px;
  color: transparent;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  line-height: 2rem;
  font-size: 2.5rem;
  animation: ${animate} 6s linear;
  animation-iteration-count: infinite;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 2rem;
    line-height: 1.5rem;
  }
`;

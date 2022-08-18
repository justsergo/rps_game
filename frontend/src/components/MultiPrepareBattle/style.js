import { Container, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";

export const Circle = styled.div`
    position: absolute;
    top: 90%;
    left: 60%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ status }) => (status ? "green" : "red")};
`;

export const StyledContainer = styled(Container)`
  @keyframes pulse{
    0% {
      -moz-box-shadow: 0 0 0 0 hsl(229, 25%, 31%);
      box-shadow: 0 0 0 0 hsl(229, 25%, 31%);
    }
    70% {
      -moz-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
    }
  };
  
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.text.secondary};
  animation: pulse 1s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: ${({ theme }) => theme.shadows.boxShadow};

  @media (max-width: 600px) {
    width: 3rem;
    height: 3rem;
  }
  
  @media (max-width: 400px) {
    width: 2rem;
    height: 2rem;
  }
;
`;

const animate = keyframes`
  0%, 18%, 20%, 50.1%, 65.1%, 80%, 90.1%, 92% {
    color: ${({ theme }) => theme.palette.text.secondary};
    text-shadow: none;
  }
  18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100% {
    color: #fff;
    text-shadow: 0 0 10px #03bcf4,
    0 0 10px #03bcf4,
    0 0 20px #03bcf4,
    0 0 40px #03bcf4,
    0 0 80px #03bcf4;
  }
`;

export const AnimatedTittle = styled(Typography)`
  position: absolute;
  top: 30%;
  color: transparent;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
  font-size: 1.5rem;
  animation: ${animate} 6s linear;
  animation-iteration-count: infinite;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 2rem;
    line-height: 1.5rem;
  }
`;

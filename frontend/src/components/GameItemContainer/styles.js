import { Container } from "@mui/material";
import styled from "styled-components";

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
  
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.text.secondary};
  animation: pulse 1s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: ${({ theme }) => theme.shadows.boxShadow};

  @media (max-width: 600px) {
    width: 8rem;
    height: 8rem;
  }
  
  @media (max-width: 400px) {
    width: 6rem;
    height: 6rem;
  }
;
`;

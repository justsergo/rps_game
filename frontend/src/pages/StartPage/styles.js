import { Grid, Typography } from "@mui/material";
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

export const StyledGrid = styled(Grid)`
  height: 100vh;
  margin: auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 10px 0;
  }
`;

export const StyledTitle = styled(Typography)`
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px ${({ theme }) => theme.palette.text.primary};
  text-transform: uppercase;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 2.5rem;
  }
`;

export const StyledSubtitle = styled(Typography)`
  position: relative;
  margin-top: 25px;
  color: transparent;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  line-height: 2.8rem;
  animation: ${animate} 6s linear;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 2.5rem;
    line-height: 2rem;
    margin-top: 12px;
  }
`;

export default {
  menu: (theme) => ({
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
  }),
  authLink: (theme) => ({
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      paddingBottom: "15px",
    },
  }),
  rules: (theme) => ({
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      lineHeight: "1rem",
    },
  }),
  popoverText: (theme) => ({
    pt: 20,
    pb: 20,
    pl: 50,
    pr: 50,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      pt: 10,
      pb: 10,
      pl: 30,
      pr: 30,
    },
  }),
};

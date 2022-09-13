import { Grid, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";

import { RESPONSE_USER_STATUS } from "../../../constants/names";

const rollAnimation = ({ status }) => keyframes`
  0% {
    color: ${status === RESPONSE_USER_STATUS.READY ? "rgba(0, 148, 255, 0.3)" : "rgba(244, 67, 54, 0.3)"};
    font-size: 0px;
    opacity: 0;
    margin-left: -30px;
    margin-top: 0px;
    transform: rotate(-25deg);
    will-change: transform;
  }
  40% {
    color: ${status === RESPONSE_USER_STATUS.READY ? "rgba(0,148,255,0.5)" : "rgba(244, 67, 55, 0.5)"};
    opacity: 1;
    transform: rotate(0deg);
    will-change: color, opacity, transform;
  }
  60% {
    color: ${status === RESPONSE_USER_STATUS.READY ? "rgba(0,148,255,0.8)" : "rgba(244, 67, 55, 0.8)"};
    font-size: 1rem;
    opacity: 1;
    margin-left: 0px;
    margin-top: 0px;
    will-change: color, font-size, opacity;
  }
  100% {
    color: ${status === RESPONSE_USER_STATUS.READY ? "rgba(0,148,255,0.95)" : "rgba(244, 67, 55, 0.95)"};
    text-shadow: 2px 2px 0px rgb(0 0 0 / 22%);
    font-size: 1.5rem;
    opacity: 1;
    margin-left: 0px;
    margin-top: 0px;
    transform: rotate(0deg);
    animation-play-state: paused;
    will-change: color, font-size, text-shadow, transform;
  }
`;

export const StyledWrapper = styled(Grid)`
  height: 90%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTypography = styled(Typography)`
  opacity:0;
  letter-spacing: 1px;
  animation-name: ${({ status }) => rollAnimation({ status })};
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

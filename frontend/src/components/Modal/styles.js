import { Box } from "@mui/material";
import styled from "styled-components";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.palette.background.headerOutline};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  border-radius: 15px;
`;

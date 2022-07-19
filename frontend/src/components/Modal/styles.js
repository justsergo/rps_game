import { Paper } from "@mui/material";
import styled from "styled-components";

export const StyledPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  background-color: ${({ background }) => (background)};
  border-radius: 15px;
  padding: ${({ padding }) => (padding)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: ${({ smWidth }) => (smWidth)};
    height: ${({ smHeight }) => (smHeight)};
  }
`;

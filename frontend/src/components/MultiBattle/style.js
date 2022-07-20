import { Grid, Typography } from "@mui/material";
import styled from "styled-components";

export const StyledTypography = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down("md")} {
   font-size: 1.5rem;
  }
;
`;

export const GameResultGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-self: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 50%);
  }
;
`;

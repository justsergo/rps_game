import { Paper } from "@mui/material";
import styled from "styled-components";

export const StyledPaper = styled(Paper)`
  width: 100%;
  height: 60%;
  margin: 20px auto;
  align-self: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    height: 65%;
  }
`;

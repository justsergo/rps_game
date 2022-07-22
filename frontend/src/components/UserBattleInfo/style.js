import { Grid } from "@mui/material";
import styled from "styled-components";

export const StyledGrid = styled(Grid)`
  height: 15%;
  margin: 10px auto auto auto;
  padding: 10px 0;
  border: 3px solid ${({ theme }) => theme.palette.background.headerOutline};
  border-radius: ${({ theme }) => theme.spacing(15)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

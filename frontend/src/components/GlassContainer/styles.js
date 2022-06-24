import { Grid } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styled(Grid)`
  backdrop-filter: blur(10px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
`;

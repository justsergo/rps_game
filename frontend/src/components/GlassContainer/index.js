import { Grid } from "@mui/material";
import styled from "styled-components";

export const GlassContainer = styled(Grid)`
  backdrop-filter: blur(1px) saturate(154%);
  background-color: rgba(255, 255, 255, 0.31);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.7);
`;

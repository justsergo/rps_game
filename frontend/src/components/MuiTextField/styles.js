import { TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
  && input {
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  :hover {
    && fieldset {
      border-color: ${({ theme, error }) => (error ? theme.palette.error : theme.palette.textField.hover)};
      border-width: ${({ theme, error }) => (error && theme.spacing(2))};
    }
  }
,
`;

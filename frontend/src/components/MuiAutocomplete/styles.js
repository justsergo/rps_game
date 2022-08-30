import {
  Autocomplete, Box, TextField,
} from "@mui/material";
import styled from "styled-components";

export const StyledAutocomplete = styled(Autocomplete)`
  && input {
    color: ${({ theme }) => theme.palette.text.secondary};
  }

,
`;

export const StyledTextField = styled(TextField)`
  :hover {
    && fieldset {
      border-color: ${({ theme, error }) => (error ? theme.palette.error : theme.palette.textField.hover)};
      border-width: ${({ theme, error }) => (error && theme.spacing(2))};
    }
  }

,
& . MuiFormHelperText-root {
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  user-select: none;
  line-height: 0;
},
`;

export const StyledBox = styled(Box)`
  color: ${({ theme }) => theme.palette.text.secondary};,
`;

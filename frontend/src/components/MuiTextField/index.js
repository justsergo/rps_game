import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  IconButton, InputAdornment, Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

import { TEXT_FIELD_TYPES } from "../../constants/types";
import { StyledTextField } from "./styles";

const MuiTextField = ({
  label, placeholder, value, isError, helperText, disabled, type, onBlur, onChange, name,
}) => {
  const [values, setValues] = useState(true);

  const togglePassword = useCallback(() => setValues((item) => !item), [setValues]);

  const passwordType = type === TEXT_FIELD_TYPES.PASSWORD;

  return (
    <>
      <StyledTextField
        id={name}
        name={name}
        label={label}
        size="small"
        variant="outlined"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        type={passwordType && values ? TEXT_FIELD_TYPES.PASSWORD : TEXT_FIELD_TYPES.TEXT}
        placeholder={placeholder}
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {(passwordType) && (
                <IconButton onClick={togglePassword} edge="end" disableFocusRipple>
                  {values ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        error={isError}
        disabled={disabled}
        helperText={<Typography sx={{ position: "absolute" }} variant="body2">{helperText}</Typography>}
      />
    </>
  );
};

export default MuiTextField;

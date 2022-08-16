import { Typography } from "@mui/material";

import {
  StyledAutocomplete, StyledBox, StyledTextField,
} from "./styles";

const MuiAutocomplete = ({
  id, allRooms, onChange, name, isError, helperText, value,
}) => {
  return (
    <>
      <StyledAutocomplete
        id={id}
        options={allRooms.map((option) => option)}
        isOptionEqualToValue={(option) => !value || option === value}
        value={value}
        onChange={onChange}
        renderOption={(props, option) => (
          <StyledBox component="li" {...props} key={option}>{option}</StyledBox>
        )}
        renderInput={(params) => (
          <StyledTextField
            name={name}
            {...params}
            label="Enter room name"
            error={isError}
            fullWidth
            helperText={<Typography sx={{ position: "absolute" }} variant="body2">{helperText}</Typography>}
          />
        )}
        noOptionsText="Room not found"
        fullWidth
        size="small"
      />
    </>
  );
};

export default MuiAutocomplete;

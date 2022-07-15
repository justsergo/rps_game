import { Alert, ClickAwayListener, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export function RequestSnackbar({ error, success }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error || success !== null) {
      setOpen(true);
    }
  }, [success, error]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        { success !== null ? (
          <Alert variant="filled" severity="success">
            {success}
          </Alert>
        ) : (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Snackbar>
    </ClickAwayListener>
  );
}

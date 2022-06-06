import { createTheme } from "@mui/material";

import createComponents from "./components";
import { createOverrides } from "./overrides";
import palette from "./palette";
import typography from "./typography";

const defaultTheme = {
  // spacing 1 === 8px
  spacing: 1,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1440,
      xl: 1920,
    },
  },

  palette,
  typography,
};

const theme = createTheme({
  ...defaultTheme,
  overrides: createOverrides(defaultTheme),
  components: createComponents(palette),
});

export default theme;

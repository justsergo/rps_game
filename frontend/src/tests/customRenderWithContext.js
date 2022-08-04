import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";

import GameContextProvider from "../services/gameContext";
import theme from "../theme";

const renderWithContext = (ui) => render(
  <ThemeProvider theme={theme}><GameContextProvider>{ui}</GameContextProvider></ThemeProvider>,
);

export default renderWithContext;

import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import RoutesManager from "./routes/RoutesManager";
import GameContextProvider from "./services/gameContext";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameContextProvider>
        <BrowserRouter>
          <RoutesManager />
        </BrowserRouter>
      </GameContextProvider>
    </ThemeProvider>

  );
}

export default App;

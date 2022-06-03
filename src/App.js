import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import RoutesManager from "./routes/RoutesManager";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RoutesManager />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

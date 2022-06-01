import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import RoutesManager from "./routes/RoutesManager";
import theme from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <RoutesManager />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

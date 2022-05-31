import { Typography } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Typography variant="h1" color="textPrimary">Build Rock, Paper and Scissors Game with React JS</Typography>
    </MuiThemeProvider>
  );
}

export default App;

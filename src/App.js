import { ThemeProvider } from "styled-components";

import Text from "./components/Text";
import { baseTheme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Text variant="semi_18px">Build Rock, Paper and Scissors Game with React JS</Text>
    </ThemeProvider>
  );
}

export default App;

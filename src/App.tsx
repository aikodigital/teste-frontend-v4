import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import customTheme from "./theme/customTheme";
import EquipmentDashboard from "./components/EquipmentDashboard";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <EquipmentDashboard />
    </ThemeProvider>
  );
}

export default App;

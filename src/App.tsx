import {
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Mapa from "./components/Mapa";
import { CompleteEquipmentData } from "./types";
import { joinEquipmentData } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [fullEquipmentData, setFullEquipmentData] =
    useState<CompleteEquipmentData | null>(null);

  useEffect(() => {
    const data = joinEquipmentData();
    setFullEquipmentData(data);
  }, [setFullEquipmentData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {fullEquipmentData ? (
        <Mapa fullEquipmentData={fullEquipmentData} />
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
}

export default App;

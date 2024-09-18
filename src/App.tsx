import "./App.css";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import { EquipamentContextProvider } from "./context/EquipamentContext";

function App() {
  const elements = useRoutes(routes);
  return <EquipamentContextProvider>{elements}</EquipamentContextProvider>;
}

export default App;

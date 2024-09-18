import "./App.css";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const elements = useRoutes(routes);
  return <>{elements}</>;
}

export default App;

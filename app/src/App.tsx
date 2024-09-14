import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import equipamentsJson from "../../data/equipment.json";

function App() {
  const [equipaments, setEquipaments] = useState(equipamentsJson);

  return (
    <>
      {equipaments.map((equipament) => (
        <div key={equipament.id}>{equipament.name}</div>
      ))}
    </>
  );
}

export default App;

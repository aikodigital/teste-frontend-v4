import { useState } from "react";
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

import { useState } from "react";
import equipamentsJson from "../data/equipment.json";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

function App() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [equipaments, setEquipaments] = useState(equipamentsJson);

  console.log(API_KEY);

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
      {equipaments.map((equipament) => (
        <div key={equipament.id}>{equipament.name}</div>
      ))}
    </>
  );
}

export default App;

import React from "react";
import MapView from "./components/MapView";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4 w-screen">
      <header className="text-center text-2xl font-bold mb-4 text-slate-800 border-2 px-3 rounded-lg w-fit">
        FLORESTRACKER
      </header>
      <div className="flex justify-center items-center flex-col w-full">
        <MapView />
      </div>
    </div>
  );
};

export default App;

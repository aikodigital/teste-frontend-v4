"use client";

import React, { useState } from "react";
import DynamicToolMap from "../components/Map/DynamicMap";
import { getMarkerShape } from "../utils/marker.utils";

export default function Page() {
  const [isShowingHistory, setIsShowingHistory] = useState<boolean>(false);

  return (
    <div>
      <header style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
        <h2>Últimas posições dos equipamentos</h2>
        {isShowingHistory && (
          <button onClick={() => setIsShowingHistory(false)}>Reset</button>
        )}
      </header>
      <DynamicToolMap
        isShowingHistory={isShowingHistory}
        onMarkerClick={() => setIsShowingHistory(true)}
      />
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column"}}>
        <h4>Sumário dos modelos</h4>
        <div style={{display: "flex", alignItems: "center", gap: "2rem"}}>
          <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
            <p>Caminhão de carga</p>
            {getMarkerShape("#000", "Caminhão de carga", true)}
          </div>
          <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
            <p>Garra traçadora</p>
            {getMarkerShape("#000", "Garra traçadora", true)}
          </div>
          <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
            <p>Harvester</p>
            {getMarkerShape("#000", "Harvester", true)}
          </div>
        </div>
      </div>
    </div>
  );
}
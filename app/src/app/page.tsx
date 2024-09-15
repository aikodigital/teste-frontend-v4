"use client"

import React from "react";
import { Header, Map, Marker, RecenterAutomatically } from "@/components";
import { useHomeHooks } from "@/hooks/home";

export default function Home() {
  const { loading, data, centralPosition } = useHomeHooks()

  return (
    <div className="w-full h-full min-h-screen">
      <Header />
      <main className="w-full h-full">
        <Map>
          <>
            {centralPosition && (
              <RecenterAutomatically lat={centralPosition.lat} lng={centralPosition.lon} />
            )}
            {data.map(equipment => (
              <React.Fragment key={equipment.id}>
                {equipment.currentPosition?.lat && (
                  <Marker
                    lat={equipment.currentPosition?.lat}
                    lng={equipment.currentPosition?.lon}
                  />
                )}
              </React.Fragment>
            ))}
          </>
        </Map>
      </main>
    </div>
  );
}

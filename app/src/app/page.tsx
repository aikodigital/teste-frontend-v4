"use client"

import React from "react";
import {
  Header,
  Map,
  Marker,
  MarkerPopup,
  RecenterAutomatically,
  LoadingWrapper,
} from "@/components";
import { useHomeHooks } from "@/hooks/home";

export default function Home() {
  const { loading, data, centralPosition } = useHomeHooks()

  return (
    <div className="w-full h-full min-h-screen">
      <Header />
      <main className="w-full h-full">
        <LoadingWrapper isLoading={loading} className="!h-[calc(100vh-65px)]">
          <Map>
            <>
              {centralPosition && (
                <RecenterAutomatically lat={centralPosition.lat} lng={centralPosition.lon} />
              )}
              {data.map(equipment => (
                <React.Fragment key={equipment.id}>
                  {equipment.currentPosition?.lat && (
                    <Marker coords={{
                      lat: equipment.currentPosition?.lat,
                      lng: equipment.currentPosition?.lon,
                    }}>
                      <MarkerPopup
                        name={equipment.name}
                        stateName={equipment.currentState?.name}
                        stateColor={equipment.currentState?.color}
                      />
                    </Marker>
                  )}
                </React.Fragment>
              ))}
            </>
          </Map>
        </LoadingWrapper>
      </main>
    </div>
  );
}

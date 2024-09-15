"use client"

import React from "react";
import {
  Header,
  Map,
  Marker,
  MarkerPopup,
  RecenterAutomatically,
  LoadingWrapper,
  StateHistory,
} from "@/components";
import { useHomeHooks } from "@/hooks/home";

export default function Home() {
  const { loading, data, centralPosition, selectedEquipment, setSelectedEquipment } = useHomeHooks()

  return (
    <div className="w-full h-full min-h-screen">
      <Header />
      <LoadingWrapper isLoading={loading} className="!h-[calc(100vh-65px)]">
        <main className={`w-full h-full grid ${!!selectedEquipment ? 'grid-cols-[1fr_auto]' : ''}`}>
          <Map>
            <>
              {centralPosition && (
                <RecenterAutomatically lat={centralPosition.lat} lng={centralPosition.lon} />
              )}
              {data.map(equipment => (
                <React.Fragment key={equipment.id}>
                  {equipment.currentPosition?.lat && (
                    <Marker
                      coords={{
                        lat: equipment.currentPosition?.lat,
                        lng: equipment.currentPosition?.lon,
                      }}
                      handleClick={() => setSelectedEquipment(equipment)}
                    >
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
          {selectedEquipment && (
            <StateHistory data={selectedEquipment} handleClose={() => setSelectedEquipment(null)} />
          )}
        </main>
      </LoadingWrapper>
    </div>
  );
}

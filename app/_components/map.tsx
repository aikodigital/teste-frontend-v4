"use client";

import React, { useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import equipmentPosition from "../data/equipmentPositionHistory.json";
import equipment from "../data/equipment.json";
import equipmentModel from "../data/equipmentModel.json";
import statusEquipment from "../data/equipmentStateHistory.json";

import L from "leaflet";
import { formatDateTime } from "../_utils/time-format";
import EquipmentState from "./equipment-state";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

const Map = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedVehiclePosition, setSelectedVehiclePosition] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const mapRef = useRef(null);

  const vehicles = equipment.map((vehicle) => {
    const Model = equipmentModel.find(
      (model) => model.id === vehicle.equipmentModelId
    );

    const equipmentStatus = statusEquipment.filter(
      (status) => status.equipmentId === vehicle.id
    );

    const positionHistory = equipmentPosition
      .find((position) => position.equipmentId === vehicle.id)
      ?.positions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    const position = positionHistory?.[0];

    return {
      vehicle,
      Model,
      equipmentStatus,
      position,
      positionHistory,
    };
  });

  const mapIconTruck = new L.Icon({
    iconUrl: "/truck.png",
    iconSize: [40, 40],
  });

  const mapIconHarvester = new L.Icon({
    iconUrl: "/harvester.png",
    iconSize: [40, 40],
  });

  const mapIconTracer = new L.Icon({
    iconUrl: "/tracer.png",
    iconSize: [40, 40],
  });

  const handleSheetClose = () => {
    setModalOpen(false);
    setSelectedVehicle(null);
    setSelectedVehiclePosition(null);
  };

  const handleMarkerClick = (
    vehicleId: string,
    position: { lat: number; lon: number }
  ) => {
    setSelectedVehicle(vehicleId);
    setSelectedVehiclePosition(position);

    if (mapRef.current) {
      (mapRef.current as any).flyTo(position, 11, { duration: 1 });
    }

    setModalOpen(true);
  };

  return (
    <MapContainer
      zoomControl={false}
      zoomAnimation={true}
      ref={mapRef}
      style={{
        height: "100vh",
      }}
      center={[
        selectedVehiclePosition?.lat || vehicles[0].position?.lat || 0,
        selectedVehiclePosition?.lon || vehicles[0].position?.lon || 0,
      ]}
      zoom={selectedVehiclePosition ? 10 : 12}
      scrollWheelZoom={true}
      className="z-10"
    >
      <TileLayer
        attribution="ForeTrak"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles
        .filter(
          (vehicle) =>
            selectedVehicle === null || vehicle.vehicle.id === selectedVehicle
        )
        .map((vehicle) => (
          <Marker
            eventHandlers={{
              click: () =>
                handleMarkerClick(vehicle.vehicle.id, {
                  lat: vehicle.position?.lat || 0,
                  lon: vehicle.position?.lon || 0,
                }),
            }}
            key={vehicle.vehicle.id}
            position={[vehicle.position?.lat || 0, vehicle.position?.lon || 0]}
            zIndexOffset={1000}
            icon={
              vehicle.vehicle.equipmentModelId === equipmentModel[0].id
                ? mapIconTruck
                : vehicle.vehicle.equipmentModelId === equipmentModel[1].id
                ? mapIconHarvester
                : mapIconTracer
            }
            title={vehicle.vehicle.name}
          >
            <Tooltip>
              <div>
                <h3 className="text-base font-semibold">
                  {vehicle.vehicle.name}
                </h3>
                <span className="text-sm">
                  <EquipmentState
                    equipmentStateId={
                      vehicle.equipmentStatus[0]?.states[0]?.equipmentStateId
                    }
                  />
                </span>
              </div>
            </Tooltip>
            <Sheet open={modalOpen} onOpenChange={handleSheetClose}>
              <SheetContent
                className="z-50 lg:mx-[200px] rounded-lg"
                side={"bottom"}
              >
                <SheetHeader className="space-y-0">
                  <SheetTitle className="text-left text-xl font-bold">
                    {vehicle.vehicle.name}
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    {vehicle.Model?.name}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">
                    Histórico de Estados
                  </h3>
                  <div className="w-full overflow-x-auto">
                    <ul className="flex space-x-10 mt-5 py-5 relative">
                      {vehicle.equipmentStatus.map((status) =>
                        status.states
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime()
                          )
                          .map((state, index) => (
                            <li
                              className="relative flex flex-col items-center min-w-[150px] max-w-[150px]"
                              key={index}
                            >
                              <div className="bg-background w-full px-4 py-2 rounded-lg shadow-md mb-2">
                                <h4 className="text-xs font-semibold text-center">
                                  {formatDateTime(state.date)}
                                </h4>
                                <div className="text-sm text-center">
                                  <EquipmentState
                                    equipmentStateId={state.equipmentStateId}
                                  />
                                </div>
                              </div>
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              {index < status.states.length - 1 && (
                                <div className="absolute top-1/2 left-full h-px w-10 bg-gray-400 transform -translate-y-1/2"></div>
                              )}
                            </li>
                          ))
                      )}
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </Marker>
        ))}
      {selectedVehiclePosition && (
        <Polyline
          positions={
            vehicles
              .find((vehicle) => vehicle.vehicle.id === selectedVehicle)
              ?.positionHistory?.map((p) => [p.lat, p.lon]) || []
          }
          pathOptions={{ color: "#00BE9C", weight: 4 }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";

import equipment from "../data/equipment.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentModel from "../data/equipmentModel.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import moment from "moment";

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface EquipmentPositionHistory {
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentModel {
  id: string;
  name: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

interface ProcessedLocation {
  position: LatLng;
  nameEquipamento: string;
  stateName: string;
  stateColor: string;
  stateHistory: { date: string; stateName: string }[];
}

export const MapsShop: React.FC = () => {
  const [locations, setLocations] = useState<ProcessedLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processPositions = () => {
      try {
        const inforData: Equipment[] = equipment;
        const positionData: EquipmentPositionHistory[] =
          equipmentPositionHistory;
        const stateData: EquipmentState[] = equipmentState;
        const stateHistoryData: EquipmentStateHistory[] = equipmentStateHistory;

        const processedLocations = positionData
          .map((item) => {
            const lastPosition = item.positions[item.positions.length - 1];

            if (!lastPosition) return null;

            const equipment = inforData.find(
              (equip) => equip.id === item.equipmentId
            );

            const lastStateHistory = stateHistoryData.find(
              (history) => history.equipmentId === item.equipmentId
            );
            const lastState = lastStateHistory?.states.slice(-1)[0];
            const state = stateData.find(
              (st) => st.id === lastState?.equipmentStateId
            );

            const stateName = state?.name || "Desconhecido";
            const stateColor = state?.color || "#FFFFFF";

            const stateHistory =
              lastStateHistory?.states.map((stateEntry) => {
                const state = stateData.find(
                  (st) => st.id === stateEntry.equipmentStateId
                );
                return {
                  date: stateEntry.date,
                  stateName: state?.name || "Desconhecido",
                };
              }) || [];

            return {
              position: new LatLng(lastPosition.lat, lastPosition.lon),
              nameEquipamento: equipment
                ? equipment.name
                : `Equipamento ${item.equipmentId}`,
              stateName,
              stateColor,
              stateHistory,
            };
          })
          .filter((item): item is NonNullable<typeof item> => item !== null);

        setLocations(processedLocations);
      } catch (error) {
        setError("Erro ao processar dados");
        console.error("Erro ao processar dados", error);
      } finally {
        setLoading(false);
      }
    };

    processPositions();
  }, []);

  const center = new LatLng(-6.1684677, -38.4928379);

  const createIcon = (color: string): Icon => {
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="#000" stroke-width="1"/>
      </svg>
    `;
    return L.icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="tw-w-full bg-operacao-background tw-p-1 md:tw-p-10">
      <div className="tw-bg-white tw-p-10 tw-rounded-md tw-shadow-md">
        <div className="tw-h-[700px] md:tw-h-[700px]">
          <div className="tw-w-full tw-flex tw-mb-3 tw-items-center tw-justify-between">
            <p className="tw-font-semibold tw-text-2xl tw-text-operacao-gray-color-100">
              Mapa de operações
            </p>
          </div>
          <MapContainer
            center={center}
            zoom={5}
            style={{ height: "90%", zIndex: 1 }}
          >
            <TileLayer
              url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=uN2Fj9CIq4JpHiDQyAYE"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />

            {locations.map((location, index) => (
              <Marker
                key={index}
                position={location.position}
                icon={createIcon(location.stateColor)}
              >
                <Popup>
                  <div className="tw-w-80 tw-max-h-80 tw-overflow-auto tw-p-2 tw-bg-white tw-rounded-lg ">
                    <span className="tw-font-semibold tw-text-lg tw-text-operacao-gray-color-100">
                      {location.nameEquipamento}
                    </span>
                    <span>Estado Atual: {location.stateName}</span>
                    <details className="tw-mt-2">
                      <summary>Histórico de Estados</summary>
                      <ul className="tw-mt-2 tw-list-disc tw-pl-4 tw-max-h-40 tw-overflow-y-auto tw-text-sm">
                        {location.stateHistory.map((entry, idx) => (
                          <li key={idx}>
                            {moment(entry.date).format('DD/MM/YYYY, h:mm:ss a')}: {entry.stateName}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

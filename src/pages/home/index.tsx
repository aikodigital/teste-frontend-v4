import { useEffect, useState } from "react";
import { House, Search } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import equipmentPositionHistoryData from "../../data/equipmentPositionHistory.json";
import equipmentStateData from "../../data/equipmentState.json";
import equipmentStateHistoryData from "../../data/equipmentStateHistory.json";

import AikoLogo from "../../img/aiko-logo.png";

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface State {
  id: string;
  name: string;
  color: string;
}

interface Equipment {
  equipmentId: string;
  positions: Position[];
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

interface ActiveEquipment {
  equipmentId: string;
  lastPosition: Position;
  currentState?: State;
}

export function HomePage() {
  const [activeEquipment, setActiveEquipment] = useState<ActiveEquipment[]>([]);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  function getAllEquipmentsLastPosition(
    equipments: Equipment[],
    stateHistory: EquipmentStateHistory[],
    stateData: State[]
  ) {
    const lastEquipments = equipments.map((equipment) => {
      const positions = equipment.positions[equipment.positions.length - 1];
      const states = stateHistory.find(
        (equipmentState) => equipmentState.equipmentId === equipment.equipmentId
      );
      const state = states?.states[states.states.length - 1];

      const cState = stateData.find((s) => s.id === state?.equipmentStateId);

      return {
        equipmentId: equipment.equipmentId,
        lastPosition: positions,
        currentState: cState,
      };
    });
    setActiveEquipment(lastEquipments);

    const latitudes = lastEquipments.map((e) => e.lastPosition.lat);
    const longitudes = lastEquipments.map((e) => e.lastPosition.lon);

    if (latitudes.length === 0 || longitudes.length === 0) {
      return;
    }

    const avgLat =
      latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
    const avgLng =
      longitudes.reduce((acc, lng) => acc + lng, 0) / longitudes.length;

    setMapCenter({ lat: avgLat, lng: avgLng });
  }

  useEffect(() => {
    getAllEquipmentsLastPosition(
      equipmentPositionHistoryData,
      equipmentStateHistoryData,
      equipmentStateData
    );
  }, []);

  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-[250x] p-6 bg-stone-950 rounded-3xl flex flex-col">
        <div className="w-full flex justify-center mb-6">
          <img className="w-2/4" src={AikoLogo} alt="Aiko logo" />
        </div>
        <div className="w-full h-px mb-6 bg-stone-300" />
        <ul className="w-full list-none flex flex-col">
          <li className="w-full h-10 px-4 gap-4 flex flex-row items-center rounded-2xl hover:bg-stone-800 active:bg-stone-800 cursor-pointer">
            <span>
              <House className="text-zinc-100 size-4" />
            </span>
            <p className="text-sm font-medium text-zinc-100">Dashboard</p>
          </li>
        </ul>
      </div>

      <div className="w-full flex flex-roe gap-8">
        {/* 
        Barra de pesquisar
        <form action="">
          <div className="relative flex items-center">
            <Search className="absolute ml-4 text-zinc-100 size-4 pointer-events-none" />
            <input
              className="w-[200px] h-10 pr-4 pl-10 rounded-2xl bg-stone-800 placeholder:text-zinc-100 placeholder:text-sm placeholder:font-medium"
              type="text"
              name="search"
              placeholder="Pesquisar"
              autoComplete="off"
            />
          </div>
        </form> */}
        <div className="w-2/4 p-6 bg-stone-950 rounded-3xl flex flex-col gap-10">
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-md font-medium text-zinc-100">
              Posição recente
            </h1>
            <p className="text-xs font-medium text-zinc-300">
              Onde os equipamentos estiveram pela última atualização
            </p>
          </div>
          {mapCenter && (
            <MapContainer
              className="w-full h-[50vh]"
              center={mapCenter}
              zoom={10}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {activeEquipment.map((equipment) => {
                return equipment ? (
                  <Marker
                    key={equipment.equipmentId}
                    position={{
                      lat: equipment.lastPosition.lat,
                      lng: equipment.lastPosition.lon,
                    }}
                  >
                    <Popup>
                      <p>
                        {format(
                          equipment.lastPosition.date,
                          "d' de 'LLLL' de 'y",
                          {
                            locale: ptBR,
                          }
                        )}
                      </p>
                      <p
                        className="text-sm text-center"
                        style={{
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: equipment.currentState?.color,
                          color: "#FFF",
                        }}
                      >
                        {equipment.currentState?.name}
                      </p>
                    </Popup>
                  </Marker>
                ) : null;
              })}
            </MapContainer>
          )}
        </div>

        <div className="w-1/3 p-6 bg-stone-950 rounded-3xl flex flex-col gap-10">
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-md font-medium text-zinc-100">
              Histórico do equipamento {}
            </h1>
            <p className="text-xs font-medium text-zinc-300">
              Estado do equipamento
            </p>
            {}
          </div>
        </div>
      </div>
    </div>
  );
}

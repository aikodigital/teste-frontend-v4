import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { type Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import moment from "moment";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import modelsData from "../data/equipmentModels.json"; // Importando os dados de modelos
import { PropagateLoader } from "react-spinners";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type {
  Equipment,
  EquipmentState,
  EquipmentModel,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from "@/types";

// Tipos e interfaces
interface ProcessedLocation {
  position: LatLng;
  nameEquipamento: string;
  stateName: string;
  stateColor: string;
  stateHistory: { date: string; stateName: string }[];
}

const MAP_CENTER = new LatLng(-19.09392, -46.15333);
const TILE_LAYER_URL =
  "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=uN2Fj9CIq4JpHiDQyAYE";
const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>';

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
const processPositions = (
  positionData: EquipmentPositionHistory[],
  stateData: EquipmentState[],
  stateHistoryData: EquipmentStateHistory[],
  _modelsData: EquipmentModel[],
  equipmentData: Equipment[]
): ProcessedLocation[] => {
  return positionData
    .map((item) => {
      const lastPosition = item.positions[item.positions.length - 1];
      if (!lastPosition) return null;

      const equipment = equipmentData.find(
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
        nameEquipamento: equipment?.name || "Desconhecido",
        stateName,
        stateColor,
        stateHistory,
      };
    })
    .filter(Boolean) as ProcessedLocation[];
};

type FiltersProps = {
  onStateChange: (state: string) => void;
  onModelChange: (model: string) => void;
};

const Filters = ({ onStateChange, onModelChange }: FiltersProps) => (
  <div className="flex-1 gap-4 mb-8">
    <Select onValueChange={onStateChange}>
      <SelectTrigger className="p-2 border rounded">
        <SelectValue placeholder="Todos os Estados" />
      </SelectTrigger>
      <SelectContent className="bg-slate-600">
        <SelectItem value="all">Todos os Estados</SelectItem>
        <SelectItem value="operando">Operando</SelectItem>
        <SelectItem value="manutencao">Manutenção</SelectItem>
      </SelectContent>
    </Select>

    <Select onValueChange={onModelChange}>
      <SelectTrigger className="p-2 border rounded">
        <SelectValue placeholder="Todos os Modelos" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos os Modelos</SelectItem>
        {modelsData.map((model: EquipmentModel) => (
          <SelectItem key={model.id} value={model.id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

type SearchBarProps = {
  onSearch: (term: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => (
  <input
    type="text"
    placeholder="Pesquisar equipamento"
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border rounded mb-4"
  />
);

const MapView = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mapData, setMapData] = useState<ProcessedLocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const positions =
          equipmentPositionHistory as EquipmentPositionHistory[];
        const stateData = equipmentState as EquipmentState[];
        const stateHistory = equipmentStateHistory as EquipmentStateHistory[];
        const models = modelsData as EquipmentModel[];
        const equipment = [] as Equipment[];

        const processedData = processPositions(
          positions,
          stateData,
          stateHistory,
          models,
          equipment
        );

        setMapData(processedData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleStateChange = (state: string) => setStateFilter(state);
  const handleModelChange = (model: string) => setModelFilter(model);

  const filteredData = useMemo(() => {
    return mapData.filter((item) => {
      const matchesSearchTerm = item.nameEquipamento
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStateFilter =
        stateFilter === "all" || item.stateName === stateFilter;
      const matchesModelFilter =
        modelFilter === "all" || item.nameEquipamento.includes(modelFilter);

      return matchesSearchTerm && matchesStateFilter && matchesModelFilter;
    });
  }, [mapData, searchTerm, stateFilter, modelFilter]);

  return (
    <div>
      <Filters
        onStateChange={handleStateChange}
        onModelChange={handleModelChange}
      />
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center items-center h-full">
          <PropagateLoader color="#000" />
        </div>
      )}

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <MapContainer
        center={MAP_CENTER}
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url={TILE_LAYER_URL} attribution={TILE_LAYER_ATTRIBUTION} />
        {filteredData.map((item, index) => (
          <Marker
            key={index}
            position={item.position}
            icon={createIcon(item.stateColor)}
          >
            <Popup>
              <div>
                <h3>{item.nameEquipamento}</h3>
                <p>Estado: {item.stateName}</p>
                <div>
                  {item.stateHistory.map((entry, idx) => (
                    <div key={idx}>
                      <span>{moment(entry.date).format("DD/MM/YYYY")}: </span>
                      <span>{entry.stateName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

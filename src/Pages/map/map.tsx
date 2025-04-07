import "leaflet/dist/leaflet.css";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import Logo from "../../../img/aiko.png";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { getEquipmentIcon } from "../../icons/icons";
import {
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory,
} from "./interface/Imap";

const AdjustMapPosition = ({
  positions,
}: {
  positions: [number, number][];
}) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions);
    }
  }, [positions, map]);

  return null;
};

const calculateEquipmentProductivityPercentage = (
  equipmentId: string,
  equipmentStateHistoryRecords: IEquipmentStateHistory[],
  availableEquipmentStatuses: IEquipmentState[],
): number => {
  const operatingStatus = availableEquipmentStatuses.find(
    (status) => status.name.toLowerCase() === "operando",
  );

  if (!operatingStatus) {
    return 0;
  }

  const equipmentHistoricalStates =
    equipmentStateHistoryRecords
      .find((history) => history.equipmentId === equipmentId)
      ?.states?.sort(
        (firstState, secondState) =>
          new Date(firstState.date).getTime() -
          new Date(secondState.date).getTime(),
      ) || [];

  if (equipmentHistoricalStates.length < 2) {
    return 0;
  }

  let accumulatedTotalTimeMilliseconds = 0;
  let accumulatedOperatingTimeMilliseconds = 0;

  for (
    let stateIndex = 1;
    stateIndex < equipmentHistoricalStates.length;
    stateIndex++
  ) {
    const previousState = equipmentHistoricalStates[stateIndex - 1];
    const currentState = equipmentHistoricalStates[stateIndex];

    const timeBetweenStatesMilliseconds =
      new Date(currentState.date).getTime() -
      new Date(previousState.date).getTime();

    accumulatedTotalTimeMilliseconds += timeBetweenStatesMilliseconds;

    if (previousState.equipmentStateId === operatingStatus.id) {
      accumulatedOperatingTimeMilliseconds += timeBetweenStatesMilliseconds;
    }
  }

  const totalTimeHours = accumulatedTotalTimeMilliseconds / (1000 * 60 * 60);
  const operatingTimeHours =
    accumulatedOperatingTimeMilliseconds / (1000 * 60 * 60);

  const productivityPercentage =
    totalTimeHours > 0
      ? Math.min(100, (operatingTimeHours / totalTimeHours) * 100)
      : 0;

  console.log(`Productivity Calculation for ${equipmentId}: 
    Operating Hours: ${operatingTimeHours.toFixed(2)}h | 
    Total Tracked Hours: ${totalTimeHours.toFixed(2)}h | 
    Productivity: ${Math.round(productivityPercentage)}%`);

  return Math.round(productivityPercentage);
};

const Map = () => {
  const [mapPosition, setMapPosition] = useState<IEquipmentPositionHistory[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stateHistory, setStateHistory] = useState<IEquipmentStateHistory[]>(
    [],
  );
  const [equipmentStatus, setEquipmentStatus] = useState<IEquipmentState[]>([]);
  const [equipmentList, setEquipmentList] = useState<IEquipment[]>([]);
  const [equipmentModels, setEquipmentModel] = useState<IEquipmentModel[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          positionsRes,
          statesHistoryRes,
          statesRes,
          equipmentRes,
          equipmentModelRes,
        ] = await Promise.all([
          axios.get<IEquipmentPositionHistory[]>(
            "/data/equipmentPositionHistory.json",
          ),
          axios.get<IEquipmentStateHistory[]>(
            "/data/equipmentStateHistory.json",
          ),
          axios.get<IEquipmentState[]>("/data/equipmentState.json"),
          axios.get<IEquipment[]>("/data/equipment.json"),
          axios.get<IEquipmentModel[]>("data/equipmentModel.json"),
        ]);

        setMapPosition(positionsRes.data);
        setStateHistory(statesHistoryRes.data);
        setEquipmentStatus(statesRes.data);
        setEquipmentModel(equipmentModelRes.data);
        setEquipmentList(equipmentRes.data);
      } catch (err) {
        setError("Erro ao carregar dados dos equipamentos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Progress value={33} />;
  if (error) return <p>{error}</p>;

  const latestPositionsWithStatus = mapPosition.map((equipment) => {
    const positionsSortedByDate = [...equipment.positions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const latestPosition = positionsSortedByDate[0];

    const equipmentStateHistory =
      stateHistory.find((item) => item.equipmentId === equipment.equipmentId)
        ?.states || [];

    const latestValidState = equipmentStateHistory
      .filter((item) => new Date(item.date) <= new Date(latestPosition.date))
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0];

    const statusInfo = equipmentStatus.find(
      (item) => item.id === latestValidState?.equipmentStateId,
    );

    const equipmentInfo = equipmentList.find(
      (item) => item.id === equipment.equipmentId,
    );

    const modelInfo = equipmentModels.find(
      (item) => item.id === equipmentInfo?.equipmentModelId,
    );

    return {
      equipmentId: equipment.equipmentId,
      lat: latestPosition.lat,
      lon: latestPosition.lon,
      date: latestPosition.date,
      stateName: statusInfo?.name ?? "Desconhecido",
      stateColor: statusInfo?.color ?? "#ccc",
      equipmentName: equipmentInfo?.name ?? "Sem nome",
      modelName: modelInfo?.name ?? "Sem modelo",
      equipmentModelId: equipmentInfo?.equipmentModelId ?? "desconhecido",
      productivity: calculateEquipmentProductivityPercentage(
        equipment.equipmentId,
        stateHistory,
        equipmentStatus,
      ),
    };
  });

  const filteredEquipments = latestPositionsWithStatus.filter((item) => {
    const matchesStatus =
      filterStatus === "todos" || item.stateName === filterStatus;
    const matchesName = item.equipmentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesName;
  });

  const coordinates: [number, number][] = filteredEquipments.map((position) => [
    position.lat,
    position.lon,
  ]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={Logo} alt="Logo" width={200} height={200} />
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
        Equipamentos Localizados
      </h1>
      <div className="mt-3 flex h-[80vh] w-full max-w-[1200px] flex-row gap-6">
        <div className="flex w-[250px] flex-col gap-4 rounded-xl bg-white p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            Filtros ({filteredEquipments.length})
          </h2>
          <Label>Nome do equipamento</Label>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite..."
          />
          <Label>Status</Label>
          <Select
            onValueChange={(value) => setFilterStatus(value)}
            defaultValue="todos"
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="todos">Todos os status</SelectItem>
              {equipmentStatus.map((state) => (
                <SelectItem
                  key={state.id}
                  value={state.name}
                  className="hover:bg-gray-100"
                >
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold">Legenda</h3>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#ff0707]"></div>
              <span className="text-sm">Caminhão</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#00ff5e]"></div>
              <span className="text-sm">Harvester</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#000a9c]"></div>
              <span className="text-sm">Garra traçadora</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <MapContainer
            className="z-0 h-full w-full rounded-xl shadow-md"
            center={[0, 0]}
            zoom={10}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AdjustMapPosition positions={coordinates} />

            {filteredEquipments.map((item) => (
              <Marker
                key={item.equipmentId}
                position={[item.lat, item.lon]}
                icon={getEquipmentIcon(item.equipmentModelId)}
              >
                <Popup minWidth={250}>
                  <div className="max-h-60 overflow-y-auto text-sm">
                    <h3 className="mb-2 pb-1 text-sm font-semibold">
                      Histórico de status
                    </h3>

                    {mapPosition
                      .find(
                        (posData) => posData.equipmentId === item.equipmentId,
                      )
                      ?.positions.sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime(),
                      )
                      .map((pos, index) => {
                        const equipmentStateHistory =
                          stateHistory.find(
                            (s) => s.equipmentId === item.equipmentId,
                          )?.states || [];

                        const latestValidState = equipmentStateHistory
                          .filter((s) => new Date(s.date) <= new Date(pos.date))
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime(),
                          )[0];

                        const stateDetails = equipmentStatus.find(
                          (s) => s.id === latestValidState?.equipmentStateId,
                        );

                        return (
                          <div key={index} className="mb-3 border-b pb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">📅</span>
                              {new Date(pos.date).toLocaleString()}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">📍</span>
                              <div className="flex flex-col">
                                <strong className="font-semibold">
                                  Lat:{" "}
                                  <span className="font-normal">{pos.lat}</span>
                                </strong>
                                <strong className="font-semibold">
                                  Long:{" "}
                                  <span className="font-normal">{pos.lon}</span>
                                </strong>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  stateDetails?.name === "Operando"
                                    ? "bg-green-100 text-green-800"
                                    : stateDetails?.name === "Parado"
                                      ? "bg-red-100 text-red-800"
                                      : stateDetails?.name === "Manutenção"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {stateDetails?.name === "Parado" ? "⛔" : ""}
                                {stateDetails?.name === "Manutenção"
                                  ? "🛠️"
                                  : ""}
                                {stateDetails?.name === "Operando" ? "✅" : ""}
                                {stateDetails?.name !== "Parado" &&
                                stateDetails?.name !== "Manutenção" &&
                                stateDetails?.name !== "Operando"
                                  ? "❓"
                                  : ""}
                                <span>
                                  {stateDetails?.name ?? "Desconhecido"}
                                </span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Popup>
                <Tooltip
                  direction="top"
                  offset={[0, -20]}
                  opacity={1}
                  permanent={false}
                >
                  <div className="rounded bg-white p-2 text-sm shadow">
                    <strong>Equipamento: </strong>
                    {item.equipmentName}
                    <br />
                    <strong>Modelo:</strong> {item.modelName}
                    <br />
                    <strong>Estado:</strong>&nbsp;
                    <span
                      style={{ color: item.stateColor, fontWeight: "bold" }}
                    >
                      {item.stateName}
                    </span>
                    <br />
                    <strong>Produtividade:</strong> {item.productivity}%<br />
                    <strong>Ultima atualização:</strong>{" "}
                    {new Date(item.date).toLocaleString()}
                    <br />
                    <strong>Latitude:</strong> {item.lat}
                    <br />
                    <strong>Longitude:</strong> {item.lon}
                    <br />
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;

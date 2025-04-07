import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import equipmentData from '../data/equipment.json';
import positionData from '../data/equipmentPositionHistory.json';
import stateData from '../data/equipmentState.json';
import stateHistoryData from '../data/equipmentStateHistory.json';
import modelData from '../data/equipmentModel.json';
import EquipmentHistoryPanel from './EquipmentHistoryPanel';

const iconColors = ['#1f77b4', '#ff7f0e', '#2ca02c'];

const generateIcon = (color) =>
  new L.DivIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
    "></div>`,
  });

const MapView = () => {
  const [equipmentWithLocation, setEquipmentWithLocation] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [modelIcons, setModelIcons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('all');
  const [selectedModelId, setSelectedModelId] = useState('all');

  const mapRef = useRef(null);

  const handleSearchSelect = (equip) => {
    setSelectedEquipmentId(equip.id);
    setSearchTerm('');

    const map = mapRef.current;
    if (map) {
      map.setView([equip.position.lat, equip.position.lon], 16);
    }
  };

  useEffect(() => {
    const icons = {};
    modelData.forEach((model, index) => {
      const color = iconColors[index % iconColors.length];
      icons[model.id] = generateIcon(color);
    });
    setModelIcons(icons);

    const getLatestData = () => {
      const enrichedData = equipmentData.map((equip) => {
        const position = positionData.find((p) => p.equipmentId === equip.id);
        const stateHist = stateHistoryData.find((s) => s.equipmentId === equip.id);
        const latestPos = position?.positions?.at(-1);

        const sortedStates = stateHist?.states
          ?.slice()
          ?.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestStateId = sortedStates?.[0]?.equipmentStateId;
        const stateInfo = stateData.find((s) => s.id === latestStateId);

        const productivity = calculateProductivity(stateHist);
        const earnings = calculateDailyEarnings(stateHist, equip.equipmentModelId);

        return {
          ...equip,
          position: latestPos,
          state: stateInfo,
          productivity,
          earnings,
        };
      });

      setEquipmentWithLocation(enrichedData.filter((e) => e.position));
    };

    getLatestData();
  }, []);

  const filteredEquipments = equipmentWithLocation.filter((equip) => {
    const matchName = searchTerm
      ? equip.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchState = selectedStateId === 'all' || equip.state?.id === selectedStateId;
    const matchModel =
      selectedModelId === 'all' || equip.equipmentModelId === selectedModelId;

    return matchName && matchState && matchModel;
  });

  const calculateProductivity = (stateHistory) => {
    if (!stateHistory || !stateHistory.states || stateHistory.states.length === 0) {
      return 0;
    }

    const states = [...stateHistory.states].sort((a, b) => new Date(a.date) - new Date(b.date));
    const operatingId = '0808344c-454b-4c36-89e8-d7687e692d57';

    const lastDate = new Date(states.at(-1).date);
    const targetDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

    let totalOperatingMs = 0;

    for (let i = 0; i < states.length - 1; i++) {
      const current = states[i];
      const next = states[i + 1];

      const currentDate = new Date(current.date);
      const nextDate = new Date(next.date);

      if (
        currentDate >= targetDate &&
        currentDate < new Date(targetDate.getTime() + 24 * 60 * 60 * 1000)
      ) {
        if (current.equipmentStateId === operatingId) {
          const endTime = nextDate < new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) ? nextDate : new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);
          totalOperatingMs += endTime - currentDate;
        }
      }
    }
    const hoursOperating = totalOperatingMs / (1000 * 60 * 60);
    console.log('Total Operating Time:', hoursOperating);
    return Math.round((hoursOperating / 24) * 100);
  };

  const calculateDailyEarnings = (stateHistory, equipmentModelId) => {
    if (!stateHistory || !stateHistory.states || stateHistory.states.length === 0) {
      return 0;
    }

    const model = modelData.find((m) => m.id === equipmentModelId);
    if (!model || !model.hourlyEarnings) return 0;

    const earningsMap = Object.fromEntries(
      model.hourlyEarnings.map((entry) => [entry.equipmentStateId, entry.value])
    );

    const states = [...stateHistory.states].sort((a, b) => new Date(a.date) - new Date(b.date));

    const lastDate = new Date(states.at(-1).date);
    const targetDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

    let totalEarnings = 0;

    for (let i = 0; i < states.length - 1; i++) {
      const current = states[i];
      const next = states[i + 1];

      const currentDate = new Date(current.date);
      const nextDate = new Date(next.date);

      if (
        currentDate >= targetDate &&
        currentDate < new Date(targetDate.getTime() + 24 * 60 * 60 * 1000)
      ) {
        const endTime = nextDate < new Date(targetDate.getTime() + 24 * 60 * 60 * 1000)
          ? nextDate
          : new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);

        const durationHours = (endTime - currentDate) / (1000 * 60 * 60);
        const value = earningsMap[current.equipmentStateId] || 0;

        totalEarnings += durationHours * value;
      }
    }

    return totalEarnings.toFixed(2);
  };

  return (
    <>
      <MapContainer
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        center={[-19.126536, -45.947756]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredEquipments.map((equip) => (
          <Marker
            key={equip.id}
            position={[equip.position.lat, equip.position.lon]}
            icon={modelIcons[equip.equipmentModelId]}
            eventHandlers={{
              click: () => setSelectedEquipmentId(equip.id),
            }}
          >
            <Popup>
              <strong>{equip.name}</strong>
              <br />
              Estado atual: <strong>{equip.state?.name || 'Desconhecido'}</strong>
              <br />
              Produtividade (último dia): <strong>{equip.productivity}%</strong>
              <br />
              Ganho (último dia): <strong>R$ {equip.earnings}</strong>
              <br />
              Última posição: <br />
              {new Date(equip.position.date).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 z-[9999] w-64 space-y-2 ml-9">
        <input
          type="text"
          placeholder="Buscar equipamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md shadow-md border border-gray-300 text-sm"
        />
        {searchTerm && (
          <ul className="bg-white shadow-lg rounded-md max-h-40 overflow-y-auto text-sm">
            {filteredEquipments.map((equip) => (
              <li
                key={equip.id}
                onClick={() => handleSearchSelect(equip)}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                {equip.name}
              </li>
            ))}
          </ul>
        )}

        <select
          value={selectedStateId}
          onChange={(e) => setSelectedStateId(e.target.value)}
          className="w-full p-2 rounded-md shadow-md border border-gray-300 text-sm"
        >
          <option value="all">Todos os estados</option>
          {stateData.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <select
          value={selectedModelId}
          onChange={(e) => setSelectedModelId(e.target.value)}
          className="w-full p-2 rounded-md shadow-md border border-gray-300 text-sm"
        >
          <option value="all">Todos os modelos</option>
          {modelData.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-lg p-3 z-[9999]">
        <h3 className="text-sm font-bold mb-2">Legenda</h3>
        <ul className="space-y-1 text-sm">
          {modelData.map((model, index) => (
            <li key={model.id} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: iconColors[index % iconColors.length] }}
              ></span>
              {model.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedEquipmentId && (
        <EquipmentHistoryPanel
          equipmentId={selectedEquipmentId}
          equipmentName={
            equipmentWithLocation.find((e) => e.id === selectedEquipmentId)?.name
          }
          onClose={() => setSelectedEquipmentId(null)}
        />
      )}
    </>
  );
};

export default MapView;
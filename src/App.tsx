import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


//cores a cada modelo de equipamento
const getColorByModel = (modelId: string) => {
  const modelColors: Record<string, string> = {
    'a3540227-2f0e-4362-9517-92f41dabbfdf': '#00509f',
    'a4b0c114-acd8-4151-9449-7d12ab9bf40f': '#2fa90a',
    '9c3d009e-0d42-4a6e-9036-193e9bca3199': '#c94300',

  };

  return modelColors[modelId] || '#888';
};

const getColoredIcon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });


const calculateProductivity = (stateHistory: EquipmentStateHistory, operatingStateId: string): number => {
  if (!stateHistory || !stateHistory.states.length) return 0;

  // Ordena por data crescente
  const sortedStates = [...stateHistory.states].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let totalOperatingTimeMs = 0;
  const now = new Date();

  for (let i = 0; i < sortedStates.length; i++) {
    const current = sortedStates[i];
    const next = sortedStates[i + 1] || { date: now.toISOString() };

    const currentDate = new Date(current.date);
    const nextDate = new Date(next.date);

    const diff = nextDate.getTime() - currentDate.getTime();

    if (current.equipmentStateId === operatingStateId) {
      totalOperatingTimeMs += diff;
    }
  }

  const totalHours = totalOperatingTimeMs / (1000 * 60 * 60);
  const productivity = (totalHours / 24) * 100;

  return Math.min(100, Math.round(productivity));
};






const calculateGain = (
  stateHistory: EquipmentStateHistory,
  model: EquipmentModel
): number => {
  if (!stateHistory || !stateHistory.states.length || !model.hourlyEarnings) return 0;

  const sortedStates = [...stateHistory.states].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const now = new Date();
  let totalGain = 0;

  for (let i = 0; i < sortedStates.length; i++) {
    const current = sortedStates[i];
    const next = sortedStates[i + 1] || { date: now.toISOString() };

    const currentDate = new Date(current.date);
    const nextDate = new Date(next.date);

    const durationHours = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);

    // Busca o valor do ganho por hora de acordo com o estado
    const earning = model.hourlyEarnings.find(e => e.equipmentStateId === current.equipmentStateId);

    if (earning) {
      totalGain += earning.value * durationHours;
    }
  }

  return Math.round(totalGain);
};




L.Marker.prototype.options.icon = DefaultIcon;

// TIPOS
type Equipment = {
  id: string;
  name: string;
  equipmentModelId: string;
};

type Position = {
  date: string;
  lat: number;
  lon: number;
};

type EquipmentPositionHistory = {
  equipmentId: string;
  positions: Position[];
};

type EquipmentState = {
  id: string;
  name: string;
  color: string;
};

type EquipmentStateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

type EquipmentModel = {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
};





function App() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [positions, setPositions] = useState<EquipmentPositionHistory[]>([]);
  const [stateHistory, setStateHistory] = useState<EquipmentStateHistory[]>([]);
  const [states, setStates] = useState<EquipmentState[]>([]);
  const [models, setModels] = useState<EquipmentModel[]>([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRoutes, setShowRoutes] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const eq = await fetch('/data/equipment.json').then(res => res.json());
      const pos = await fetch('/data/equipmentPositionHistory.json').then(res => res.json());
      const stateHist = await fetch('/data/equipmentStateHistory.json').then(res => res.json());
      const statesData = await fetch('/data/equipmentState.json').then(res => res.json());
      const modelsData = await fetch('/data/equipmentModel.json').then(res => res.json());



      setModels(modelsData);
      setEquipment(eq);
      setPositions(pos);
      setStateHistory(stateHist);
      setStates(statesData);
    };

    fetchData();
  }, []);

  // Pegando o estado "Operando"
  const operatingState = states.find(s => s.name.toLowerCase() === 'operando');
  const operatingStateId = operatingState?.id || '';


  // P/os filtros
  const handleClearFilters = () => {
    setSelectedStateId('');
    setSelectedModelId('');
    setSearchTerm('');
  };


  return (


    <div className='d-flex flex-column w-100 min-vh-100 '>
      <header className="bg-light p-3 border-bottom">
        <div className="container">
          <div className="d-flex align-items-center mb-4">
            <img src="/img/aiko.png" alt="Logo Aiko" className='imgLogo' />
            <h1 className="ms-3 h5 mb-0 fw-semibold fs-2">Monitoramento de Equipamentos</h1>
          </div>

          <div className="mb-2">
            <label className="form-label mb-2">Pesquisar equipamento por nome:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite o nome do equipamento"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtro */}
          <div className="row g-2">
            <div className="col-md-6">
              <label className="form-label mb-2">Filtrar por estado</label>
              <select
                className="form-select"
                value={selectedStateId}
                onChange={e => setSelectedStateId(e.target.value)}
              >
                <option value="">Todos os estados</option>
                {states.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label mb-2">Filtrar por modelo</label>
              <select
                className="form-select"
                value={selectedModelId}
                onChange={e => setSelectedModelId(e.target.value)}
              >
                <option value="">Todos os modelos</option>
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button
                className="btn btn-secondary mt-2 w-auto px-4"
                onClick={handleClearFilters}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="toggleRoutes"
              checked={showRoutes}
              onChange={() => setShowRoutes(prev => !prev)}
            />
            <label className="form-check-label" htmlFor="toggleRoutes">
              Mostrar trajetos dos equipamentos
            </label>
          </div>
        </div>
      </header>


      <div className="app-container">
        <MapContainer center={[-19.126536, -45.947756]} zoom={13} className="leaflet-container" style={{ height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {positions
            .filter(item => {
              const equip = equipment.find(eq => eq.id === item.equipmentId);
              const history = stateHistory.find(s => s.equipmentId === item.equipmentId);
              const lastStateId = history?.states[history.states.length - 1]?.equipmentStateId;

              const matchState = !selectedStateId || lastStateId === selectedStateId;
              const matchModel = !selectedModelId || equip?.equipmentModelId === selectedModelId;
              const matchSearch = !searchTerm || equip?.name.toLowerCase().includes(searchTerm.toLowerCase());



              return matchState && matchModel && matchSearch;
            })
            .map(item => {
              const latest = item.positions[item.positions.length - 1];

              const equip = equipment.find(eq => eq.id === item.equipmentId);
              if (!latest || !equip) return null;

              const modelColor = getColorByModel(equip.equipmentModelId);
              const markerIcon = getColoredIcon(modelColor);

              const history = stateHistory.find(s => s.equipmentId === item.equipmentId);
              const lastState = history?.states[history.states.length - 1];
              const stateInfo = states.find(s => s.id === lastState?.equipmentStateId);

              const productivity = history ? calculateProductivity(history, operatingStateId) : null;


              const model = models.find(m => m.id === equip.equipmentModelId);
              const stateMap = states.reduce((acc, curr) => {
                acc[curr.id] = curr.name;
                return acc;
              }, {} as Record<string, string>);
              const gain = model && history ? calculateGain(history, model, stateMap) : 0;
              const formattedGain = gain.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });



              if (!latest || !equip) return null;

              return (
                <Marker key={item.equipmentId} position={[latest.lat, latest.lon]} icon={markerIcon}>
                  {/* Para ver trajeto */}
                  {showRoutes && item.positions.length > 1 && (
                    <Polyline
                      positions={item.positions.map(p => [p.lat, p.lon])}
                      pathOptions={{ color: modelColor, weight: 3, opacity: 0.7 }}
                    />
                  )}


                  <Popup>
                    <div style={{ maxWidth: '200px' }}>
                      <strong>{equip.name}</strong><br />
                      Última posição: {new Date(latest.date).toLocaleString()}<br />

                      {/* Estado atual */}
                      {stateInfo && (
                        <div className="mt-2">
                          <span className="badge" style={{ backgroundColor: stateInfo.color }}>
                            {stateInfo.name}
                          </span>
                        </div>
                      )}

                      {/* Histórico */}
                      {history && history.states && history.states.length > 0 && (
                        <div className="mt-2">
                          <strong>Histórico:</strong>
                          <ul className="mb-0 ps-0 list-unstyled">
                            {history.states.slice(-3).reverse().map((s, i) => {
                              const info = states.find(state => state.id === s.equipmentStateId);
                              const formattedDate = new Date(s.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                              });

                              return (
                                <li key={i} className="d-flex align-items-center mb-1">
                                  <span style={{
                                    display: 'inline-block',
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: info?.color || '#ccc',
                                    marginRight: 6,
                                  }}></span>
                                  <span>
                                    <strong>{info?.name || 'Desconhecido'}</strong> – <small>{formattedDate}</small>
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      <div className="mt-2">
                        <strong>Produtividade (últimas 24h):</strong><br />
                        {productivity !== null ? `${productivity}%` : 'Não disponível'}
                      </div>


                      <div className="mt-2">
                        <strong>Ganho estimado:</strong><br />
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                          {formattedGain}
                        </span>
                      </div>

                    </div>
                  </Popup>
                </Marker>
              );
            })}

        </MapContainer>
      </div>
    </div>
  );
}

export default App;

import Leaflet, { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { getLatestEquipmentPositions, getLatestEquipmentStates, loadData } from '../data/loadData';
import Modal from './modal';

// Importar ícones
import iconManutencao from '../assets/icon-manutencao.png';
import iconOperando from '../assets/icon-operando.png';
import iconParado from '../assets/icon-parado.png';

// Definir ícones personalizados com as imagens importadas
const createCustomIcon = (stateName: string | undefined) => {
    let iconUrl;

    if (stateName === 'Operando') {
      iconUrl = iconOperando;
    } else if (stateName === 'Parado') {
      iconUrl = iconParado;
    } else if (stateName === 'Manutenção') {
      iconUrl = iconManutencao;
    } else {
      iconUrl = iconOperando; // Ícone padrão
    }
    
    return new Leaflet.Icon({
        iconUrl: iconUrl,
        iconSize: [36, 48], // Tamanho do ícone
        iconAnchor: [18, 48], // Ancoragem para centralizar na posição
        popupAnchor: [0, -48], // Posição do popup em relação ao ícone
        shadowSize: [41, 41]
    });
  };

const MapView = ({ onDataChange }: { onDataChange: Function }) => {
  const { equipment, equipmentState, equipmentStateHistory, equipmentPositionHistory, equipmentModel } = loadData();
  const latestPositions = getLatestEquipmentPositions(equipmentPositionHistory);
  const latestStates = getLatestEquipmentStates(equipmentStateHistory);

  const center: LatLngExpression = [-19.126536, -45.947756];

  // Estado para filtros
  const [selectedState, setSelectedState] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para o zoom inicial
  const [zoom, setZoom] = useState(() => {
    return window.innerWidth < 768 ? 9 : 10; // Defina o zoom inicial com base no tamanho da janela
  });

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  // Ajustar o zoom com base no tamanho da janela
  useEffect(() => {
    const handleResize = () => {
        setZoom(window.innerWidth < 768 ? 9 : 10);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const calculateProductivity = () => {
        const productivityData = equipment.map(equip => {
            const stateHistory = equipmentStateHistory.find(history => history.equipmentId === equip.id)?.states || [];
            
            let totalHours = 0;
            let operatingHours = 0;

            stateHistory.forEach((state, index) => {
                if (index < stateHistory.length - 1) {
                    const nextState = stateHistory[index + 1];
                    const startTime = new Date(state.date).getTime();
                    const endTime = new Date(nextState.date).getTime();
                    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);

                    totalHours += durationInHours;

                    const stateName = equipmentState.find(s => s.id === state.equipmentStateId)?.name;
                    if (stateName === 'Operando') {
                        operatingHours += durationInHours;
                    }
                }
            });

            // Calcular a produtividade como porcentagem
            const productivity = totalHours > 0 ? (operatingHours / totalHours) * 100 : 0;

            return {
                id: equip.id,
                name: equip.name,
                productivity: productivity.toFixed(2) // Formatar para duas casas decimais
            };
        });

        return productivityData;
    };

    //Calcular o Ganho
    const calculateEarnings = () => {
        return equipment.map(equip => {
            const stateHistory = equipmentStateHistory.find(history => history.equipmentId === equip.id)?.states || [];
            const model = equipmentModel.find(m => m.id === equip.equipmentModelId);
            let totalEarnings = 0;
    
            stateHistory.forEach((state, index) => {
                if (index < stateHistory.length - 1) {
                    const nextState = stateHistory[index + 1];
                    const startTime = new Date(state.date).getTime();
                    const endTime = new Date(nextState.date).getTime();
                    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    
                    const stateEarning = model?.hourlyEarnings.find(earning => earning.equipmentStateId === state.equipmentStateId)?.value || 0;
                    totalEarnings += stateEarning * durationInHours;
                }
            });
    
            return {
                id: equip.id,
                name: equip.name,
                earnings: totalEarnings.toFixed(2) // Arredonda para duas casas decimais
            };
        });
    };

   // Filtragem dos equipamentos com base nos filtros selecionados
   const filteredPositions = latestPositions.filter(pos => {
        const equipmentCurrentState = latestStates.find(s => s.equipmentId === pos.equipmentId);
        const state = equipmentState.find(state => state.id === equipmentCurrentState?.stateId)?.name;
        const model = equipment.find(e => e.id === pos.equipmentId)?.equipmentModelId;
        const equipmentName = equipment.find(e => e.id === pos.equipmentId)?.name || '';
        const equipmentId = equipment.find(e => e.id === pos.equipmentId)?.id || '';

        const stateMatch = selectedState ? state === selectedState : true;
        const modelMatch = selectedModel ? model === selectedModel : true;
        const searchMatch = (
            equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return stateMatch && modelMatch && searchMatch;
    });

    // Inicializar os contadores para cada estado
    const stateCounts = {
        operando: 0,
        parado: 0,
        manutencao: 0
    };

    // Incrementar os contadores com base nos equipamentos filtrados
    filteredPositions.forEach(pos => {
        const equipmentCurrentState = latestStates.find(s => s.equipmentId === pos.equipmentId);
        const state = equipmentState.find(state => state.id === equipmentCurrentState?.stateId)?.name;
        
        // Mapear os nomes dos estados para as chaves do objeto stateCounts
        if (state === 'Operando') {
            stateCounts.operando++;
        } else if (state === 'Parado') {
            stateCounts.parado++;
        } else if (state === 'Manutenção') {
            stateCounts.manutencao++;
        }
    });

    // Contagem dos modelos filtrados
    const modelCounts = equipmentModel.map(model => {
        const count = filteredPositions.filter(pos => {
            const equipmentItem = equipment.find(e => e.id === pos.equipmentId);
            return equipmentItem?.equipmentModelId === model.id;
        }).length;
        return { name: model.name, count };
    });

    useEffect(() => {
        // Atualizar as contagens no componente pai
        const productivityData = calculateProductivity();
        const earningsData = calculateEarnings();
        onDataChange({
            stateCounts,
            modelCounts,
            productivityData,
            earningsData 
        });
    }, [selectedState, selectedModel, searchTerm]);

  return (
    <>
        <div className="filters">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Pesquisar Equipamento (Nome ou ID)" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            <div>
            <select className="filter-select" onChange={(e) => setSelectedState(e.target.value)}>
                <option value="">Todos os Estados</option>
                <option value="Operando">Operando</option>
                <option value="Parado">Parado</option>
                <option value="Manutenção">Manutenção</option>
            </select>
            <select className="filter-select" onChange={(e) => setSelectedModel(e.target.value)}>
                <option value="">Todos os Modelos</option>
                {equipmentModel.map((model) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>
            </div>
        </div>

        <MapContainer center={center} zoom={zoom} style={{ height: 'calc(-305px + 100vh)', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPositions.map((pos, index) => {
            const equipmentCurrentState = latestStates.find(s => s.equipmentId === pos.equipmentId);
            const state = equipmentState.find(state => state.id === equipmentCurrentState?.stateId);
            const equipmentItem = equipment.find(e => e.id === pos.equipmentId);
            const model = equipmentModel.find(model => model.id === equipmentItem?.equipmentModelId);
            const icon = createCustomIcon(state?.name);

            return (
            <Marker
                key={index}
                position={[pos.lat, pos.lon]}
                icon={icon}
            >
            <Popup>
                <div>
                <h4>Equipamento: {equipmentItem?.name}</h4>
                <p>Modelo: {model?.name}</p>
                <p>Status: {state?.name}</p>
                <button onClick={() => setSelectedEquipmentId(pos.equipmentId)}>Ver Histórico Completo</button>
                </div>
            </Popup>
            </Marker>
        )
        })}
        </MapContainer>

        <Modal
            isOpen={selectedEquipmentId !== null}
            onClose={() => setSelectedEquipmentId(null)}
            equipmentHistory={equipmentStateHistory.filter(history => history.equipmentId === selectedEquipmentId)} 
            equipmentPositions={equipmentPositionHistory.filter(position => position.equipmentId === selectedEquipmentId)}
            equipmentStates={equipmentState}
        />
  </>
  );
};

export default MapView;
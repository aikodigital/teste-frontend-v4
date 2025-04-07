import stateData from '../data/equipmentState.json';
import stateHistoryData from '../data/equipmentStateHistory.json';
import { format } from 'date-fns';
import {
  Wrench,
  Play,
  PauseCircle,
  AlertTriangle,
  CircleSlash,
  HelpCircle
} from 'lucide-react';

const EquipmentHistoryPanel = ({ equipmentId, equipmentName, onClose }) => {
  const stateHistory = stateHistoryData.find(e => e.equipmentId === equipmentId);

  const getIconByState = (stateName) => {
    switch (stateName.toLowerCase()) {
      case 'operando':
        return <Play size={14} />;
      case 'manutenção':
        return <Wrench size={14} />;
      case 'parado':
        return <PauseCircle size={14} />;
      case 'erro':
        return <AlertTriangle size={14} />;
      case 'desligado':
        return <CircleSlash size={14} />;
      default:
        return <HelpCircle size={14} />;
    }
  };

  const states = stateHistory?.states
    ?.slice()
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
    ?.map(entry => {
      const stateInfo = stateData.find(s => s.id === entry.equipmentStateId);
      return {
        date: format(new Date(entry.date), 'dd/MM/yyyy HH:mm'),
        name: stateInfo?.name || 'Desconhecido',
        color: stateInfo?.color || '#999'
      };
    }) || [];

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-[999]">
      <button onClick={onClose} className="mb-4 text-sm text-blue-600 hover:underline">
        ← Voltar
      </button>
      <h2 className="text-lg font-bold text-red-500">{equipmentName}</h2>
      <h4 className="text-lg font-bold mb-2">Histórico de Estados</h4>
      {states.length === 0 && <p>Nenhum dado disponível.</p>}
      <ul className="space-y-2">
        {states.map((s, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: s.color }}
            >
              {getIconByState(s.name)}
            </span>
            <div>
              <p className="text-sm font-medium">{s.name}</p>
              <p className="text-xs text-gray-500">{s.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentHistoryPanel;
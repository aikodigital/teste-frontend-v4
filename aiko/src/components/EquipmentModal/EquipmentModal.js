import "./EquipmentModal.css";
import {
  buildStatePeriods,
  calculateProductivity,
} from "../../utils/equipmentMetrics";

function EquipmentModal({ equipment, stateMap, onClose }) {
  const periods = buildStatePeriods(
    equipment.history,
    equipment.stateHistory,
    stateMap
  );

  const productivity = calculateProductivity(periods);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h2>{equipment.name} — Histórico</h2>
          <button onClick={onClose}>✕</button>
        </header>

        <div className="productivity">
          Produtividade: <strong>{productivity}%</strong>
        </div>

        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Distância (km)</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p, i) => (
              <tr key={i}>
                <td style={{ color: p.state.color }}>{p.state.name}</td>
                <td>{new Date(p.start).toLocaleString()}</td>
                <td>{new Date(p.end).toLocaleString()}</td>
                <td>{(p.distance / 1000).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquipmentModal;

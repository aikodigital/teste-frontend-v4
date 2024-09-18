import React, { useState } from 'react';
import getCustomIcon from './IconComponent';
import equipmentData from '../../../data/equipment.json';
import equipmentModelData from '../../../data/equipmentModel.json';
import equipmentStateHistoryData from '../../../data/equipmentstatehistory.json';
import positionHistoryData from '../../../data/equipmentPositionHistory.json';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const EquipmentComponent: React.FC = () => {
  const [viewMode] = useState('productivity');
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  const OPERATING_STATE_ID = '0808344c-454b-4c36-89e8-d7687e692d57';
  const MAINTENANCE_STATE_ID = '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f';
  const STOPPED_STATE_ID = 'baff9783-84e8-4e01-874b-6fd743b875ad';


  const calculateProductivity = (equipmentId: string) => {
    const stateHistory = equipmentStateHistoryData.find((history) => history.equipmentId === equipmentId);
    if (!stateHistory) return 0;

    const operatingHours = stateHistory.states.filter((state) => state.equipmentStateId === OPERATING_STATE_ID).length;
    const totalHours = stateHistory.states.length;
    return (operatingHours / totalHours) * 100;
  };


  const calculateEarnings = (equipmentId: string, modelId: string) => {
    const model = equipmentModelData.find((model) => model.id === modelId);
    const stateHistory = equipmentStateHistoryData.find((history) => history.equipmentId === equipmentId);

    if (!model || !stateHistory) return 0;

    const hoursInOperating = stateHistory.states.filter((state) => state.equipmentStateId === OPERATING_STATE_ID).length;
    const hoursInMaintenance = stateHistory.states.filter((state) => state.equipmentStateId === MAINTENANCE_STATE_ID).length;
    const hoursInStopped = stateHistory.states.filter((state) => state.equipmentStateId === STOPPED_STATE_ID).length;

    const operatingEarnings = model.hourlyEarnings.find((earning) => earning.equipmentStateId === OPERATING_STATE_ID)?.value || 0;
    const maintenanceEarnings = model.hourlyEarnings.find((earning) => earning.equipmentStateId === MAINTENANCE_STATE_ID)?.value || 0;
    const stoppedEarnings = model.hourlyEarnings.find((earning) => earning.equipmentStateId === STOPPED_STATE_ID)?.value || 0;

    return (hoursInOperating * operatingEarnings) +
      (hoursInMaintenance * maintenanceEarnings) +
      (hoursInStopped * stoppedEarnings);
  };


  const getPositionHistory = (equipmentId: string) => {
    const positionHistory = positionHistoryData.find((history) => history.equipmentId === equipmentId);
    if (!positionHistory) return [];

    return positionHistory.positions;
  };


  const getCurrentOperatingState = (equipmentId: string) => {
    const stateHistory = equipmentStateHistoryData.find((history) => history.equipmentId === equipmentId);
    if (!stateHistory || stateHistory.states.length === 0) return { state: "Desconhecido", color: "#000000" };

    const mostRecentState = stateHistory.states[stateHistory.states.length - 1];
    switch (mostRecentState.equipmentStateId) {
      case OPERATING_STATE_ID:
        return { state: "Operando", color: "green" };
      case MAINTENANCE_STATE_ID:
        return { state: "Em Manutenção", color: "orange" };
      case STOPPED_STATE_ID:
        return { state: "Parado", color: "red" };
      default:
        return { state: "Desconhecido", color: "#000000" };
    }
  };


  const handleOpenModal = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setCurrentPage(1); 
    setOpen(true);
  };


  const handleCloseModal = () => {
    setOpen(false);
    setSelectedEquipmentId(null);
  };


  const renderPositionHistory = () => {
    if (!selectedEquipmentId) return null;
    const history = getPositionHistory(selectedEquipmentId);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div>
        <ul>
          {currentItems.map((pos, index) => (
            <li key={index}>
              {`Data: ${new Date(pos.date).toLocaleString()}, Lat: ${pos.lat}, Lon: ${pos.lon}`}
            </li>
          ))}
        </ul>
        <div>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Página Anterior
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= history.length}
          >
            Próxima Página
          </Button>
        </div>
      </div>
    );
  };


  const renderView = (equipmentId: string, modelId: string) => {
    switch (viewMode) {
      case 'productivity': {
        const productivity = calculateProductivity(equipmentId);
        const earnings = calculateEarnings(equipmentId, modelId);
        const currentStateInfo = getCurrentOperatingState(equipmentId);

        return (
          <div>
            <ul>{`Produtividade: ${productivity.toFixed(2)}%`}</ul>
            <ul>{`Ganho: R$ ${earnings}`}</ul>
            <ul
              style={{
                border: `2px solid ${currentStateInfo.color}`,
                backgroundColor: `${currentStateInfo.color}`,
                padding: '5px',
                borderRadius: '10px',
                display: 'inline-block',
                color: 'white',
                fontWeight: 600,
                alignSelf: 'center',
              }}
            >
              {`${currentStateInfo.state}`}
            </ul>
            <Button className="buttonhistorico" variant="text" size='small' onClick={() => handleOpenModal(equipmentId)}>
              Ver Histórico
            </Button>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="equipment-container">
        {equipmentData.map((equipment) => {
          const model = equipmentModelData.find((model) => model.id === equipment.equipmentModelId);
          const icon = getCustomIcon(model?.name || 'default');

          return (
            <div className="equipment-item" key={equipment.id}>
              <img src={icon.options.iconUrl} alt="Icon" />
              <span>{equipment.name}</span>
              {renderView(equipment.id, equipment.equipmentModelId)}
            </div>
          );
        })}
      </div>

      <Dialog className='dialogbox' open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle className='dialogbox--title'>Histórico</DialogTitle>
        <DialogContent className='dialogbox--content'>
          {renderPositionHistory()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EquipmentComponent;

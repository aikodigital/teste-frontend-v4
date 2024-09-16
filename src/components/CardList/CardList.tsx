import React from 'react';
import { Card } from 'react-bootstrap';
import './CardList.css'; 
import { CardListProps } from '../../types';
import { useEquipmentData } from '../../contexts/EquipmentDataContext';
import { calculateProductivity } from '../../utils/calculateProductivity';

const CardList: React.FC<CardListProps> = ({ equipmentList, onCardClick }) => {
  const { equipmentModelList, equipmentStatesHistory, equipmentStatesInfoList } = useEquipmentData();

  return (
    <div className="row">
      {equipmentList.map((equipment) => {
        const equipmentModel = equipmentModelList.find(model => model.id === equipment.equipmentModelId);
        const latestState = equipmentStatesHistory.find(state => state.equipmentId === equipment.id)?.states;
        const latestStateId = latestState ? latestState[latestState.length - 1]?.equipmentStateId : null;

        const stateInfo = latestStateId
          ? equipmentStatesInfoList.find(info => info.id === latestStateId)
          : null;

        const productivity = calculateProductivity(equipment.id, equipmentStatesHistory, equipmentStatesInfoList);

        return (
          <div key={equipment.id} className="col-md-4 col-sm-6 col-12 mb-4">
            <Card className="h-100 d-flex flex-column custom-card" onClick={() => onCardClick(equipment.id)}>
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title className="card-title">
                  {equipmentModel?.name ?? "Equipamento"} {equipment.name}
                </Card.Title>
                <Card.Text className="flex-grow-1">
                  <span style={{ color: stateInfo?.color ?? 'black'}}>
                    {stateInfo ? stateInfo.name : 'Desconhecido'}
                  </span>
                </Card.Text>
                <Card.Text>
                  <strong>Produtividade: </strong>{productivity}%
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
import React, { useEffect } from 'react';
import MapView from '../components/MapView';
import EquipmentCard from '../components/EquipmentCard';
import { useDispatch, useSelector } from 'react-redux';
import { setEquipment, setEquipmentState, setEquipmentPositionHistory, setEquipmentStateHistory } from '../store/equipmentSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { equipment } = useSelector(state => state.equipment);

  useEffect(() => {
    fetch('/data/equipment.json')
      .then(res => res.json())
      .then(data => dispatch(setEquipment(data)));

    fetch('/data/equipmentState.json')
      .then(res => res.json())
      .then(data => dispatch(setEquipmentState(data)));

    fetch('/data/equipmentPositionHistory.json')
      .then(res => res.json())
      .then(data => dispatch(setEquipmentPositionHistory(data)));

    fetch('/data/equipmentStateHistory.json')
      .then(res => res.json())
      .then(data => dispatch(setEquipmentStateHistory(data)));
  }, [dispatch]);

  return (
    <div className="dashboard">
      <MapView />
      <div className="equipment-list">
        {equipment.map(eq => (
          <EquipmentCard key={eq.id} equipmentId={eq.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

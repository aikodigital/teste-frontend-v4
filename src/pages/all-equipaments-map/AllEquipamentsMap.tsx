import React, { useEffect, useState } from 'react';
import './Map.css';
import { IEquipmentPositionHistory, IPosition } from '../../models/EquipmentPositionHistory';
import MapComponent from '../../components/map/MapComponent';



const AllEquipamentsMap = () => {


  const [equipmentsHistory, setEquipmentsHistory] = useState<IEquipmentPositionHistory[]>([]);

  useEffect(() => {
    getEquipmentPositionHistory();
  }, []);

  const getEquipmentPositionHistory = async () => {
    try {
      const resp = await fetch("../data/equipmentPositionHistory.json");
      const data: IEquipmentPositionHistory[] = await resp.json();

      setEquipmentsHistory(data);
    } catch (e) {
      console.log("errrorr", e);
    }
  };

  if (!equipmentsHistory.length) {
    return null;
  }

  const positions : IPosition[] = equipmentsHistory.map(equipment => {

    const mostRecentPosition =  equipment.positions.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
    return {
      ...mostRecentPosition,
      equipmentId: equipment.equipmentId
    };
  })

  return (
    <div className="map-container">
      <MapComponent positions={positions} />
    </div>
  );
};

export default AllEquipamentsMap;

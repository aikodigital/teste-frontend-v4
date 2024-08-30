import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Map.css';
import { IEquipmentPositionHistory } from '../../models/EquipmentPositionHistory';
import MapComponent from '../../components/map/MapComponent';



const EquipamentPositionMapPage = () => {


  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [equipmentHistory, setEquipmentHistory] = useState<IEquipmentPositionHistory>();

  useEffect(() => {
    getEquipmentPositionHistory();
  }, []);

  const getEquipmentPositionHistory = async () => {
    try {
      const resp = await fetch("/data/equipmentPositionHistory.json");
      const data : IEquipmentPositionHistory [] = await resp.json();

      setEquipmentHistory(data.find(eq=> eq.equipmentId === equipmentId));
    } catch (e) {
      console.log('errrorr', e);
    }
  };

  if (!equipmentHistory?.positions?.length) {
    return null;
  }


  return (
    <div className="map-container">
      <MapComponent positions={equipmentHistory.positions.map(p=> {
        return {
          ...p,
          equipmentId: equipmentHistory.equipmentId
        }
      })} />
    </div>
  );
};

export default EquipamentPositionMapPage;

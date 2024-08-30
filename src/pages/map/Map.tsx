import React, { useEffect, useState } from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './Map.css';
import { IEquipmentPositionHistory } from '../../models/EquipmentPositionHistory';



const MapComponent = () => {

  const [equipmentHistory, setEquipmentHistory ] = useState<IEquipmentPositionHistory[]>([]);
  const position = {lat: 53.54992, lng: 10.00678};

  
  
  
  
  useEffect(()=> {
    getEquipmentPositionHistory();
  }, [])


  const getEquipmentPositionHistory = async () => {
    try {
      const resp =  await fetch('data/equipmentPositionHistory.json');
      const data :IEquipmentPositionHistory[] = await resp.json();
      setEquipmentHistory(data);
    }catch(e){
      console.log(e)
    }
   
  }
  
  return (
    <div className='map-container'>
      <APIProvider apiKey={process.env.REACT_APP_MAP_KEY || ''}>
        <Map defaultCenter={position} defaultZoom={10}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>
   
  );
}



export default MapComponent;

import React, { useState, useEffect } from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { IPosition } from '../../models/EquipmentPositionHistory';
import { IEquipment } from '../../models/Equipment';
import { IEquipmentModel } from '../../models/EquipmentModel';


interface MyObject {
  [key: string]: string;
}

const colorsObject : MyObject = {
  "a3540227-2f0e-4362-9517-92f41dabbfdf": "#ACB6CE",
  "a4b0c114-acd8-4151-9449-7d12ab9bf40f": "#E391AB",
  "9c3d009e-0d42-4a6e-9036-193e9bca3199": "#F0E2A3"
}

const MapComponent = ({ positions, equipamentId }: { positions: IPosition[], equipamentId?: string }) => {

  const [hoveredMarker, setHoveredMarker] = useState<{name: string, model: string, modelId: string} | null>();
  const [equipments, setEquipments] = useState<IEquipment[]>([]);
  const [equipmentModels, setEquipmentModels] = useState<IEquipmentModel[]>([]);


  useEffect(() => {
    if(!equipamentId) {
      getEquipments();
      getEquipmentModels();
    }
  }, []);


  const getEquipments = async () => {
    try {
      const resp = await fetch("/data/equipment.json");
      const data: IEquipment[] = await resp.json();
      setEquipments(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getEquipmentModels = async () => {
    try {
      const resp = await fetch("/data/equipmentModel.json");
      const data: IEquipmentModel[] = await resp.json();
      setEquipmentModels(data);
    } catch (e) {
      console.log(e);
    }
  };


  const getEquipmentById = (id: string) => {
    const equipament = equipments.find(eq=> eq.id === id);
    const equipamentModel = equipmentModels.find(eq=> eq.id === equipament?.equipmentModelId);
    setHoveredMarker({
      model: equipamentModel?.name || "",
      name: equipament?.name || "",
      modelId: equipamentModel?.id || "",
    });
  }


  const getCustomMarkerIcon = (equipmentId: string) => {

    const equipament = equipments.find(eq=> eq.id === equipmentId);
    const equipamentModel = equipmentModels.find(eq=> eq.id === equipament?.equipmentModelId);
    let color = "#ACB6CE";

    if (equipamentModel?.id) {
      color = colorsObject?.[equipamentModel?.id];
    }
    
    return {
    path: 1,
    fillColor: color,
    fillOpacity: 1,
    scale: 10,
    strokeColor: 'white',
    strokeWeight: 2
  }
};

  const firstPosition = {
    lat: positions[0].lat,
    lng: positions[0].lon,
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAP_KEY || ""}>
    <Map defaultCenter={firstPosition} defaultZoom={10}>
        {positions.map((position, index) => (
        <Marker
            title={`${hoveredMarker?.name} (${hoveredMarker?.model})`}
            key={index}
            position={{ lat: position.lat, lng: position.lon }}
            onMouseOver={() => getEquipmentById(position.equipmentId || "")}
            onMouseOut={() => setHoveredMarker(null)}
            icon={getCustomMarkerIcon(position.equipmentId || '')}
        />
        ))}
    </Map>
    </APIProvider>
  );
};

export default MapComponent;

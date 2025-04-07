import { useEffect, useRef, useState } from "react";
import './Map.scss';
import IEquipmentInfo from "../../interfaces/IEquipmentInfo";
import IEquipment from '../../interfaces/IEquipment';
import IEquipmentModel from '../../interfaces/IEquipmentModel';
import IEquipmentPosition from '../../interfaces/IEquipmentPosition';
import IEquipmentState from '../../interfaces/IEquipmentState';
import IEquipmentStateHistory from '../../interfaces/IEquipmentStateHistory';

interface EquipmentComponentProps {
    equipmentList: IEquipment[];
    equipmentModelList: IEquipmentModel[];
    equipmentPositionList: IEquipmentPosition[];
    equipmentStateList: IEquipmentState[];
    equipmentStateHistoryList: IEquipmentStateHistory[];
}

const Map: React.FC<EquipmentComponentProps> = ( {equipmentList, equipmentModelList, equipmentPositionList, equipmentStateList, equipmentStateHistoryList} ) => {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>(null);

  let equipmentsInfoList : IEquipmentInfo[] = [];

  let markers : IEquipmentInfo[] = [];

  equipmentList.forEach( (equipment) => {
    let name = equipment.name;
    let id = equipment.id;
    let positions = equipmentPositionList.find((item) => item.equipmentId === id)?.positions[0];
    let date = positions?.date;
    let statusId = equipmentStateHistoryList.find((item) => item.equipmentId === id)?.states.find((item) => item.date === date)?.equipmentStateId;
    let statusName = equipmentStateList.find((item) => item.id === statusId)?.name

    if( positions && statusName) {
        markers.push({
        lat: positions?.lat,
        lng: positions?.lon,
        title: name+'\n'+statusName
      })
    } else {
      console.error("Erro relacionando os dados do equipamento: "+name);
    }
  });




  useEffect(() => {
    if (ref.current && !map) {
      const initializedMap = new window.google.maps.Map(ref.current, {
        center: { lat: -19.126536, lng: -45.947756 },
        zoom: 8,
      });

      setMap(initializedMap);

      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: initializedMap,
          title: markerData.title,
        });

        // Adiciona evento onClick ao marcador
        marker.addListener("click", () => {
          alert(`Você clicou no marcador: ${markerData.title}`);
        });
      });
    }
  }, [map]);


  return (
    <>
      <div ref={ref} className="map"></div>
    </>
  );
}

export default Map;
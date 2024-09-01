import { useState } from "react";
import { Divider } from "antd";
import Image from 'next/image';
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { PointerPosition } from "@/lib/types/map";
import style from './map.module.scss';
import crane from '@/app/assets/img/crane.png';
import harvester from '@/app/assets/img/harvester.png';
import truck from '@/app/assets/img/truck.png';

interface PointersInterface {
  positions: PointerPosition[];

}

export const Pointers = ({ positions }: PointersInterface) => {
  const [infoWindowShown, setInfoWindowShown] = useState(
    {
      status: false,
      equipment: {
        position: {
          lat: 0,
          lng: 0
        },
        info: {
          name: '',
          model: '',
          state: '',
          date: new Date(),
        }
      }
    });

  const handleHover = (lat: number, lng: number, info: { name: string; model: string, state: string; date: Date }) => {
    setInfoWindowShown({
      status: true, equipment: {
        position: {
          lat,
          lng,
        },
        info: {
          name: info.name,
          model: info.model,
          state: info.state,
          date: new Date(info.date)
        }
      }
    })
  };

  const handleIcon = (modelName: string) => {
    if (modelName === 'Harvester') {
      return harvester;
    }

    if (modelName === 'Caminhão de carga') {
      return truck;
    }

    return crane;
  }

  const handleClose = () => {
    setInfoWindowShown({ ...infoWindowShown, status: false })
  }
  return (
    <>
      {positions.map((pointer: PointerPosition) => (
        <div key={pointer.key}>
          <AdvancedMarker
            position={pointer.location}>
            <div
              onMouseOver={() => handleHover(pointer.location.lat, pointer.location.lng, pointer.info)}
              className={style.pointer}
              style={{ background: pointer.color }}>
              <Image src={handleIcon(pointer.info.model)} alt="equipment" width={32} />
            </div>
          </AdvancedMarker>
        </div>
      ))}

      {infoWindowShown.status === true && (
        <InfoWindow position={{ lat: infoWindowShown.equipment.position.lat, lng: infoWindowShown.equipment.position.lng }}
          onCloseClick={handleClose} shouldFocus={false} style={{ width: 200 }} headerContent={
            <>
              <h3>{infoWindowShown.equipment.info.name}</h3>
              <div>
                <p>{infoWindowShown.equipment.info.date.toLocaleString()}</p>
              </div>
            </>}>
          <Divider />
          <p>{infoWindowShown.equipment.info.state}</p>
        </InfoWindow>
      )}
    </>
  );
};
import { Equipment } from '@/lib/types/equipment';
import { PointerPosition } from '@/lib/types/map';
import { Map as GoogleMap } from '@vis.gl/react-google-maps';
import { Pointers } from './pointers';

interface MapInterface {
  currentEquipment: Equipment[];
}

export const Map = ({ currentEquipment }: MapInterface) => {

  const positions: PointerPosition[] = currentEquipment.map((eqs) => ({ key: eqs.name, location: { lat: eqs.currentPosition.lat, lng: eqs.currentPosition.lon }, color: eqs.currentState.color, info: { name: eqs.name, model: eqs.model.name, state: eqs.currentState.name, date: eqs.currentPosition.date } }));


  return (
    <GoogleMap
      mapId='bbf5954d2dfdeaf6'
      style={{ position: 'absolute' }}
      defaultZoom={13}
      defaultCenter={positions[0].location}>
      <Pointers positions={positions} />
    </GoogleMap>

  )
};
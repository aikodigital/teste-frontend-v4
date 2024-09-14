import { useEquipmentStore } from '../stores/equipmentStore.ts';

export function getEquipmentPosition(equipmentId: string) {
   const store = useEquipmentStore();
   const positionHistory = store.positionsHistories.find(
      (history) => history.equipmentId === equipmentId
   );
   console.log(positionHistory?.positions[0]);

   if (positionHistory && positionHistory.positions.length > 0) {
      const lastPosition = positionHistory.positions[positionHistory.positions.length - 1];
      return {
         lat: lastPosition.lat,
         lon: lastPosition.lon,
      };
   }

   return null;
}

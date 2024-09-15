import { useQuery } from '@tanstack/react-query';

import { equipmentsApiService } from '@/services';

export const useEquipmentPositionHistory = () => {
  return useQuery({
    queryKey: ['equipments', 'positionHistory'],
    queryFn: equipmentsApiService.getEquipmentPositionHistory
  });
};

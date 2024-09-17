import { useQuery } from '@tanstack/react-query';

import { equipmentsApiService } from '@/services';

export const useEquipmentStateHistory = () => {
  return useQuery({
    queryKey: ['equipments', 'stateHistory'],
    queryFn: equipmentsApiService.getEquipmentStateHistory
  });
};

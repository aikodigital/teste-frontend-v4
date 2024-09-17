import { useQuery } from '@tanstack/react-query';

import { equipmentsApiService } from '@/services';

export const useEquipmentState = () => {
  return useQuery({
    queryKey: ['equipmentState'],
    queryFn: equipmentsApiService.getEquipmentState
  });
};

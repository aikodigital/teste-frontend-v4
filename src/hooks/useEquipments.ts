import { useQuery } from '@tanstack/react-query';

import { equipmentsApiService } from '@/services';

export const useEquipments = () => {
  return useQuery({
    queryKey: ['equipments'],
    queryFn: equipmentsApiService.getEquipments
  });
};

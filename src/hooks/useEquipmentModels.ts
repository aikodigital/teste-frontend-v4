import { useQuery } from '@tanstack/react-query';

import { equipmentsApiService } from '@/services';

export const useEquipmentModels = () => {
  return useQuery({
    queryKey: ['equipments', 'models'],
    queryFn: equipmentsApiService.getEquipmentModels
  });
};

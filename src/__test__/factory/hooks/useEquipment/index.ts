import { faker } from '@faker-js/faker';

import { EquipmentContextProps } from '@/hooks/useEquipment/models';

import {
  makeEquipment,
  makeEquipmentModel,
  makeEquipmentPositionHistory,
  makeEquipmentState,
  makeEquipmentStateHistory,
} from '../../Equipment';

import { EquipmentState } from '@/@types';

export const makeUseEquipment = (props?: Partial<EquipmentContextProps>) => {
  const mockUseEquipment = vi.fn().mockReturnValue({
    changeEquipmentPositionHistory: vi.fn(),
    equipmentPositionHistory: { show: false },

    getEquipmentList: vi.fn().mockReturnValue([makeEquipment()]),
    getEquipmentPositionHistory: vi
      .fn()
      .mockReturnValue(makeEquipmentPositionHistory()),
    getEquipmentStateHistory: vi
      .fn()
      .mockReturnValue([makeEquipmentStateHistory()]),
    getEquipmentModel: vi.fn().mockReturnValue(makeEquipmentModel()),
    getEquipmentModelList: vi.fn().mockReturnValue([makeEquipmentModel()]),
    getEquipmentState: vi.fn().mockReturnValue(makeEquipmentState()),
    getEquipmentStateList: vi.fn().mockReturnValue([makeEquipmentState()]),

    getGain: vi.fn().mockReturnValue(faker.number.int()),
    getIcon: vi.fn().mockReturnValue(faker.internet.url()),
    getProductivity: vi.fn().mockReturnValue(
      Object.values(EquipmentState).reduce(
        (acc, state) => {
          acc[state] = faker.number.int({ min: 0, max: 24 });
          return acc;
        },
        {} as Record<EquipmentState, number>
      )
    ),
    ...props,
  } as EquipmentContextProps);

  return mockUseEquipment;
};

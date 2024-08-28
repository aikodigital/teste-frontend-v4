import { faker } from '@faker-js/faker';

import {
  EquipmentState,
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory,
} from '@/@types';

export const makeEquipment = (props?: Partial<IEquipment>): IEquipment => ({
  id: faker.string.uuid(),
  name: faker.string.alpha(10),
  equipmentModel: makeEquipmentModel(),
  ...props,
});

export const makeEquipmentModel = (
  props?: Partial<IEquipmentModel>
): IEquipmentModel => ({
  id: faker.string.uuid(),
  name: faker.string.alpha(10),
  hourlyEarnings: Array(3)
    .fill(0)
    .map(() => ({
      value: faker.number.int(),
      equipmentState: makeEquipmentState(),
    })),
  ...props,
});

export const makeEquipmentState = (
  props?: Partial<IEquipmentState>
): IEquipmentState => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement(Object.values(EquipmentState)),
  color: faker.color.rgb(),
  ...props,
});

export const makeEquipmentPositionHistory = (
  props?: Partial<IEquipmentPositionHistory>
): IEquipmentPositionHistory => ({
  equipmentId: faker.string.uuid(),
  positions: Array(3)
    .fill(0)
    .map(() => ({
      lat: faker.location.latitude(),
      lon: faker.location.longitude(),
      date: faker.date.recent().toISOString(),
    })),
  ...props,
});

export const makeEquipmentStateHistory = (
  props?: Partial<IEquipmentStateHistory>
): IEquipmentStateHistory => ({
  equipmentId: faker.string.uuid(),
  states: Array(3)
    .fill(0)
    .map(() => ({
      state: makeEquipmentState(),
      date: faker.date.recent().toISOString(),
    })),
  ...props,
});

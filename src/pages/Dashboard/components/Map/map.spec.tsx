import { cleanup } from '@testing-library/react';
import { MapProps } from './models';
import {
  makeEquipment,
  makeEquipmentState,
  makeUseEquipment,
  sutMockProvider,
} from '@/__test__';
import { Map } from '.';
import { faker } from '@faker-js/faker';

vi.mock('react-leaflet', async () => {
  const actual =
    await vi.importActual<typeof import('react-leaflet')>('react-leaflet');

  return {
    ...actual,
    Polyline: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="polyline">{children}</div>
    ),
  };
});

describe('Map', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<MapProps>) => {
    const equipment = makeEquipment();

    const sutProps: MapProps = {
      equipmentList: [equipment],
      equipmentHistory: equipment.id,
      useEquipmentHook: makeUseEquipment(),
      ...props,
    };

    const sut = sutMockProvider(<Map {...sutProps} />);

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    makeSut();

    const mapContainer = document.querySelector('.leaflet-container');

    expect(mapContainer).toBeInTheDocument();
  });

  it('should render the component with correct data when equipmentHistory is passed', () => {
    const equipment = makeEquipment();
    const equipmentPositionHistoryDate = faker.date.recent().toISOString();

    const { sut } = makeSut({
      equipmentList: [equipment],
      equipmentHistory: equipment.id,
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateHistory: vi.fn().mockReturnValue({
          states: [
            {
              date: equipmentPositionHistoryDate,
              equipmentState: makeEquipmentState(),
            },
          ],
        }),
        equipmentPositionHistory: {
          show: true,
          equipmentId: equipment.id,
          data: {
            equipmentId: equipment.id,
            positions: [
              {
                date: equipmentPositionHistoryDate,
                lat: faker.location.latitude(),
                lon: faker.location.longitude(),
              },
            ],
          },
        },
      }),
    });

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    expect(marker).toBeInTheDocument();
  });

  it('should render the component with correct data when equipmentHistory is not passed', () => {
    const { sut } = makeSut({
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateHistory: vi.fn().mockReturnValue({
          states: [
            {
              date: faker.date.recent().toISOString(),
              equipmentState: makeEquipmentState(),
            },
          ],
        }),
        equipmentPositionHistory: {
          show: false,
          equipmentId: undefined,
          data: undefined,
        },
      }),
    });

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    expect(marker).toBeInTheDocument();
  });

  it('should render polyline when equipmentHistory is passed', () => {
    const equipment = makeEquipment();
    const equipmentPositionHistoryDate = faker.date.recent().toISOString();

    const { sut } = makeSut({
      equipmentList: [equipment],
      equipmentHistory: equipment.id,
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateHistory: vi.fn().mockReturnValue({
          states: [
            {
              date: equipmentPositionHistoryDate,
              equipmentState: makeEquipmentState(),
            },
          ],
        }),
        equipmentPositionHistory: {
          show: true,
          equipmentId: equipment.id,
          data: {
            equipmentId: equipment.id,
            positions: [
              {
                date: equipmentPositionHistoryDate,
                lat: faker.location.latitude(),
                lon: faker.location.longitude(),
              },
            ],
          },
        },
      }),
    });

    const polyline = sut.getByTestId('polyline');

    expect(polyline).toBeInTheDocument();
  });
});

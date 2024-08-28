import { cleanup, fireEvent } from '@testing-library/react';
import { EquipmentAccordionProps } from './models';
import {
  makeEquipment,
  makeEquipmentPositionHistory,
  makeEquipmentState,
  makeEquipmentStateHistory,
  makeUseEquipment,
  sutMockProvider,
} from '@/__test__';
import { EquipmentAccordion } from '.';
import { faker } from '@faker-js/faker';
import { EquipmentState } from '@/@types';

describe('EquipmentAccordion', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<EquipmentAccordionProps>) => {
    const sutProps: EquipmentAccordionProps = {
      equipment: makeEquipment(),
      useEquipmentHook: makeUseEquipment(),
      ...props,
    };

    const sut = sutMockProvider(<EquipmentAccordion {...sutProps} />);

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    const { sut } = makeSut();

    expect(sut.getByTestId('equipment-accordion')).toBeInTheDocument();
  });

  it('should render the component with correct data', () => {
    const equipment = makeEquipment();
    const equipmentState = makeEquipmentState();

    const { sut } = makeSut({
      equipment,
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateHistory: vi.fn().mockReturnValue(
          makeEquipmentStateHistory({
            states: [
              {
                date: faker.date.recent().toISOString(),
                equipmentState: equipmentState,
              },
            ],
          })
        ),
      }),
    });

    expect(sut.getByText(equipment.name)).toBeInTheDocument();
    expect(
      sut.getByText(equipment.equipmentModel?.name || '')
    ).toBeInTheDocument();
    expect(sut.getByText(equipmentState.name)).toBeInTheDocument();
  });

  it('should render equipmentStateHistory when accordion is open', () => {
    const equipment = makeEquipment();
    const equipmentStateHistory = Array(3)
      .fill(0)
      .map(() => ({
        date: faker.date.recent().toISOString(),
        equipmentState: makeEquipmentState(),
      }));

    const { sut } = makeSut({
      equipment,
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateHistory: vi.fn().mockReturnValue(
          makeEquipmentStateHistory({
            states: equipmentStateHistory,
          })
        ),
      }),
    });

    equipmentStateHistory.forEach(({ date }) => {
      expect(
        sut.queryByText(new Date(date).toLocaleString())
      ).not.toBeInTheDocument();
    });

    fireEvent.click(sut.getByTestId('accordion-trigger'));

    equipmentStateHistory.forEach(({ date }) => {
      expect(
        sut.getByText(new Date(date).toLocaleString())
      ).toBeInTheDocument();
    });
  });

  it('should render equipment percentage and gain when accordion is open', () => {
    const equipment = makeEquipment();
    const gain = faker.number.int(4000);
    const equipmentProductivity = Object.values(EquipmentState).reduce(
      (acc, state) => {
        acc[state] = faker.number.int({ min: 0, max: 24 });
        return acc;
      },
      {} as Record<EquipmentState, number>
    );

    const { sut } = makeSut({
      equipment,
      useEquipmentHook: makeUseEquipment({
        getGain: vi.fn().mockReturnValue(gain),
        getProductivity: vi.fn().mockReturnValue(equipmentProductivity),
      }),
    });

    const formattedPercentage = (
      (equipmentProductivity[EquipmentState.OPERATING] / 24) *
      100
    ).toFixed(2);
    const formattedGain = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(gain);

    expect(sut.queryByText(`${formattedPercentage}%`)).not.toBeInTheDocument();
    expect(sut.queryByText(formattedGain)).not.toBeInTheDocument();

    fireEvent.click(sut.getByTestId('accordion-trigger'));

    expect(sut.getByText(`${formattedPercentage}%`)).toBeInTheDocument();
    expect(
      sut.getByText(formattedGain, { normalizer: (value) => value })
    ).toBeInTheDocument();
  });

  it('should call changeEquipmentPositionHistory when view position history button is clicked', () => {
    const equipment = makeEquipment();
    const changeEquipmentPositionHistory = vi.fn();

    const { sut } = makeSut({
      equipment,
      useEquipmentHook: makeUseEquipment({
        changeEquipmentPositionHistory,
      }),
    });

    fireEvent.click(sut.getByTestId('accordion-trigger'));

    fireEvent.click(sut.getByTestId('show-position-history-button'));

    expect(changeEquipmentPositionHistory).toHaveBeenCalledWith({
      show: true,
      equipmentId: equipment.id,
      data: expect.anything(),
    });
  });

  it('should call changeEquipmentPositionHistory when close position history button is clicked', () => {
    const equipment = makeEquipment();
    const changeEquipmentPositionHistory = vi.fn();

    const { sut } = makeSut({
      equipment,
      useEquipmentHook: makeUseEquipment({
        changeEquipmentPositionHistory,
        equipmentPositionHistory: {
          show: true,
          equipmentId: equipment.id,
          data: makeEquipmentPositionHistory(),
        },
      }),
    });

    fireEvent.click(sut.getByTestId('accordion-trigger'));

    fireEvent.click(sut.getByTestId('show-position-history-button'));

    expect(changeEquipmentPositionHistory).toHaveBeenCalledWith({
      show: false,
      equipmentId: undefined,
      data: undefined,
    });
  });

  it('should show more state history when show more state history button is clicked', () => {
    const equipment = makeEquipment();
    const equipmentStateHistory = Array(30)
      .fill(0)
      .map(() => ({
        date: faker.date.recent().toISOString(),
        equipmentState: makeEquipmentState(),
      }));
    const initialStateHistory = equipmentStateHistory.slice(-20);
    const moreStateHistory = equipmentStateHistory.slice(0, 10);

    const { sut } = makeSut({
      equipment,
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateHistory: vi.fn().mockReturnValue(
          makeEquipmentStateHistory({
            states: equipmentStateHistory,
          })
        ),
      }),
    });

    fireEvent.click(sut.getByTestId('accordion-trigger'));

    initialStateHistory.forEach(({ date }) => {
      expect(
        sut.getByText(new Date(date).toLocaleString())
      ).toBeInTheDocument();
    });
    moreStateHistory.forEach(({ date }) => {
      expect(
        sut.queryByText(new Date(date).toLocaleString())
      ).not.toBeInTheDocument();
    });

    fireEvent.click(sut.getByTestId('show-more-state-history-button'));

    equipmentStateHistory.forEach(({ date }) => {
      expect(
        sut.getByText(new Date(date).toLocaleString())
      ).toBeInTheDocument();
    });
    expect(
      sut.queryByTestId('show-more-state-history-button')
    ).not.toBeInTheDocument();
  });
});

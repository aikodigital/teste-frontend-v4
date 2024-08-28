import {
  makeEquipment,
  makeEquipmentModel,
  makeEquipmentState,
  makeUseEquipment,
  populateInput,
  populateSelect,
  sutMockProvider,
} from '@/__test__';
import { cleanup, fireEvent } from '@testing-library/react';
import { Dashboard } from '.';
import { DashboardProps } from './models';
import { faker } from '@faker-js/faker';

describe('Dashboard', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<DashboardProps>) => {
    const sutProps: DashboardProps = {
      useEquipmentHook: makeUseEquipment(),
      ...props,
    };

    const sut = sutMockProvider(<Dashboard {...sutProps} />);

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    const { sut } = makeSut();

    expect(sut.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('should render the component with correct components', () => {
    const { sut } = makeSut();

    expect(sut.getByTestId('sidebar')).toBeInTheDocument();
    expect(sut.getByTestId('map-container')).toBeInTheDocument();

    expect(sut.getByTestId('logo')).toBeInTheDocument();

    expect(sut.getByTestId('input-equipment-name')).toBeInTheDocument();
    expect(sut.getByTestId('select-equipment-state')).toBeInTheDocument();
    expect(sut.getByTestId('select-equipment-model')).toBeInTheDocument();
    expect(sut.getByTestId('button-clear-filters')).toBeInTheDocument();
  });

  it('should render the component with correct data', () => {
    const equipmentList = Array(3)
      .fill(0)
      .map(() => makeEquipment());

    const { sut } = makeSut({
      useEquipmentHook: makeUseEquipment({
        getEquipmentList: vi.fn().mockReturnValue(equipmentList),
      }),
    });

    equipmentList.forEach((equipment) => {
      expect(sut.getByText(equipment.name)).toBeInTheDocument();
      expect(
        sut.getByText(equipment.equipmentModel?.name || '')
      ).toBeInTheDocument();
    });
  });

  it('should filter equipments by name', async () => {
    const equipmentList = Array(3)
      .fill(0)
      .map(() => makeEquipment());

    const { sut } = makeSut({
      useEquipmentHook: makeUseEquipment({
        getEquipmentList: vi.fn().mockReturnValue(equipmentList),
      }),
    });

    const equipment = equipmentList[0];

    await populateInput({
      sut,
      testId: 'input-equipment-name',
      value: equipment.name,
    });

    equipmentList.forEach(({ name }) => {
      if (name === equipment.name) {
        expect(sut.getByText(name)).toBeInTheDocument();
      } else {
        expect(sut.queryByText(name)).not.toBeInTheDocument();
      }
    });
  });

  it('should filter equipments by state', async () => {
    const equipmentState = makeEquipmentState();

    const { sut } = makeSut({
      useEquipmentHook: makeUseEquipment({
        getEquipmentStateList: vi.fn().mockReturnValue([equipmentState]),
      }),
    });

    await populateSelect({
      sut,
      testId: 'select-equipment-state',
      targetValue: equipmentState?.name || '',
    });

    expect(sut.getByText('Nenhuma máquina encontrada')).toBeInTheDocument();
  });

  it('should filter equipments by model', async () => {
    const equipmentModel = makeEquipmentModel();

    const { sut } = makeSut({
      useEquipmentHook: makeUseEquipment({
        getEquipmentModelList: vi.fn().mockReturnValue([equipmentModel]),
      }),
    });

    await populateSelect({
      sut,
      testId: 'select-equipment-model',
      targetValue: equipmentModel?.name || '',
    });

    expect(sut.getByText('Nenhuma máquina encontrada')).toBeInTheDocument();
  });

  it('should clear filters', async () => {
    const inputValue = faker.string.alpha(10);

    const { sut } = makeSut();

    await populateInput({
      sut,
      testId: 'input-equipment-name',
      value: inputValue,
    });

    expect(sut.getByTestId('input-equipment-name')).toHaveValue(inputValue);

    const clearButton = sut.getByTestId('button-clear-filters');

    fireEvent.click(clearButton);

    expect(sut.getByTestId('input-equipment-name')).toHaveValue('');
  });

  it('should render empty message when equipments are empty', () => {
    const { sut } = makeSut({
      useEquipmentHook: makeUseEquipment({
        getEquipmentList: vi.fn().mockReturnValue([]),
      }),
    });

    expect(sut.getByText('Nenhuma máquina encontrada')).toBeInTheDocument();
  });
});

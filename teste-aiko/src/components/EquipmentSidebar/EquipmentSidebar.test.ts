import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/vue';
import EquipmentSidebar from './EquipmentSidebar.vue';
import { OptionalFields, RequiredFields } from '@/types/Utils';
import { Equipment } from '@/types/Equipment';
import { formatCurrency } from '@/utils';

const equipmentMock = {
  "id": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
  "equipmentModelId": "a3540227-2f0e-4362-9517-92f41dabbfdf",
  "name": "CA-0001",
  "position": {
    "date": "2021-02-01T03:00:00.000Z",
    "lat": -19.167338,
    "lon": -46.00347
  },
  "state": {
    "id": "baff9783-84e8-4e01-874b-6fd743b875ad",
    "name": "Parado",
    "color": "#f1c40f"
  },
  "model": {
    "id": "a3540227-2f0e-4362-9517-92f41dabbfdf",
    "name": "Caminhão de carga",
    "hourlyEarnings": [
      {
        "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57",
        "value": 100
      },
      {
        "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad",
        "value": -5
      },
      {
        "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
        "value": -20
      }
    ]
  },
} as RequiredFields<Equipment, "position" | "state" | "model">


function getDefaultStubs() {
  return {
    TabController: {
      props: ['class'],
      template: '<slot></slot>'
    },
    HistoryStateTab: {
      props: ['equipment'],
      template: '<p>HistoryStateTab</p>'
    },
    HistoryPositionTab: {
      props: ['equipment'],
      template: '<p>HistoryPositionTab</p>'
    }
  }
}

describe('EquipmentSidebar.vue', () => {
  it('Deve apresentar o nome do equipamento', () => {
    render(EquipmentSidebar, {
      props: {
        equipment: equipmentMock
      },
      slots: {
        default: 'Teste'
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    expect(screen.getByTestId('sidebar-equipment-name').textContent).toContain(equipmentMock.name);
  });

  it('Deve apresentar o estado do equipamento caso exista', async () => {
    const { rerender } = render(EquipmentSidebar, {
      props: {
        equipment: equipmentMock
      },
      slots: {
        default: 'Teste'
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    expect(screen.getByText(equipmentMock.state.name)).toBeTruthy();

    const equipmentWithoutState: OptionalFields<Equipment, "state"> = structuredClone(equipmentMock);
    delete equipmentWithoutState.state;

    await rerender({
      equipment: equipmentWithoutState
    });

    expect(screen.queryByText(equipmentMock.state.name)).toBeNull();
  });

  it('Deve apresentar o custo por hora caso o equipamento possua modelo informado', async () => {
    const { rerender } = render(EquipmentSidebar, {
      props: {
        equipment: equipmentMock
      },
      slots: {
        default: 'Teste'
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    const hourlyEarning = equipmentMock.model.hourlyEarnings.find((earning) => equipmentMock.state.id === earning.equipmentStateId);

    if (!hourlyEarning) {
      throw new Error('Hourly earning not found');
    }

    expect(screen.getByTestId('sidebar-equipment-hourly-earning').textContent).toContain(formatCurrency(hourlyEarning.value))

    const equipmentWithoutModel: OptionalFields<Equipment, "model"> = structuredClone(equipmentMock);
    delete equipmentWithoutModel.model;

    await rerender({
      equipment: equipmentWithoutModel
    });

    expect(screen.queryByTestId('sidebar-equipment-hourly-earning')).toBeNull();
  });
});
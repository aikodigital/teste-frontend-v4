import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import Filters from "./Filters.vue";
import { createTestingPinia } from "@pinia/testing";
import { EquipmentStateJson } from "@/types/EquipmentState";
import { EquipmentModelJson } from "@/types/EquipmentModel";

const equipmentStateMock = [
  {
    "id": "0808344c-454b-4c36-89e8-d7687e692d57",
    "name": "Operando",
    "color": "#2ecc71"
  },
  {
    "id": "baff9783-84e8-4e01-874b-6fd743b875ad",
    "name": "Parado",
    "color": "#f1c40f"
  },
  {
    "id": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
    "name": "Manutenção",
    "color": "#e74c3c"
  }
] as Array<EquipmentStateJson>;

const equipmentModelMock = [
  {
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
  {
    "id": "a4b0c114-acd8-4151-9449-7d12ab9bf40f",
    "name": "Harvester",
    "hourlyEarnings": [
      {
        "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57",
        "value": 200
      },
      {
        "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad",
        "value": -10
      },
      {
        "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
        "value": -50
      }
    ]
  },
  {
    "id": "9c3d009e-0d42-4a6e-9036-193e9bca3199",
    "name": "Garra traçadora",
    "hourlyEarnings": [
      {
        "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57",
        "value": 70
      },
      {
        "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad",
        "value": 0
      },
      {
        "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
        "value": -10
      }
    ]
  }
] as Array<EquipmentModelJson>

describe('Filters.vue', () => {
  it('Deve mostrar todas as opções de estado de equipamento', () => {
    render(Filters, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              "equipmentState": {
                equipmentStates: equipmentStateMock
              }
            }
          })
        ]
      }
    });

    equipmentStateMock.forEach((state) => {
      expect(screen.getByText(state.name)).toBeTruthy();
    });
  });

  it('Deve emitir o id do estado de equipamento selecionado', async () => {
    const { emitted } = render(Filters, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              "equipmentState": {
                equipmentStates: equipmentStateMock
              }
            }
          })
        ]
      }
    });

    for (const state of equipmentStateMock) {
      const button = screen.getByText(state.name);
      await fireEvent.click(button);
      emitted()['update:equipmentStateId'];
      expect(emitted()['update:equipmentStateId'].at(-1)).toEqual([state.id]);
    }
  });

  it('Deve retornar null quando clicar me "todos" no popover de estados', async () => {
    const { emitted } = render(Filters, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              "equipmentState": {
                equipmentStates: equipmentStateMock
              }
            }
          })
        ]
      }
    });

    const button = screen.getByTestId('equipment-state-filter-popover-all-button');

    await fireEvent.click(button);

    expect(emitted()['update:equipmentStateId'].at(-1)).toEqual([null]);
  });

  it('Deve mostrar todas as opções de modelo de equipamento', () => {
    render(Filters, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              "equipmentModel": {
                equipmentModels: equipmentModelMock
              }
            }
          })
        ]
      }
    });

    equipmentModelMock.forEach((model) => {
      expect(screen.getByText(model.name)).toBeTruthy();
    });
  });

  it('Deve emitir o id do modelo de equipamento selecionado', async () => {
    const { emitted } = render(Filters, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              "equipmentModel": {
                equipmentModels: equipmentModelMock
              }
            }
          })
        ]
      }
    });

    for (const model of equipmentModelMock) {
      const button = screen.getByText(model.name);
      await fireEvent.click(button);
      emitted()['update:equipmentModelId'];
      expect(emitted()['update:equipmentModelId'].at(-1)).toEqual([model.id]);
    }
  });

  it('Deve retornar null quando clicar me "todos" no popover de modelos', async () => {
    const { emitted } = render(Filters, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              "equipmentModel": {
                equipmentModels: equipmentModelMock
              }
            }
          })
        ]
      }
    });

    const button = screen.getByTestId('equipment-model-filter-popover-all-button');

    await fireEvent.click(button);

    expect(emitted()['update:equipmentModelId'].at(-1)).toEqual([null]);
  });
});
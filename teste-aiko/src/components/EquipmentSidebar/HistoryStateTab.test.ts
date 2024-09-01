import { Equipment } from "@/types/Equipment";
import { RequiredFields } from "@/types/Utils";
import * as EquipmentStateHistoryService from "@/services/EquipmentStateHistoryService";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/vue";
import HistoryStateTab from "./HistoryStateTab.vue";
import { createTestingPinia } from "@pinia/testing";
import { formatDateTime } from "@/utils";

const historyStateMock = {
  "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
  "states": [
    {
      "date": "2021-02-01T03:00:00.000Z",
      "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
    },
    {
      "date": "2021-02-01T07:00:00.000Z",
      "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
    },
    {
      "date": "2021-02-01T12:00:00.000Z",
      "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
    },
    {
      "date": "2021-02-01T15:00:00.000Z",
      "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
    },
  ]
};

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
];

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

vi.spyOn(EquipmentStateHistoryService, 'getEquipmentStateHistory').mockResolvedValue(historyStateMock);

function getDefaultStubs() {
  return {
    Tab: {
      props: ['title'],
      template: '<slot></slot>'
    },
  };
}

describe("HistoryStateTab.vue", () => {
  it("Deve buscar o histórico de estados do equipamento ao iniciar o componente", async () => {
    render(HistoryStateTab, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs(),
        plugins: [
          createTestingPinia()
        ]
      }
    });

    expect(EquipmentStateHistoryService.getEquipmentStateHistory).toHaveBeenCalledWith(equipmentMock);
  });

  it('Deve renderizar um marker para cada estado do equipamento em ordem mais antigo para mais recente', async () => {
    render(HistoryStateTab, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs(),
        plugins: [
          createTestingPinia({
            initialState: {
              equipmentState: {
                equipmentStates: equipmentStateMock
              }
            }
          })
        ]
      }
    });

    await waitForElementToBeRemoved(() => screen.getAllByTestId('history-state-loader'));

    const getEquipmentState = (stateId: string) => {
      return equipmentStateMock.find((state) => state.id === stateId);
    }

    historyStateMock.states.forEach((state) => {
      expect(screen.getByTestId(`history-state-${state.date}`).textContent).toContain(getEquipmentState(state.equipmentStateId)!.name);
      expect(screen.getByText(formatDateTime(state.date))).toBeTruthy();
    });
  });
});
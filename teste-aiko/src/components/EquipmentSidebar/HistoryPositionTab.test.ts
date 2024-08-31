import { describe, it, expect, vi } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/vue";
import HistoryPositionTab from "./HistoryPositionTab.vue";
import { createTestingPinia } from "@pinia/testing";
import * as EquipmentPositionService from "@/services/EquipmentPositionService";
import { RequiredFields } from "@/types/Utils";
import { Equipment } from "@/types/Equipment";
import { EquipmentPositionHistoryJson } from "@/types/EquipmentPositionHistory";
import dayjs from "dayjs";
import { formatDateTime } from "@/utils";

const equipmentPositionHistoryMock = {
  "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
  "positions": [
    {
      "date": "2021-02-01T03:00:00.000Z",
      "lat": -19.126536,
      "lon": -45.947756
    },
    {
      "date": "2021-02-01T15:00:00.000Z",
      "lat": -19.264235,
      "lon": -46.092436
    },
    {
      "date": "2021-02-01T16:00:00.000Z",
      "lat": -19.171667,
      "lon": -46.044589
    },
    {
      "date": "2021-02-01T21:00:00.000Z",
      "lat": -19.150549,
      "lon": -45.999157
    },
  ]
} as EquipmentPositionHistoryJson

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

vi.spyOn(EquipmentPositionService, 'getEquipmentHistoryPosition').mockResolvedValue(equipmentPositionHistoryMock);

function getDefaultStubs() {
  return {
    Tab: {
      props: ['title'],
      template: '<slot></slot>'
    },
    Map: {
      template: '<slot></slot>',
      props: ['center', 'zoom', 'class']
    },
    LMarker: {
      props: ['latLng', 'class'],
      template: '<div role="position-marker"><slot></slot></div>'
    },
    LIcon: {
      props: ['iconSize', 'iconAnchor', 'className'],
      template: '<slot></slot>'
    },
    LTooltip: {
      template: '<slot></slot>'
    },
    LPolyline: {
      props: ['latLngs'],
      template: '<div></div>'
    }
  };
}

describe("HistoryPositionTab.vue", () => {
  it("Deve buscar o histórico de posições do equipamento ao iniciar o componente", async () => {
    render(HistoryPositionTab, {
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

    expect(EquipmentPositionService.getEquipmentHistoryPosition).toHaveBeenCalledWith(equipmentMock);
  });

  it('Deve renderizar um marker para cada posições do equipamento em ordem mais antigo para mais recente', async () => {
    render(HistoryPositionTab, {
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

    const sortedHistoryPositions = [...equipmentPositionHistoryMock.positions].sort((a, b) => {
      if (dayjs(a.date).isBefore(dayjs(b.date))) {
        return -1;
      }

      return 1;
    });

    await waitForElementToBeRemoved(() => screen.getByTestId('history-position-loader'));

    const allMarkers = screen.getAllByRole('position-marker');

    expect(allMarkers).toHaveLength(sortedHistoryPositions.length);

    for (const [index, marker] of allMarkers.entries()) {
      expect(marker.querySelector('[data-testid="position-marker-icon"]')?.textContent).toContain(index + 1);
      expect(marker.querySelector('[data-testid="position-marker-tooltip-date"]')?.textContent).toContain(formatDateTime(sortedHistoryPositions[index].date));
    }
  });
});
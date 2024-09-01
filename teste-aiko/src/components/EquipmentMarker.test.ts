import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import EquipmentMarker from "./EquipmentMarker.vue";
import { Equipment } from "@/types/Equipment";
import { formatCurrency, formatDateTime, hexToRgb } from "@/utils/index";
import { OptionalFields, RequiredFields } from "@/types/Utils";

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

    LMarker: {
      props: ['latLng', 'title', 'alt', 'name'],
      template: '<slot></slot>'
    },
    LIcon: {
      props: ['iconUrl', 'iconSize', 'iconAnchor', 'shadowUrl', 'shadowSize', 'shadowAnchor', 'popupAnchor', 'className', 'title', 'alt'],
      template: '<slot></slot>'
    },
    LTooltip: {
      props: ['options'],
      template: '<slot></slot>'
    }
  }
}

function formatRgbToString({ r, g, b }: { r: number, g: number, b: number }) {
  return `rgb(${r}, ${g}, ${b})`;
}

describe("EquipmentMarker.vue", () => {
  it('Deve renderizar o nome e a cor do estado do equipamento no icon', () => {
    render(EquipmentMarker, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    const backgroundColor = screen.getByTestId('marker-icon').style.backgroundColor;

    // hex sendo convertido para rgb
    // de maneira inconsistente com o teste
    if (backgroundColor.charAt(0) === '#') {
      expect(screen.getByTestId('marker-icon').style.backgroundColor).toBe(equipmentMock.state?.color);
    } else {
      const rgb = hexToRgb(equipmentMock.state?.color as string);
      if (!rgb) {
        throw new Error(`Cor inválida: ${equipmentMock.state?.color}`);
      }

      expect(screen.getByTestId('marker-icon').style.backgroundColor).toBe(formatRgbToString(rgb));
    }
    expect(screen.getByTestId('marker-icon-equipment-name').innerHTML).toBe(equipmentMock.name);
  });

  it('Deve renderizar o nome do equipamento no tooltip', () => {
    render(EquipmentMarker, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    expect(screen.getByTestId('marker-tooltip-equipment-name').innerHTML).toContain(equipmentMock.name);
  })

  it('Deve renderizar a ultima posição do equipamento no tooltip', () => {
    render(EquipmentMarker, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    expect(screen.getByTestId('marker-tooltip-position').innerHTML).toContain(formatDateTime(equipmentMock.position?.date as string));
  });

  it('Deve renderizar o estado do equipamento e a sua ultima atualização caso o equipamento tenha um estado no tooltip', async () => {
    const { rerender } = render(EquipmentMarker, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    expect(screen.getByTestId('marker-tooltip-equipment-state-name').innerHTML).toContain(equipmentMock.state?.name);
    expect(screen.getByTestId('marker-tooltip-equipment-state-date').innerHTML).toContain(formatDateTime(equipmentMock.state?.date as string));

    const mockWithoutState: OptionalFields<Equipment, "state"> = structuredClone(equipmentMock);
    delete mockWithoutState.state;

    await rerender({
      equipment: mockWithoutState
    });

    expect(screen.queryByTestId('marker-tooltip-equipment-state-name')).toBeFalsy();
    expect(screen.queryByTestId('marker-tooltip-equipment-state-date')).toBeFalsy();
  });

  it('Deve renderizar o modelo e seu custo por hora caso o equipamento tenha um modelo no tooltip', async () => {
    const { rerender } = render(EquipmentMarker, {
      props: {
        equipment: equipmentMock
      },
      global: {
        stubs: getDefaultStubs()
      }
    });

    const hourlyCost = equipmentMock.model.hourlyEarnings.find((earning) => equipmentMock.state?.id === earning.equipmentStateId)

    expect(screen.getByTestId('marker-tooltip-equipment-model-name').innerHTML).toContain(equipmentMock.model?.name);
    expect(screen.getByTestId('marker-tooltip-equipment-model-hourly').textContent).toContain(formatCurrency(hourlyCost?.value as number));

    const mockWithoutModel: OptionalFields<Equipment, "model"> = structuredClone(equipmentMock);
    delete mockWithoutModel.model;

    await rerender({
      equipment: mockWithoutModel
    });

    expect(screen.queryByTestId('marker-tooltip-equipment-model-name')).toBeFalsy();
    expect(screen.queryByTestId('marker-tooltip-equipment-model-hourly')).toBeFalsy();
  });
});
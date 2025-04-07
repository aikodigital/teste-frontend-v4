import { Equipment } from "../types/equipment";
import { EnvironmentOutlined, SyncOutlined } from "@ant-design/icons";

// Aqui começa a parte do EquipList
export const getLastUpdateTimestamp = (equipment: Equipment): string | null => {
  const lastState = equipment.stateHistory?.[equipment.stateHistory.length - 1];
  const lastPosition =
    equipment.positionHistory?.[equipment.positionHistory.length - 1];

  const stateTime = lastState ? new Date(lastState.date).getTime() : 0;
  const positionTime = lastPosition ? new Date(lastPosition.date).getTime() : 0;

  if (!stateTime && !positionTime) return null;

  const latest = new Date(Math.max(stateTime, positionTime));

  const date = latest.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  const time = latest.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date} às ${time}`;
};

// Aqui começa a parte do InfoSection
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getCurrentHourlyEarnings(equipment: Equipment): string {
  if (typeof equipment.hourlyEarnings === "number") {
    return formatCurrency(equipment.hourlyEarnings);
  }

  const currentState = equipment.equipmentStates?.find(
    (s) => s.name === equipment.state,
  );

  const earningForState = equipment.hourlyEarnings?.find(
    (e) => e.equipmentStateId === currentState?.id,
  );

  return earningForState
    ? formatCurrency(earningForState.value)
    : "Valor não definido";
}

export function formatLatLng([lat, lng]: [number, number]) {
  return `${lat}, ${lng}`;
}

// Aqui começa a parte do TimelineSection
export function getGroupedHistoryItems(equipment: Equipment) {
  const {
    stateHistory = [],
    positionHistory = [],
    equipmentStates = [],
  } = equipment;
  const stateById = Object.fromEntries(equipmentStates.map((s) => [s.id, s]));

  const combinedHistory = [
    ...stateHistory.map((s) => {
      const date = new Date(s.date);
      const state = stateById[s.equipmentStateId];
      return {
        type: "state" as const,
        date,
        dateStr: date.toISOString().split("T")[0],
        hourStr: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        color: state?.color || "gray",
        text: `Estado: ${state?.name || "Desconhecido"}`,
        icon: <SyncOutlined />,
      };
    }),
    ...positionHistory.map((p, i) => {
      const date = new Date(p.date);
      return {
        type: "position" as const,
        date,
        dateStr: date.toISOString().split("T")[0],
        hourStr: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        color: "blue",
        text: `Movido para: ${p.lat}, ${p.lon}`,
        icon: <EnvironmentOutlined />,
        positionIndex: i,
      };
    }),
  ];

  const groupedByDate: Record<string, typeof combinedHistory> = {};
  combinedHistory.forEach((item) => {
    if (!groupedByDate[item.dateStr]) {
      groupedByDate[item.dateStr] = [];
    }
    groupedByDate[item.dateStr].push(item);
  });

  return groupedByDate;
}

import equipment from "@/app/assets/data/equipment.json";
import equipmentModel from "@/app/assets/data/equipmentModel.json";
import equipmentPositionHistory from "@/app/assets/data/equipmentPositionHistory.json";
import equipmentState from "@/app/assets/data/equipmentState.json";
import equipmentStateHistory from "@/app/assets/data/equipmentStateHistory.json";

function getEquipmentIds(): string[] {
  return equipment.map((item) => String(item.id));
}

function findNameById(id: string) {
  const item = equipment.find((element) => element.id === id);
  return item ? item.name : "Name not found";
}

export const findEquipmentById = (id: string) => {
  const result = equipment.find((item) => item.id === id)
  return result;
}

export const findModelById = (id: string) => {
  const model = equipmentModel.find((element) => element.id === id)
  return model?.name
}

export function findStateById(equipmentId: string) {
  const equipment = equipmentStateHistory.find(
    (item) => item.equipmentId === equipmentId
  );
  if (!equipment) {
    throw new Error(`Equipment with ID ${equipmentId} not found`);
  }
  const mostRecentState = equipment.states.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  });

  switch (mostRecentState.equipmentStateId) {
    case "0808344c-454b-4c36-89e8-d7687e692d57":
      return equipmentState[0];
    case "baff9783-84e8-4e01-874b-6fd743b875ad":
      return equipmentState[1];
    case "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f":
      return equipmentState[2];
  }

  return mostRecentState;
}

function getPositionById(equipmentId: string) {
  const equipment = equipmentPositionHistory.find(
    (item) => item.equipmentId === equipmentId
  );
  if (!equipment || !equipment.positions || equipment.positions.length === 0) {
    return null;
  }
  const latestPosition = equipment.positions.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  });

  return latestPosition;
}

export const formatDataForTable = () => {
  const ids = getEquipmentIds();

  const finalObjects = ids.map((id) => {
    const equipmentId = id;
    const name: string = findNameById(id);
    const state = findStateById(id);
    const position = getPositionById(id);

    return { equipmentId, name, state, position };
  });

  return finalObjects;
};

const getStateByStateId = (stateId: string) => {
  const status = equipmentState.find((item) => item.id === stateId);
  return status
    ? { name: status.name, color: status.color }
    : { name: "Não Disponível", color: "#D3D3D3" };
};

export const getStateHistoryAndPositionHistoryByEquipmentId = (
  equipmentId: string
) => {
  const stateHistory = equipmentStateHistory.find(
    (item) => item.equipmentId === equipmentId
  );
  const positionHistory = equipmentPositionHistory.find(
    (item) => item.equipmentId === equipmentId
  );
  const result: HistoryModalType[] = [];

  if (stateHistory && positionHistory) {
    stateHistory.states.forEach((item) => {
      const date = item.date;
      const positionWithSameDate = positionHistory.positions.find(
        (position) => position.date === date
      );
      result.push({
        equipmentId,
        date: formatDate(date),
        state: getStateByStateId(item.equipmentStateId),
        position: {
          lat: positionWithSameDate?.lat!,
          lon: positionWithSameDate?.lon!,
        },
      });
    });
  }

  return result;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const calculateTimePerState = (entries: StateHistoryEntry[]): HoursPerState[] => {
  if (entries.length < 2) return [];

  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const resultMap = sorted
    .slice(0, -1)
    .reduce<Record<string, Record<string, number>>>((acc, current, i) => {
      const next = sorted[i + 1];
      const start = new Date(current.date);
      const end = new Date(next.date);
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const day = start.toISOString().split("T")[0];

      acc[day] = acc[day] || {};
      acc[day][current.equipmentStateId] = (acc[day][current.equipmentStateId] || 0) + durationHours;

      return acc;
    }, {});

    return Object.entries(resultMap).map(([day, states]) => ({
      day,
      states: Object.entries(states).map(([equipmentStateId, hours]) => ({
        equipmentStateId,
        hours,
      })),
    }));
};

export const getIncomeDataById = (id: string) => {
  const stateHistory = equipmentStateHistory.find((item) => item.equipmentId === id);
  const timeperState = calculateTimePerState(stateHistory!.states)
  return timeperState
}

export const calculateIncome = (
  hoursInOperation: number,
  hoursInMaintainance: number,
  hoursStopped: number,
  modelId: string,
  date: string
) => {
  const model = equipmentModel.find((model) => model.id === modelId);

  const operationValue = model?.hourlyEarnings.find(
    (item) => item.equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57"
  )?.value || 0;

  const maintainanceValue = model?.hourlyEarnings.find(
    (item) => item.equipmentStateId === "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
  )?.value || 0;

  const stoppedValue = model?.hourlyEarnings.find(
    (item) => item.equipmentStateId === "baff9783-84e8-4e01-874b-6fd743b875ad"
  )?.value || 0;

  const hoursInOperationIncome = hoursInOperation * operationValue;
  const hoursInMaintainanceIncome = hoursInMaintainance * maintainanceValue;
  const hoursStoppedIncome = hoursStopped * stoppedValue;

  const incomeData = [
    {
      date,
      hoursInOperation: hoursInOperation,
      hoursInMaintainance: hoursInMaintainance,
      hoursStopped: hoursStopped,
      totalIncome:
        hoursInOperationIncome +
        hoursInMaintainanceIncome +
        hoursStoppedIncome,
    },
  ];

  return incomeData;
};  

export const formatMoneyToReal = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};



export interface State {
  id: string;
  name: string;
}

export interface HourlyEarning {
  equipmentStateId: string;
  value: number;
}

export interface Model {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}

export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: { date: string; equipmentStateId: string }[];
}

export interface DailyHours {
  Operando: number;
  Manutenção: number;
  Parado: number;
  gain: number;
}

export interface EquipmentResult {
  equipmentId: string;
  equipmentName: string;
  equipmentModelName: string;
  averageProductivityDay: number;
  averageGainDay: number;
}

function calculateHours(start: Date, end: Date): number {
  const delta = (end.getTime() - start.getTime()) / 1000;
  return delta / 3600;
}

export default async function fetchAndCalculateData(): Promise<
  EquipmentResult[]
> {
  const stateData: State[] = await fetch('/data/equipmentState.json').then(
    (res) => res.json(),
  );
  const historyData: EquipmentStateHistory[] = await fetch(
    '/data/equipmentStateHistory.json',
  ).then((res) => res.json());
  const modelData: Model[] = await fetch('/data/equipmentModel.json').then(
    (res) => res.json(),
  );
  const equipmentData: Equipment[] = await fetch('/data/equipment.json').then(
    (res) => res.json(),
  );

  const stateMap: Record<string, string> = {};
  stateData.forEach((state) => {
    stateMap[state.id] = state.name;
  });

  const modelEarningsMap: Record<string, Record<string, number>> = {};
  modelData.forEach((model) => {
    const earningsMap: Record<string, number> = {};
    model.hourlyEarnings.forEach((earning) => {
      earningsMap[earning.equipmentStateId] = earning.value;
    });
    modelEarningsMap[model.id] = earningsMap;
  });

  const equipmentModelMap: Record<string, string> = {};
  const equipmentNameMap: Record<string, string> = {};
  equipmentData.forEach((equipment) => {
    equipmentModelMap[equipment.id] = equipment.equipmentModelId;
    equipmentNameMap[equipment.id] = equipment.name;
  });

  const modelMap: Record<string, string> = {};
  modelData.forEach((model) => {
    modelMap[model.id] = model.name;
  });

  const output: EquipmentResult[] = [];

  historyData.forEach((equipment) => {
    const equipmentId = equipment.equipmentId;
    const equipmentModelId = equipmentModelMap[equipmentId];
    const equipmentName = equipmentNameMap[equipmentId];
    const states = equipment.states.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const equipmentModel = modelData.find(
      (model) => model.id === equipmentModelId,
    );
    if (!equipmentModel) {
      console.warn(
        `Modelo de equipamento não encontrado para o equipmentModelId: ${equipmentModelId}`,
      );
      return;
    }

    const earningsMap = modelEarningsMap[equipmentModel.id];
    const dailyHours: Record<string, DailyHours> = {};

    let lastStateId: string | null = null;
    let lastDate: Date | null = null;

    states.forEach((state) => {
      const currentDate = new Date(state.date);
      const currentStateId = state.equipmentStateId;

      if (lastStateId !== null && lastDate !== null) {
        while (
          lastDate.toISOString().slice(0, 10) <
          currentDate.toISOString().slice(0, 10)
        ) {
          const endOfDay = new Date(lastDate);
          endOfDay.setUTCHours(23, 59, 59, 999);
          const hours = calculateHours(lastDate, endOfDay);
          const dayKey = lastDate.toISOString().slice(0, 10);
          if (!dailyHours[dayKey])
            dailyHours[dayKey] = {
              Operando: 0,
              Manutenção: 0,
              Parado: 0,
              gain: 0,
            };
          dailyHours[dayKey][stateMap[lastStateId]] += hours;
          dailyHours[dayKey].gain += earningsMap[lastStateId] * hours;
          lastDate = new Date(endOfDay);
          lastDate.setSeconds(lastDate.getSeconds() + 1);
        }

        const hours = calculateHours(lastDate, currentDate);
        const dayKey = currentDate.toISOString().slice(0, 10);
        if (!dailyHours[dayKey])
          dailyHours[dayKey] = {
            Operando: 0,
            Manutenção: 0,
            Parado: 0,
            gain: 0,
          };
        dailyHours[dayKey][stateMap[lastStateId]] += hours;
        dailyHours[dayKey].gain += earningsMap[lastStateId] * hours;
      }

      lastStateId = currentStateId;
      lastDate = currentDate;
    });

    if (lastStateId !== null && lastDate !== null) {
      const endOfDay = new Date(lastDate);
      endOfDay.setUTCHours(23, 59, 59, 999);
      const hours = calculateHours(lastDate, endOfDay);
      const dayKey = lastDate.toISOString().slice(0, 10);
      if (!dailyHours[dayKey])
        dailyHours[dayKey] = { Operando: 0, Manutenção: 0, Parado: 0, gain: 0 };
      dailyHours[dayKey][stateMap[lastStateId]] += hours;
      dailyHours[dayKey].gain += earningsMap[lastStateId] * hours;
    }

    let totalProductivity = 0;
    let totalGain = 0;
    const totalDays = Object.keys(dailyHours).length;

    const equipmentResult: EquipmentResult = {
      equipmentId,
      equipmentName,
      equipmentModelName: modelMap[equipmentModelId],
      averageProductivityDay: 0,
      averageGainDay: 0,
    };

    if (totalDays > 0) {
      for (const [, hours] of Object.entries(dailyHours)) {
        const hoursOperated = Math.round(hours.Operando || 0);
        const totalHours = 24;
        const productivity = Math.round((hoursOperated / totalHours) * 100);
        totalProductivity += productivity;
        totalGain += hours.gain;
      }

      equipmentResult.averageProductivityDay = Math.round(
        totalProductivity / totalDays,
      );
      equipmentResult.averageGainDay = Math.round(totalGain / totalDays);
    }

    output.push(equipmentResult);
    localStorage.setItem('item', JSON.stringify(output));
  });
  return output;
}

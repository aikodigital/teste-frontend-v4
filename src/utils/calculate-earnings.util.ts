import {
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
} from "@/types/equipment.type";

export interface ICalculateEarnings {
  totalEarnings: number;
  hoursWorked: number;
  hoursMaintenance: number;
  hoursIdle: number;
  prices: {
    workingPrice: number;
    stopPrice: number;
    maintenancePrice: number;
  };
}
export async function calculateEquipmentEarnings(
  model: EquipmentModel | undefined,
  stateHistory: EquipmentStateHistory | undefined,
  equipmentStates: EquipmentState[],
): Promise<ICalculateEarnings> {
  let totalEarnings = 0;
  let hoursWorked = 0;
  let hoursMaintenance = 0;
  let hoursIdle = 0;
  let workingPrice = 0;
  let stopPrice = 0;
  let maintenancePrice = 0;

  if (
    !model ||
    !model.hourlyEarnings?.length ||
    !stateHistory ||
    !stateHistory.states?.length
  ) {
    return {
      totalEarnings,
      hoursWorked,
      hoursMaintenance,
      hoursIdle,
      prices: {
        workingPrice,
        stopPrice,
        maintenancePrice,
      },
    };
  }

  // Creates an orderly copy of the states to avoid modifying the original
  const sortedStates = [...stateHistory.states].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Itra by states calculating differences
  for (let i = 1; i < sortedStates.length; i++) {
    const prevState = sortedStates[i - 1];
    const currentState = sortedStates[i];
    const prevDate = new Date(prevState.date).getTime();
    const currentDate = new Date(currentState.date).getTime();

    // Calculates time difference in hours
    const timeDiffInHours = (currentDate - prevDate) / (1000 * 60 * 60);
    if (timeDiffInHours <= 0) continue;

    // Finds the gains associated with the previous state
    const earningsForState = model.hourlyEarnings.find(
      (earning) => earning.equipmentStateId === prevState.equipmentStateId,
    );

    if (earningsForState) {
      const stateValue = earningsForState.value;
      totalEarnings += stateValue * timeDiffInHours;

      equipmentStates.forEach((state) => {
        if (earningsForState.equipmentStateId === state.id) {
          if (state.name === "Operando") {
            hoursWorked += timeDiffInHours;
            workingPrice = earningsForState.value;
          }
          if (state.name === "Parado") {
            hoursIdle += timeDiffInHours;
            stopPrice = earningsForState.value;
          }

          if (state.name === "Manutenção") {
            hoursMaintenance += timeDiffInHours;
            maintenancePrice = earningsForState.value;
          }
        }
      });
    }
  }

  return {
    totalEarnings,
    hoursWorked,
    hoursMaintenance,
    hoursIdle,
    prices: {
      workingPrice,
      stopPrice,
      maintenancePrice,
    },
  };
}

import { EquipmentModel, EquipmentStateHistory } from "@/types/equipment.type";

export function calculateEquipmentEarnings(
  model: EquipmentModel | undefined,
  stateHistory: EquipmentStateHistory | undefined,
): {
  totalEarnings: number;
  hoursWorked: number;
  hoursMaintenance: number;
  hoursIdle: number;
} {
  let totalEarnings = 0;
  let hoursWorked = 0;
  let hoursMaintenance = 0;
  let hoursIdle = 0;

  // Verificação inicial de dados válidos
  if (
    !model ||
    !model.hourlyEarnings?.length ||
    !stateHistory ||
    !stateHistory.states?.length
  ) {
    return { totalEarnings, hoursWorked, hoursMaintenance, hoursIdle };
  }

  // Cria uma cópia ordenada dos estados para evitar modificar o original
  const sortedStates = [...stateHistory.states].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Itera pelos estados calculando diferenças
  for (let i = 1; i < sortedStates.length; i++) {
    const prevState = sortedStates[i - 1];
    const currentState = sortedStates[i];
    const prevDate = new Date(prevState.date).getTime();
    const currentDate = new Date(currentState.date).getTime();

    // Calcula a diferença de tempo em horas
    const timeDiffInHours = (currentDate - prevDate) / (1000 * 60 * 60);
    if (timeDiffInHours <= 0) continue; // Ignora diferenças inválidas

    // Encontra os ganhos associados ao estado anterior
    const earningsForState = model.hourlyEarnings.find(
      (earning) => earning.equipmentStateId === prevState.equipmentStateId,
    );

    if (earningsForState) {
      const stateValue = earningsForState.value;
      totalEarnings += stateValue * timeDiffInHours;

      // Categoriza as horas
      if (stateValue > 0) {
        hoursWorked += timeDiffInHours;
      } else if (stateValue < 0) {
        hoursMaintenance += timeDiffInHours;
      } else {
        hoursIdle += timeDiffInHours;
      }
    }
  }

  return { totalEarnings, hoursWorked, hoursMaintenance, hoursIdle };
}

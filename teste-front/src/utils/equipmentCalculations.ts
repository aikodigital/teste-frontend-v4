export function calculateProductivity(stateHistory: any[]): number {
  const totalHours = 24; // Total de horas em um dia
  let operatingHours = 0;

  stateHistory.forEach((state: any) => {
    if (state.equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57") { // Verifica se o estado é "Operando"
      const stateHours = state.hours || 0;
      console.log(`Operando por ${stateHours} horas no estado ${state.equipmentStateId}`);
      operatingHours += stateHours;
    }
  });

  const productivity = (operatingHours / totalHours) * 100;
  console.log(`Produtividade calculada: ${productivity}%`);
  return productivity;
}

export function calculateEarnings(stateHistory: any[] = [], model: any): number {
  if (!stateHistory || !Array.isArray(stateHistory) || stateHistory.length === 0 || !model.hourlyEarnings) {
    console.log('Sem histórico de estados ou modelo de ganhos por hora');
    return 0; // Retorna 0 se não houver histórico ou se os ganhos por hora não estiverem definidos
  }

  return stateHistory.reduce((total: number, state: any) => {
    // Verifica se o state.equipmentStateId existe e tenta buscar o ganho correspondente
    const earnings = Array.isArray(model.hourlyEarnings)
      ? model.hourlyEarnings.find(
          (earning: any) => earning.equipmentStateId === state.equipmentStateId
        )
      : null;

    // Se não encontrou o ganho correspondente, loga o problema
    if (!earnings) {
      console.log(`Nenhum ganho encontrado para o estado: ${state.equipmentStateId}`);
    } else {
      console.log(`Ganho encontrado: ${earnings.value} para o estado: ${state.equipmentStateId}`);
    }

    const stateHours = state.hours || 0;

    // Loga o número de horas no estado
    console.log(`Horas no estado ${state.equipmentStateId}: ${stateHours}`);

    return total + (earnings ? earnings.value * stateHours : 0);
  }, 0);
}

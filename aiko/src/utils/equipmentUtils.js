//Entrega o ultimo item da lista baseado na data
export function getLatestByDate(list) {
  if (!list || list.length === 0) return null;

  return list.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest
  );
}

//Entrega o estado atual do equipamento baseado no histórico de estados
export function getCurrentState(equipmentId, stateHistory, equipmentStateMap) {
  const history = stateHistory.find(
    (item) => item.equipmentId === equipmentId
  );

  if (!history || history.states.length === 0) return null;

  const lastState = history.states.at(-1);

  return equipmentStateMap[lastState.equipmentStateId] || null;
}

// Filtra o histórico de posições por um intervalo de datas
export function filterHistoryByDate(history, start, end) {
  if (!start && !end) return history;

  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  return history.filter((pos) => {
    const current = new Date(pos.date);

    if (startDate && current < startDate) return false;
    if (endDate && current > endDate) return false;

    return true;
  });
}

// Obtém o estado do equipamento em uma data específica
export function getStateAtDate(date, stateHistory, stateMap) {
  const target = new Date(date);

  // ordena por data crescente
  const sortedStates = [...stateHistory].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let lastState = null;

  for (const entry of sortedStates) {
    if (new Date(entry.date) <= target) {
      lastState = stateMap[entry.equipmentStateId];
    } else {
      break;
    }
  }

  return lastState;
}


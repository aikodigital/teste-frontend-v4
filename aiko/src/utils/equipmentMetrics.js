// Funções para calcular períodos de estado e produtividade de equipamentos
export function buildStatePeriods(history, stateHistory, stateMap) {
  if (!history.length || !stateHistory.length) return [];

  const periods = [];
  let current = null;

  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  for (let i = 0; i < sortedHistory.length; i++) {
    const point = sortedHistory[i];

    const stateEntry = stateHistory
      .filter((s) => new Date(s.date) <= new Date(point.date))
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (!stateEntry) continue;

    const state = stateMap[stateEntry.equipmentStateId];
    if (!state) continue;

    if (!current || current.state.id !== state.id) {
      if (current) {
        current.end = point.date;
        periods.push(current);
      }

      current = {
        state,
        start: point.date,
        end: null,
        distance: 0,
        points: [point],
      };
    } else {
      current.points.push(point);
    }
  }

  if (current) {
    current.end = current.points[current.points.length - 1].date;
    periods.push(current);
  }

  // calcular distância
  periods.forEach((p) => {
    for (let i = 1; i < p.points.length; i++) {
      const a = p.points[i - 1];
      const b = p.points[i];
      const dx = (b.lat - a.lat) * 111000;
      const dy = (b.lon - a.lon) * 111000;
      p.distance += Math.sqrt(dx * dx + dy * dy);
    }
  });

  return periods;
}

// Calcula a produtividade com base nos períodos de estado
export function calculateProductivity(periods) {
  let total = 0;
  let operating = 0;

  periods.forEach((p) => {
    const start = new Date(p.start);
    const end = new Date(p.end);
    const hours = (end - start) / 36e5;

    total += hours;
    if (p.state.name === "Operando") {
      operating += hours;
    }
  });

  return total ? ((operating / total) * 100).toFixed(1) : 0;
}

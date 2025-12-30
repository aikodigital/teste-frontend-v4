import { getStateAtDate } from "./equipmentUtils";

function toRad(value) {
  return (value * Math.PI) / 180;
}

// Fórmula de Haversine
export function calculateDistanceKm(points = []) {
  if (points.length < 2) return 0;

  let distance = 0;
  const R = 6371; // raio da Terra em km

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    const dLat = toRad(p2.lat - p1.lat);
    const dLon = toRad(p2.lon - p1.lon);

    const lat1 = toRad(p1.lat);
    const lat2 = toRad(p2.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    distance += R * c;
  }

  return distance;
}

// Constrói segmentos de linha coloridos baseados no estado do equipamento
export function buildStateSegments(history, stateHistory, stateMap) {
  if (history.length < 2) return [];

  const segments = [];
  let currentSegment = null;
  let lastKnownState = null;

  for (let i = 0; i < history.length; i++) {
    const point = history[i];

    const state =
      getStateAtDate(point.date, stateHistory, stateMap) || lastKnownState;

    if (!state) continue; // só ignora se nunca existiu estado

    lastKnownState = state;

    if (!currentSegment || currentSegment.color !== state.color) {
      if (currentSegment && currentSegment.points.length > 1) {
        segments.push(currentSegment);
      }

      currentSegment = {
        color: state.color,
        points: [[point.lat, point.lon]],
      };
    } else {
      currentSegment.points.push([point.lat, point.lon]);
    }
  }

  if (currentSegment && currentSegment.points.length > 1) {
    segments.push(currentSegment);
  }

  return segments;
}

// Obtém pontos de mudança de estado no histórico
export function getStateChangePoints(history, stateHistory, stateMap) {
  if (!history.length) return [];

  const points = [];
  let lastState = null;

  for (const point of history) {
    const state =
      getStateAtDate(point.date, stateHistory, stateMap) || lastState;

    if (!state) continue;

    if (lastState && state.id !== lastState.id) {
      points.push({
        lat: point.lat,
        lon: point.lon,
        date: point.date,
        state,
      });
    }

    lastState = state;
  }

  return points;
}

// Interpolação linear
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Densifica o histórico de posições adicionando pontos intermediários
export function densifyHistory(history, maxDistanceMeters = 200) {
  if (history.length < 2) return history;

  const dense = [];

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1];
    const curr = history[i];

    dense.push(prev);

    const dx = curr.lat - prev.lat;
    const dy = curr.lon - prev.lon;
    const distance = Math.sqrt(dx * dx + dy * dy) * 111000; // aprox metros

    if (distance > maxDistanceMeters) {
      const steps = Math.ceil(distance / maxDistanceMeters);

      for (let s = 1; s < steps; s++) {
        dense.push({
          lat: lerp(prev.lat, curr.lat, s / steps),
          lon: lerp(prev.lon, curr.lon, s / steps),
          date: new Date(
            new Date(prev.date).getTime() +
              ((new Date(curr.date) - new Date(prev.date)) * s) / steps
          ).toISOString(),
        });
      }
    }
  }

  dense.push(history[history.length - 1]);
  return dense;
}


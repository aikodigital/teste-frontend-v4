// lib/utils.ts

import { EquipmentModel } from "./types";

// check utils
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getHourlyEarningValue(model: EquipmentModel, stateId: string): number {
  const hourlyEarning = model.hourlyEarnings.find(
    earning => earning.equipmentStateId === stateId
  );
  return hourlyEarning?.value || 0;
}

export function calculateTimeDifference(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${diffHrs}h ${diffMins}m`;
}
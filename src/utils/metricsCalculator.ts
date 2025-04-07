import { ProductivityData, EarningsData } from '../types/metrics';

// Define proper types for state and position objects
interface EquipmentState {
  date: string;
  equipmentStateId: string;
}

interface EquipmentStateInfo {
  id: string;
  name: string;
}

/**
 * Calculates productivity metrics for an equipment
 */
export const calculateProductivity = (
  states: EquipmentState[], 
  operatingStateId: string, 
  selectedDate: Date
): ProductivityData => {
  // Sort states by date
  const sortedStates = [...states].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let operatingHoursCurrentDate = 0;
  let totalHoursCurrentDate = 0;
  let operatingHoursTotal = 0;
  let totalHoursTotal = 0;

  // Process each state
  for (let i = 0; i < sortedStates.length - 1; i++) {
    const currentState = sortedStates[i];
    const nextState = sortedStates[i + 1];
    
    const currentDate = new Date(currentState.date);
    const nextDate = new Date(nextState.date);
    
    // Calculate duration in hours
    const durationHours = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
    
    // Check if this period is within the range up to the selected date
    const isBeforeSelectedDate = nextDate <= selectedDate;
    
    // Accumulate for the entire period
    totalHoursTotal += durationHours;
    
    if (currentState.equipmentStateId === operatingStateId) {
      operatingHoursTotal += durationHours;
    }
    
    // If before selected date, accumulate for calculations up to current date
    if (isBeforeSelectedDate) {
      totalHoursCurrentDate += durationHours;
      
      if (currentState.equipmentStateId === operatingStateId) {
        operatingHoursCurrentDate += durationHours;
      }
    }
  }
  
  // Calculate productivity percentages
  const productivityCurrentDate = totalHoursCurrentDate > 0 
    ? (operatingHoursCurrentDate / totalHoursCurrentDate) * 100 
    : 0;
    
  const productivityTotal = totalHoursTotal > 0 
    ? (operatingHoursTotal / totalHoursTotal) * 100 
    : 0;

  return {
    currentDate: {
      percentage: productivityCurrentDate,
      operatingHours: operatingHoursCurrentDate,
      totalHours: totalHoursCurrentDate
    },
    totalPeriod: {
      percentage: productivityTotal,
      operatingHours: operatingHoursTotal,
      totalHours: totalHoursTotal
    }
  };
};

/**
 * Calculates earnings metrics for an equipment
 */
export const calculateEarnings = (
  states: EquipmentState[], 
  hourlyRates: Record<string, number>,
  equipmentStates: EquipmentStateInfo[],
  selectedDate: Date
): EarningsData => {
  // Sort states by date
  const sortedStates = [...states].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let earningsCurrentDate = 0;
  let earningsTotal = 0;
  let operatingEarnings = 0;
  let stoppedEarnings = 0;
  let maintenanceEarnings = 0;

  // Process each state
  for (let i = 0; i < sortedStates.length - 1; i++) {
    const currentState = sortedStates[i];
    const nextState = sortedStates[i + 1];
    
    const currentDate = new Date(currentState.date);
    const nextDate = new Date(nextState.date);
    
    // Calculate duration in hours
    const durationHours = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
    
    // Check if this period is within the range up to the selected date
    const isBeforeSelectedDate = nextDate <= selectedDate;
    
    // Calculate earnings for this state
    const hourlyRate = hourlyRates[currentState.equipmentStateId] || 0;
    const stateEarnings = hourlyRate * durationHours;
    
    // Accumulate total earnings
    earningsTotal += stateEarnings;
    
    // Accumulate earnings by state type
    const stateName = equipmentStates.find(s => s.id === currentState.equipmentStateId)?.name;
    if (stateName === "Operando") {
      operatingEarnings += stateEarnings;
    } else if (stateName === "Parado") {
      stoppedEarnings += stateEarnings;
    } else if (stateName === "Manutenção") {
      maintenanceEarnings += stateEarnings;
    }
    
    // If before selected date, accumulate for calculations up to current date
    if (isBeforeSelectedDate) {
      earningsCurrentDate += stateEarnings;
    }
  }

  return {
    currentDate: earningsCurrentDate,
    totalPeriod: earningsTotal,
    breakdown: {
      operating: operatingEarnings,
      stopped: stoppedEarnings,
      maintenance: maintenanceEarnings
    }
  };
};
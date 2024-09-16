export const calculateProductivity = (stateHistory) => {
    const totalHours = 24;
    const operatingHours = stateHistory.reduce((acc, state) => {
      if (state.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57') {
        return acc + 1;
      }
      return acc;
    }, 0);
  
    return (operatingHours / totalHours) * 100;
  };
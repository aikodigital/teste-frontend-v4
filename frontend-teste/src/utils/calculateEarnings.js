export const calculateEarnings = (stateHistory, model) => {
    return stateHistory.reduce((total, state) => {
      const earning = model.hourlyEarnings.find(
        (e) => e.equipmentStateId === state.equipmentStateId
      );
      return total + (earning ? earning.value : 0);
    }, 0);
  };
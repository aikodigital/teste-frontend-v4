import getData from "./getDataFromFile";

const getStateData = async function (stateHistoryFile) {
  const stateHistory = await getData(stateHistoryFile);
  const equipmentStates = await getData('/src/data/equipmentState.json');

  const statesData = stateHistory.map((history) => {
    const states = history.states.sort((a, b) => { return new Date(b.date) - new Date(a.date)});

    const formattedStates = states.map((state) => {
      const equipmentState = equipmentStates.find((stateInfo) => stateInfo.id === state.equipmentStateId);

      return (
        {
          dateTime: state.date,
          name: equipmentState.name,
          color: equipmentState.color,
        }
      )
    })

    return (
      { 
        equipmentId: history.equipmentId,
        lastState: formattedStates[0],
        stateHistory: formattedStates,
      }
    )
  });

  return statesData;
}

export default getStateData;
import equipmentState from '../data/equipmentState.json'

export function createStateDictionary() {
  return equipmentState.reduce((acc, state) => {
    acc[state.id] = { name: state.name, color: state.color }
    return acc
  }, {})
}

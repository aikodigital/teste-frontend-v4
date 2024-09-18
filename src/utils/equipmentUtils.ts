interface EquipmentState {
  id: string
  name: string
  color: string
}

// Função utilitária para obter os detalhes do estado com base no ID
export const getStateDetailsById = (states: EquipmentState[], id: string) => {
  const state = states.find((s) => s.id === id)
  return state
    ? { name: state.name, color: state.color }
    : { name: 'Desconhecido', color: '#000' }
}

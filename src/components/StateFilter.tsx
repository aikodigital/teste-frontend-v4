import { EquipmentState } from './types'

interface StateFilterProps {
  states: EquipmentState[]
  selectedState: string | null
  onStateChange: (state: string | null) => void
}

export function StateFilter({ states, selectedState, onStateChange }: StateFilterProps) {
  return (
    <select
      value={selectedState || ''}
      onChange={(e) => onStateChange(e.target.value || null)}
      className="border rounded p-2"
    >
      <option value="">Todos os Estados</option>
      {states.map((state) => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ))}
    </select>
  )
}
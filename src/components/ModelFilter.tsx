import { EquipmentModel } from './types'

interface ModelFilterProps {
  models: EquipmentModel[]
  selectedModel: string | null
  onModelChange: (model: string | null) => void
}

export function ModelFilter({ models, selectedModel, onModelChange }: ModelFilterProps) {
  return (
    <select
      value={selectedModel || ''}
      onChange={(e) => onModelChange(e.target.value || null)}
      className="border rounded p-2"
    >
      <option value="">Todos os Modelos</option>
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  )
}
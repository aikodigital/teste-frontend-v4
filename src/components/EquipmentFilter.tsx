interface EquipmentFilterProps {
  states: { id: string; name: string }[];
  models: { id: string; name: string }[];
  onStateChange: (stateId: string | null) => void;
  onModelChange: (modelId: string | null) => void;
}

export default function EquipmentFilter({ states, models, onStateChange, onModelChange }: EquipmentFilterProps) {
  return (
    <div className="mb-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Filtrar por Estado:</label>
        <select
          className="px-4 py-2 mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => onStateChange(e.target.value || null)}
        >
          <option value="">Todos os Estados</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>{state.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Filtrar por Modelo:</label>
        <select
          className="px-4 py-2 mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => onModelChange(e.target.value || null)}
        >
          <option value="">Todos os Modelos</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))}
        </select>
      </div>
    </div>
  )

}
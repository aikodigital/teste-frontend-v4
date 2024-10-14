'use client'

import { useModel } from '@/store/useStore'

import { equipmentModel } from '@/data/equipmentModel'

export const ModelSelect = () => {
  const { selectedModel, setSelectedModel } = useModel()

  return (
    <div className="flex flex-col justify-center">
      <label>Selecione o Modelo:</label>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="border-double border-4 border-primary   bg-bglightsecundary dark:bg-bgdarksecundary h-9 flex items-center rounded-md focus:ring-0 outline-none "
      >
        <option value="all">Todos</option>
        {equipmentModel.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}

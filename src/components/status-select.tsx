'use client'

import { useModel } from '@/store/useStore'
import { equipmentState } from '@/data/equipmentState'

export const StatusSelect = () => {
  const { selectedStatus, setSelectedStatus } = useModel()

  return (
    <div className="flex flex-col justify-center">
      <label>Selecione o estado:</label>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="border-double border-4 border-primary   bg-bglightsecundary dark:bg-bgdarksecundary h-9 flex items-center rounded-md focus:ring-0 outline-none "
      >
        <option value="all">Todos</option>
        {equipmentState.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  )
}

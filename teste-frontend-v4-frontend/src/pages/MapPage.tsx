import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFullEquipments } from '@hooks/useFullEquipments'

import { useEquipmentModels } from '@query/useEquipmentModels'
import { useEquipmentStates } from '@query/useEquipmentState'

import Map from '@components/MainMap/Map'

const MapPage = () => {
  const navigate = useNavigate()

  const [filterName, setFilterName] = useState('')
  const [filterModel, setFilterModel] = useState('')
  const [filterState, setFilterState] = useState('')

  const { isLoading, data: equipments } = useFullEquipments(
    filterName,
    filterModel,
    filterState
  )
  const { isLoading: isLoadingModels, data: equipmentModels } =
    useEquipmentModels()
  const { isLoading: isLoadingStates, data: equipmentStates } =
    useEquipmentStates()

  if (isLoading || isLoadingModels || isLoadingStates || !equipments) {
    return <div>carregando</div>
  }

  const handleNavigateToEquipment = (id: string) => {
    navigate(`equipment/${id}`)
  }

  const handleResetFilter = () => {
    setFilterName('')
    setFilterModel('')
    setFilterState('')
  }

  return (
    <main className="h-full w-full flex flex-col gap-4 p-4 md:p-12 md:py-6 bg-blue-500 overflow-auto">
      <header>
        <h1 className="text-3xl font-bold text-white">Aiko Control</h1>
      </header>

      <div className="flex flex-wrap gap-2 p-4 bg-white rounded-xl shadow-md items-center">
        <input
          placeholder="Pesquisar Nome"
          value={filterName}
          onChange={(e) => setFilterName(e.currentTarget.value)}
          className="h-8 p-2 py-1 text-sm text-gray-700 border-[1px] border-gray-300 rounded-md outline-blue-500 outline-[1px]"
        />
        <span className="text-sm text-gray-700">Modelo:</span>
        <select
          value={filterModel}
          onChange={(e) => setFilterModel(e.currentTarget.value)}
          className="h-8 p-2 py-1 text-sm text-gray-700 border-[1px] border-gray-300 rounded-md"
        >
          <option value="">Todos</option>
          {equipmentModels?.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">Estado:</span>
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.currentTarget.value)}
          className="h-8 p-2 py-1 text-sm text-gray-700 border-[1px] border-gray-300 rounded-md"
        >
          <option value="">Todos</option>
          {equipmentStates?.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleResetFilter}
          className="h-8 px-4 py-1 bg-blue-500 text-white rounded-md transition-all active:bg-blue-300"
        >
          limpar filtro
        </button>
      </div>

      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
        <Map
          equipments={equipments}
          onSeeMoreClick={handleNavigateToEquipment}
        />
      </div>
    </main>
  )
}

export default MapPage

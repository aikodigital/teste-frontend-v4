import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFullEquipments } from '@hooks/useFullEquipments'

import { useEquipmentModels } from '@query/useEquipmentModels'
import { useEquipmentStates } from '@query/useEquipmentState'

import Map from '@components/MainMap/Map'

const MapPage = () => {
  const navigate = useNavigate()

  const [filterModel, setFilterModel] = useState('')
  const [filterState, setFilterState] = useState('')

  const { isLoading, data: equipments } = useFullEquipments(
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

  const handleChangeFilterModel = (v: string) => setFilterModel(v)
  const handleChangeFilterState = (v: string) => setFilterState(v)
  const handleResetFilter = () => {
    handleChangeFilterModel('')
    handleChangeFilterState('')
  }

  return (
    <main className="h-full w-full flex flex-col gap-4 p-12 py-6 bg-blue-500 overflow-auto">
      <header>
        <h1 className="text-3xl font-bold text-white">Aiko Control</h1>
      </header>

      <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md">
        <input placeholder="Pesquisar" />
        modelo
        <select
          value={filterModel}
          onChange={(e) => handleChangeFilterModel(e.currentTarget.value)}
        >
          <option value="">Todos</option>
          {equipmentModels?.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        estado
        <select
          value={filterState}
          onChange={(e) => handleChangeFilterState(e.currentTarget.value)}
        >
          <option value="">Todos</option>
          {equipmentStates?.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <span onClick={handleResetFilter}>limpar filtro</span>
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

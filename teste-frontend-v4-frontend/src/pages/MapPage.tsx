import { useNavigate } from 'react-router-dom'

import { useFullEquipments } from '@hooks/useFullEquipments'

import { useEquipmentModels } from '@query/useEquipmentModels'
import { useEquipmentStates } from '@query/useEquipmentState'

import Map from '@components/MainMap/Map'

const MapPage = () => {
  const navigate = useNavigate()

  const { isLoading, data: equipments } = useFullEquipments()
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

  return (
    <main className="h-full w-full flex flex-col gap-4 p-12 bg-gray-50 overflow-auto">
      <header>
        <h1 className="text-3xl font-bold">Aiko Control</h1>
      </header>

      <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md">
        <input placeholder="Pesquisar" />
        modelo
        <select defaultValue="">
          <option disabled>Todos</option>
          {equipmentModels?.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        estado
        <select defaultValue="">
          <option disabled>Todos</option>
          {equipmentStates?.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
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

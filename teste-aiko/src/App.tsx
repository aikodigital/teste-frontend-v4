import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { EquipmentModel } from './types/equipment'
import EquipmentStateHistory from './components/EquipmentStateHistory'
import Map from './components/Map'

function App() {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null)
  const [equipmentModels, setEquipmentModels] = useState<Record<string, EquipmentModel>>({})

  const equipmentList = useAppSelector(state => state.equipmentList.data)

  useEffect(() => {
    fetch('/data/equipmentModel.json')
      .then(res => res.json())
      .then((data: EquipmentModel[]) => {
        const modelsById = data.reduce((acc, model) => {
          acc[model.id] = model
          return acc
        }, {} as Record<string, EquipmentModel>)
        setEquipmentModels(modelsById)
      })
      .catch(err => console.error('Erro ao carregar models:', err))
  }, [])

  const showHistory = (id: string) => setSelectedEquipmentId(id)
  const clearSelection = () => setSelectedEquipmentId(null)

  const selectedInfo = selectedEquipmentId ? equipmentList[selectedEquipmentId] : null

  const selectedModelName = selectedInfo
    ? equipmentModels[selectedInfo.equipmentModelId]?.name || ''
    : ''

  return (
    <div className="bg-slate-300 grid grid-rows-[auto_1fr] h-screen">
      <nav className="text-blue-950 p-4 font-extralight flex items-center">
        <img src="/img/aiko.png" alt="Logo" className="h-10 w-auto mx-2" />
        <span>| Gestão de Equipamentos</span>
      </nav>
      <div className="grid grid-cols-2 grid-rows-1 p-4 mx-5 mb-5 mt-1 bg-white rounded-2xl">
        <div className="flex items-center justify-center max-w-full overflow-hidden">
          {selectedEquipmentId && selectedInfo ? (
            <EquipmentStateHistory
              equipmentId={selectedEquipmentId}
              clearItem={clearSelection}
              equipmentName={selectedInfo.name}
              model={selectedModelName}
            />
          ) : (
            <div className="text-gray-500 italic">
              Selecione um Equipamento no mapa para ver o histórico.
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Map
            onShowHistory={showHistory}
            selectedEquipmentId={selectedEquipmentId}
          />
        </div>
      </div>
    </div>
  )
}

export default App

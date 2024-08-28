import Map from './components/Map'
import { useEquipments } from './hooks/useEquipments'

function App() {
  const { isLoading, data: equipments } = useEquipments()

  if (isLoading || !equipments || equipments.length <= 0) {
    return <div>carregando</div>
  }

  console.log('equipment', equipments)

  return (
    <main className="h-full w-full flex flex-col gap-4 p-12 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold">teste-frontend-v4</h1>
      </header>

      <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md">
        <input placeholder="Pesquisar" />
        <select>
          <option disabled>Modelo</option>
          <option>1</option>
          <option>2</option>
        </select>
        <select>
          <option disabled>Estado</option>
          <option>1</option>
          <option>2</option>
        </select>
      </div>

      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
        <Map equipments={equipments} />
      </div>
    </main>
  )
}

export default App

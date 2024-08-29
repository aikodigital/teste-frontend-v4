import { MapContainer } from '../components/MapContainer'
import { useEquipmentInfo } from '../hooks/useEquipmentInfo'
import './Home.css'

export function Home() {
  const { info, setDateFilter, setStatusFilter, setModelFilter } = useEquipmentInfo()

  return (
    <div className='Home'>
      <h1>Aiko Equipment Viewer</h1>

      <div className='filters'>
        <div>
          <label htmlFor='statusFilter'>Status:</label>
          <select id='statusFilter' onChange={(e) => setStatusFilter(e.target.value)}>
            <option value=''>Todos</option>
            <option value='Operando'>Operando</option>
            <option value='Parado'>Parado</option>
            <option value='Manutenção'>Manutenção</option>
          </select>
        </div>

        <div>
          <label htmlFor='modelFilter'>Modelo:</label>
          <select id='modelFilter' onChange={(e) => setModelFilter(e.target.value)}>
            <option value=''>Todos</option>
            <option value='Caminhão de carga'>Caminhão de carga</option>
            <option value='Harvester'>Harvester</option>
            <option value='Garra traçadora'>Garra traçadora</option>
          </select>
        </div>

        <div>
          <label htmlFor='dateFilter'>Data:</label>
          <input type='date' id='dateFilter' onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <MapContainer equipmentInfo={info} />
    </div>
  )
}


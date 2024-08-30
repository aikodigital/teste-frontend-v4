import { useParams } from 'react-router-dom'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import equipment from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import { useEffect, useState, useMemo } from 'react'
import { fetchCities } from '../utils/fetchCities'
import './StateHistory.css'

function createStateDictionary() {
  return equipmentState.reduce((acc, state) => {
    acc[state.id] = { name: state.name, color: state.color }
    return acc
  }, {})
}

function findEquipment(equipmentId) {
  return equipment.find(({ id }) => id === equipmentId)
}

function findEquipmentModel(equipmentId) {
  const selectedEquipment = findEquipment(equipmentId)
  return equipmentModel.find(({ id }) => id === selectedEquipment.equipmentModelId)
}

export function StateHistory() {
  const { id } = useParams()
  const [stateHistory, setStateHistory] = useState([])
  const [stateDictionary, setStateDictionary] = useState({})
  const [equipmentName, setEquipmentName] = useState('')
  const [equipmentModelName, setEquipmentModelName] = useState('')
  const [cities, setCities] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = useMemo(() => {
    return stateHistory.slice(indexOfFirstItem, indexOfLastItem)
  }, [stateHistory, indexOfFirstItem, indexOfLastItem])

  const totalPages = useMemo(() => Math.ceil(stateHistory.length / itemsPerPage), [stateHistory])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    setStateDictionary(createStateDictionary())
  }, [])

  useEffect(() => {
    const selectedEquipment = equipmentStateHistory.find(
      (equipment) => equipment.equipmentId === id,
    )

    if (selectedEquipment) {
      const equipamento = findEquipment(id)
      setEquipmentName(equipamento?.name || 'Desconhecido')
      const orderStatesByDate = selectedEquipment.states.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      )
      setStateHistory(orderStatesByDate || [])
      const equipmentDetail = findEquipmentModel(id)
      setEquipmentModelName(equipmentDetail?.name || 'Desconhecido')
    } else {
      setStateHistory([])
    }
  }, [id])

  useEffect(() => {
    async function updateCities() {
      const updatedCities = await fetchCities(currentItems, id)
      setCities(updatedCities)
    }

    updateCities()
  }, [currentItems, id])

  return (
    <div>
      <h1>Histórico de Status da Máquina: {equipmentName}</h1>
      <table>
        <thead>
          <tr>
            <th>Nome do Modelo</th>
            <th>Data/Hora</th>
            <th>Status</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((state) => {
            const status = stateDictionary[state.equipmentStateId] || {
              name: 'Desconhecido',
              color: '#ffffff',
            }
            return (
              <tr key={state.date} style={{ backgroundColor: status.color }}>
                <td>{equipmentModelName}</td>
                <td>{new Date(state.date).toLocaleString()}</td>
                <td>{status.name}</td>
                <td>{cities[state.date] || 'Cidade Desconhecida'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

import { useParams } from 'react-router-dom'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import equipment from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import { useEffect, useState, useMemo } from 'react'
import { fetchCities } from '../utils/fetchCities'

import s from './StateHistory.module.css'
import { Pagination } from '../components/Pagination'

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
  const itemsPerPage = 10

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
    <div className={s.stateHistory}>
      <div className={s.container}>
        <h2 className={s.title}>Histórico de Status da Máquina: {equipmentName}</h2>
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
                color: 'var(--white)',
              }
              return (
                <tr key={state.date}>
                  <td>{equipmentModelName}</td>
                  <td>{new Date(state.date).toLocaleString()}</td>
                  <td>
                    <span style={{ backgroundColor: status.color }}>
                      {status.name.toUpperCase()}
                    </span>
                  </td>
                  <td>{cities[state.date] || 'Cidade Desconhecida'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

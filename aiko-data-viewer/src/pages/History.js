import React, { useEffect, useState, useMemo, useRef } from 'react'
import { createStateDictionary } from '../utils/createStateDictionary'
import { filterEquipmentHistory } from '../utils/filterEquipmentHistory'
import { findEquipment, findEquipmentModel } from '../utils/findEquipmentDetails'
import { updateCities } from '../utils/updateCities'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import { Filters } from '../components/Filters'
import { EquipmentTable } from '../components/EquipmentTable'
import { Pagination } from '../components/Pagination'

import s from './History.module.css'

export function History() {
  const [allStateHistory, setAllStateHistory] = useState([])
  const [stateDictionary, setStateDictionary] = useState({})
  const [cities, setCities] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    name: '',
    model: '',
    status: '',
  })
  const itemsPerPage = 10

  const previousCitiesRef = useRef(cities)

  useEffect(() => {
    setStateDictionary(createStateDictionary())

    const mergedHistory = equipmentStateHistory.flatMap((history) => {
      const equipmentInfo = findEquipment(history.equipmentId)
      const modelInfo = findEquipmentModel(history.equipmentId)
      return history.states.map((state) => ({
        ...state,
        equipmentId: history.equipmentId,
        equipmentName: equipmentInfo?.name || 'Desconhecido',
        equipmentModelName: modelInfo?.name || 'Desconhecido',
      }))
    })
    setAllStateHistory(mergedHistory)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const filteredItems = useMemo(() => {
    return filterEquipmentHistory(allStateHistory, filters, stateDictionary)
  }, [allStateHistory, filters, stateDictionary])

  const orderByDate = filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date))

  const currentItems = useMemo(() => {
    return orderByDate.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }, [orderByDate, currentPage])

  const totalPages = useMemo(() => Math.ceil(filteredItems.length / itemsPerPage), [filteredItems])

  useEffect(() => {
    async function fetchUpdatedCities() {
      await updateCities(currentItems, setCities, previousCitiesRef)
    }
    fetchUpdatedCities()
  }, [currentItems])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, pageNumber)))
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value }

      if (name === 'dateStart' && prevFilters.dateEnd === '') {
        newFilters.dateEnd = value
      }

      return newFilters
    })
  }

  return (
    <div className={s.history}>
      <div className={s.container}>
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
        <EquipmentTable
          currentItems={currentItems}
          stateDictionary={stateDictionary}
          cities={cities}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

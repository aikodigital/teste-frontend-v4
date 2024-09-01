import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

import s from './EquipmentTable.module.css'

export function EquipmentTable({ currentItems, stateDictionary, cities }) {
  const navigate = useNavigate()

  function handleClick(id) {
    navigate(generatePath(ROUTES.DETAILS, { id }))
  }

  return (
    <div className={s.container}>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr>
            <th>Nome do Equipamento</th>
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
              <tr
                key={`${state.equipmentId}-${state.date}`}
                className={s.row}
                onClick={() => handleClick(state.equipmentId)}
              >
                <td>{state.equipmentName}</td>
                <td>{state.equipmentModelName}</td>
                <td>{new Date(state.date).toLocaleString()}</td>
                <td>
                  <span style={{ backgroundColor: status.color }}>{status.name.toUpperCase()}</span>
                </td>
                <td className={s.city}>{cities[state.date] || 'Cidade Desconhecida'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

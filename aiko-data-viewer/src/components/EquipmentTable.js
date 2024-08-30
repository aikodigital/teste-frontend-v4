import React from 'react'

export function EquipmentTable({ currentItems, stateDictionary, cities }) {
  return (
    <table>
      <thead>
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
            color: '#ffffff',
          }
          return (
            <tr key={state.date} style={{ backgroundColor: status.color }}>
              <td>{state.equipmentName}</td>
              <td>{state.equipmentModelName}</td>
              <td>{new Date(state.date).toLocaleString()}</td>
              <td>{status.name}</td>
              <td>{cities[state.date] || 'Cidade Desconhecida'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

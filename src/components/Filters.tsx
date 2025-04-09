import { ChangeEvent, useState } from 'react'
import { FiltersState } from '../App'
import '../styles/filters.css'

type Props = {
  models: string[]
  states: string[]
  names: string[]
  filters: FiltersState
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
  show: boolean
  visibleRoutes?: Record<string, boolean>
  setVisibleRoutes?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  startDate: string
  endDate: string
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
}

export function Filters({
  models,
  states,
  filters,
  names,
  setFilters,
  show,
  visibleRoutes,
  setVisibleRoutes,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: Props) {
  const [focused, setFocused] = useState(false)

  if (!show) return null

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const highlightMatch = (name: string) => {
    const input = filters.name.toLowerCase()
    const index = name.toLowerCase().indexOf(input)
    if (index === -1) return name

    return (
      <>
        {name.slice(0, index)}
        <strong>{name.slice(index, index + input.length)}</strong>
        {name.slice(index + input.length)}
      </>
    )
  }

  const filteredSuggestions = filters.name.length > 0
    ? names.filter(n => n.toLowerCase().includes(filters.name.toLowerCase()))
    : []

  return (
    <div className="filters-container">
      <label>
        Modelo:&nbsp;
        <select
          name="model"
          value={filters.model}
          onChange={handleChange}
          title="Filtra os equipamentos pelo modelo"
        >
          <option value="Todos">Todos</option>
          {models.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </label>

      <label>
        Estado:&nbsp;
        <select
          name="state"
          value={filters.state}
          onChange={handleChange}
          title="Filtra os equipamentos pelo estado atual"
        >
          <option value="Todos">Todos</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </label>

      <label className="name-input-wrapper">
        Nome:&nbsp;
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="ex: GT-2003"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          title="Pesquise pelo nome do equipamento (ex: GT-2003)"
        />
        {focused && filteredSuggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {filteredSuggestions.map(name => (
              <li
                key={name}
                className="suggestion-item"
                onMouseDown={() =>
                  setFilters(prev => ({ ...prev, name }))
                }
              >
                {highlightMatch(name)}
              </li>
            ))}
          </ul>
        )}
      </label>

      <label>
        Início:&nbsp;
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          title="Data inicial para filtrar posições"
        />
      </label>

      <label>
        Fim:&nbsp;
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          title="Data final para filtrar posições"
        />
      </label>

      {visibleRoutes && setVisibleRoutes && (
        <label>
          Mostrar rotas:&nbsp;
          <select
            onChange={(e) => {
              const name = e.target.value
              if (name && visibleRoutes[name] !== undefined) {
                setVisibleRoutes(prev => ({ ...prev, [name]: !prev[name] }))
              }
            }}
            value=""
            title="Selecione um equipamento para mostrar ou ocultar sua rota"
          >
            <option value="" disabled>
              {Object.keys(visibleRoutes).length > 0
                ? 'Selecione uma rota'
                : 'Nenhuma rota no período'}
            </option>
            {Object.entries(visibleRoutes).map(([name, checked]) => (
              <option key={name} value={name}>
                {checked ? 'Ocultar' : 'Mostrar'} - {name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  )
}

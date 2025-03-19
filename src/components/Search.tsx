import { useState, ChangeEvent } from 'react'

interface SearchProps {
  onSearch: (query: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('')

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value
    setQuery(newQuery)
    onSearch(newQuery)
  }

  return (
    <input
      type="text"
      placeholder="Pesquisar equipamento"
      value={query}
      onChange={handleInputChange}
      className="border rounded p-2"
    />
  )
}
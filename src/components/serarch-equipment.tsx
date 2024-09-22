'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export const SearchEquipment = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() === '') {
      return
    }

    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="search-container">
      <form
        onSubmit={handleSearch}
        className="flex  items-center md:gap-3 rounded-full dark:bg-bgdarksecundary bg-bglightsecundary  my-2  p-1 shadow shadow-gray-500 dark:shadow-none dark:border-[1px] dark:border-zinc-800 w-[100%]"
      >
        <input
          type="text"
          id="search"
          placeholder="Buscar equipamento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" w-full bg-transparent text-sm outline-none placeholder:text-zinc-500 focus:ring-0 border-none rounded-full px-1"
        />
        <Search onClick={handleSearch} />
      </form>
    </div>
  )
}

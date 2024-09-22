import { equipment } from '@/data/equipment'
import Link from 'next/link'
import {
  getEquipmentLatestState,
  getEquipmentModel,
} from '@/data/get/equipment-utils'
import caminhao from '../../../public/caminhao.png'
import garra from '../../../public/garra.webp'
import harvester from '../../../public/harvester.png'
import Image from 'next/image'

interface SearchProps {
  searchParams?: {
    q?: string
  }
}

export default function SearchResults({ searchParams }: SearchProps) {
  // Se searchParams ou q não existirem, query será uma string vazia
  const { q: query = '' } = searchParams || {}

  // Verificação para evitar erro ao usar .toLowerCase()
  const filteredEquipment = equipment.filter((eq) =>
    eq.name?.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="pt-[120px] min-h-screen flex flex-col items-center">
      <h1>Resultados de busca para: {query}</h1>

      {filteredEquipment.length > 0 ? (
        <ul className="py-5 w-full flex flex-wrap justify-center gap-5 items-center">
          {filteredEquipment.map((eq) => {
            const model = getEquipmentModel(eq.id)
            const state =
              getEquipmentLatestState(eq.id)?.name || 'Estado não encontrado'

            return (
              <li key={eq.id} className="w-[40%] max-w-[300px]">
                {model === 'Harvester' && (
                  <Image src={harvester} height={500} width={500} alt="" />
                )}
                {model === 'Garra traçadora' && (
                  <Image src={garra} height={500} width={500} alt="" />
                )}
                {model === 'Caminhão de carga' && (
                  <Image src={caminhao} height={500} width={500} alt="" />
                )}

                <div className="flex flex-col items-center">
                  <p>Nome: {eq.name}</p>
                  <p>Modelo: {model}</p>
                  <p>Estado: {state}</p>
                  <Link
                    href={`/equipments/${eq.id}`}
                    className="p-2 px-4 bg-primary text-black font-bold rounded-md mt-2"
                  >
                    Detalhes
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>Nenhum equipamento encontrado para {query}.</p>
      )}
    </div>
  )
}

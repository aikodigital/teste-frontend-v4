'use client'

import { useSearchParams } from 'next/navigation'
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
import { Suspense } from 'react'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  const filteredEquipment = equipment.filter((eq) =>
    eq.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="pt-[120px] min-h-screen flex flex-col items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Resultados de busca para: {query}</h1>

        {filteredEquipment.length > 0 ? (
          <ul className="py-5 w-full flex flex-wrap justify-center gap-5 items-center">
            {filteredEquipment.map((eq) => (
              <li key={eq.id} className="w-[40%] max-w-[300px]">
                {getEquipmentModel(eq.id) === 'Harvester' && (
                  <Image src={harvester} height={500} width={500} alt="" />
                )}
                {getEquipmentModel(eq.id) === 'Garra traçadora' && (
                  <Image src={garra} height={500} width={500} alt="" />
                )}
                {getEquipmentModel(eq.id) === 'Caminhão de carga' && (
                  <Image src={caminhao} height={500} width={500} alt="" />
                )}

                <div className="flex flex-col items-center">
                  <p>Nome: {eq.name}</p>
                  <p>Modelo: {getEquipmentModel(eq.id)}</p>
                  <p>
                    Estado:{' '}
                    {getEquipmentLatestState(eq.id)?.name ||
                      'Estado não encontrado'}
                  </p>
                  <Link
                    href={`/equipments/${eq.id}`}
                    className=" p-2 px-4 bg-primary text-black font-bold rounded-md mt-2"
                  >
                    Detalhes
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum equipamento encontrado para {query}.</p>
        )}
      </Suspense>
    </div>
  )
}

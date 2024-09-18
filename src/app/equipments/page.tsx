'use client'
import { equipment } from '@/data/equipment'
import {
  getEquipmentModel,
  getEquipmentLatestState,
  getEquipmentName,
} from '@/data/get/equipment-utils'
import Link from 'next/link'
import Image from 'next/image'
import caminhao from '../../../public/caminhao.png'
import garra from '../../../public/garra.webp'
import harvester from '../../../public/harvester.png'
import { ModelSelect } from '@/components/model-selected'
import { StatusSelect } from '@/components/status-select'
import { useMemo } from 'react'
import { useModel } from '@/store/useStore'
import { equipmentPositionsHistory } from '@/data/equipmentPositionHistory'

export default function PageEquipments() {
  const { selectedModel, selectedStatus } = useModel()

  const filteredEquipmentPositionsHistory = useMemo(() => {
    const filteredEquipments =
      selectedModel === 'all'
        ? equipment
        : equipment.filter((eq) => eq.equipmentModelId === selectedModel)

    const equipmentWithStatus = filteredEquipments.filter((eq) => {
      const latestState = getEquipmentLatestState(eq.id)
      if (!latestState) return false
      return selectedStatus === 'all' || latestState.id === selectedStatus
    })

    return equipmentPositionsHistory.filter((position) =>
      equipmentWithStatus.some((eq) => eq.id === position.equipmentId),
    )
  }, [selectedModel, selectedStatus])

  return (
    <div className="pt-[100px]">
      <div className="flex flex-col justify-between items-center px-2 py-5">
        <h1 className="text-2xl  md:text-4xl ">Equipamentos</h1>{' '}
        <h2 className="md:text-xl">Todos os nossos equipamentos</h2>
      </div>
      <div className="flex self-center justify-around md:justify-center py-5 w-full md:gap-5 flex-wrap  ">
        <ModelSelect />
        <StatusSelect />
      </div>
      <ul className="py-5 w-full flex flex-wrap justify-center gap-5 items-center">
        {filteredEquipmentPositionsHistory.length > 0 ? (
          <>
            {filteredEquipmentPositionsHistory.map((eq) => (
              <li key={eq.equipmentId} className="w-[40%] max-w-[300px]">
                {getEquipmentModel(eq.equipmentId) === 'Harvester' && (
                  <Image src={harvester} height={500} width={500} alt="" />
                )}
                {getEquipmentModel(eq.equipmentId) === 'Garra traçadora' && (
                  <Image src={garra} height={500} width={500} alt="" />
                )}
                {getEquipmentModel(eq.equipmentId) === 'Caminhão de carga' && (
                  <Image src={caminhao} height={500} width={500} alt="" />
                )}

                <div className="flex flex-col items-center">
                  <p>{getEquipmentName(eq.equipmentId)}</p>
                  <p> {getEquipmentModel(eq.equipmentId)}</p>
                  <p>
                    {' '}
                    {getEquipmentLatestState(eq.equipmentId)?.name ||
                      'Estado não encontrado'}
                  </p>
                  <Link
                    href={`/equipments/${eq.equipmentId}`}
                    className=" p-2 px-4 bg-primary text-black font-bold rounded-md mt-2"
                  >
                    Detalhes
                  </Link>
                </div>
              </li>
            ))}
          </>
        ) : (
          <p>Nenhum encontrado</p>
        )}
      </ul>
    </div>
  )
}

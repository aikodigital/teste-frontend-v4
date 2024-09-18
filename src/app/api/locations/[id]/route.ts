import { NextResponse } from 'next/server'
import { z } from 'zod'

import dataLocation from '../../../../../data/equipmentPositionHistory.json'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Validação do ID
  const id = z.string().nullish().parse(params.id)

  // Encontrando o equipamento com base no id
  const findLocationEquipments = dataLocation.find(equipment => {
    return equipment.equipmentId === id
  })

  // Verificando se o equipamento foi encontrado
  if (!findLocationEquipments) {
    return NextResponse.json({ message: 'Product not found.' }, { status: 400 })
  }

  // Retornando o equipamento encontrado
  return NextResponse.json(findLocationEquipments)
}

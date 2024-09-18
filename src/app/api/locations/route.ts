import { NextResponse } from 'next/server'

import dataEquipment from '../../../../data/equipment.json'
import dataLocation from '../../../../data/equipmentPositionHistory.json'

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Encontrando o equipamento com base no id
  const findLocationEquipments = dataLocation.map(equipment => {
    const equipmentsLocations =
      equipment.positions[equipment.positions.length - 1]

    const name = dataEquipment.filter(
      equipmentData => equipmentData.id === equipment.equipmentId
    )

    return {
      location: equipmentsLocations,
      nameEquipment: name.map(e => e.name)
    }
  })

  // Verificando se o equipamento foi encontrado
  if (!findLocationEquipments) {
    return NextResponse.json({ message: 'Product not found.' }, { status: 400 })
  }

  // Retornando o equipamento encontrado
  return NextResponse.json(findLocationEquipments)
}

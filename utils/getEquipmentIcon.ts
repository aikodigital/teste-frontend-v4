export function getEquipmentIcon(equipmentModel: string) {
  const equipmentIcons = {
    'Caminhão de carga': 'mdi:truck',
    'Harvester': 'mdi:excavator',
    'Garra traçadora': 'game-icons:claws',
  } as Record<string, string>

  return equipmentIcons[equipmentModel]
}

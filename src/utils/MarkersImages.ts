const imageToMap: Record<string, string> = {
  Harvester: 'harvester.svg',
  'Garra traçadora': 'tracer-claw.svg',
  'Caminhão de carga': 'truck.svg'
}

export function modelToImage(model: string): string | undefined {
  return imageToMap[model]
}

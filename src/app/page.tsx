import { ModelSelect } from '@/components/model-selected'

import { StatusSelect } from '@/components/status-select'
import CarouselEquipments from '@/components/carousel-equipment'
import ContainerMap from '@/components/container-map'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center py-24 ">
      <div className="flex self-center justify-around md:justify-center py-5 w-full md:gap-5 flex-wrap  ">
        <ModelSelect />
        <StatusSelect />
      </div>

      <ContainerMap />
      <CarouselEquipments />
    </div>
  )
}

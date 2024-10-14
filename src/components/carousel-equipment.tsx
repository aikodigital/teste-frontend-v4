'use client'

import { Plus } from 'lucide-react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { equipment } from '@/data/equipment'
import Link from 'next/link'
import Image from 'next/image'
import caminhao from '../../public/caminhao.png'
import garra from '../../public/garra.webp'
import harvester from '../../public/harvester.png'

import {
  getEquipmentName,
  getEquipmentModel,
  getEquipmentLatestState,
} from '@/data/get/equipment-utils'

export default function CarouselEquipments() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }
  return (
    <div className="w-[80vw] lg:w-[65vw] pt-10">
      <div className="flex flex-col justify-between items-center px-2 py-5">
        <h1 className="text-2xl  md:text-4xl ">Equipamentos</h1>{' '}
        <h2 className="md:text-xl">Todos os nossos equipamentos</h2>
      </div>
      <Link
        href={'/equipments'}
        className="flex justify-end gap-2 hover:text-primary  text-lg items-center"
      >
        Ver todos <Plus size={32} />{' '}
      </Link>

      <Slider {...settings}>
        {equipment.map((item) => {
          return (
            <div
              key={item.id}
              className="h-[400px] md:h-[400px] my-2 lg:my-4  max-w-[300px] overflow-hidden"
            >
              {getEquipmentModel(item.id) === 'Harvester' && (
                <Image
                  src={harvester}
                  height={300}
                  width={300}
                  alt=""
                  className="h-[70%]"
                />
              )}
              {getEquipmentModel(item.id) === 'Garra traçadora' && (
                <Image
                  src={garra}
                  height={300}
                  width={300}
                  alt=""
                  className="h-[70%]"
                />
              )}
              {getEquipmentModel(item.id) === 'Caminhão de carga' && (
                <Image
                  src={caminhao}
                  height={300}
                  width={300}
                  alt=""
                  className="h-[70%]"
                />
              )}
              <div className="flex flex-col flex-1 justify-center items-center">
                <p>{getEquipmentName(item.id)}</p>{' '}
                <p>{getEquipmentModel(item.id)}</p>
                <p>
                  Estado:{' '}
                  {getEquipmentLatestState(item.id)?.name ||
                    'Estado não encontrado'}
                </p>
                <Link
                  href={`/equipments/${item.id}`}
                  className="p-1 text-black font-bold rounded-md bg-primary mt-2"
                >
                  Detalhes{' '}
                </Link>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

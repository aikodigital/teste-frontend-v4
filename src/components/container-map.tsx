'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function ContainerMap() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/highlight'), {
        loading: () => <p>Um mapa está carregando</p>,
        ssr: false,
      }),
    [],
  )
  return <Map />
}

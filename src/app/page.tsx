'use client'

import Image from 'next/image'
import { Typography, Box } from '@mui/material'

import FilterBar from '@/components/FilterBar'
import EquipmentMap from '@/components/EquipmentMap'
import EquipmentList from '@/components/EquipmentList'
import { EquipmentProvider } from '@/contexts/EquipmentContext'

export default function Home() {
  return (
    <EquipmentProvider>
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <Box
          sx={{
            gap: '1rem',
            width: '40vw',
            maxWidth: '800px',
            overflow: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingY: '1.5rem',
            }}
          >
            <Image
              src="/img/aiko.png"
              alt="Aiko Logo"
              width={182}
              height={90.3}
            />
            <Typography
              sx={{ fontSize: '2rem', fontWeight: 600, color: '#1E201E' }}
            >
              Lista de Equipamentos
            </Typography>
          </Box>
          <FilterBar />
          <EquipmentList />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <EquipmentMap />
        </Box>
      </Box>
    </EquipmentProvider>
  )
}

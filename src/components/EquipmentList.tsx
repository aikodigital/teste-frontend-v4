import { Box, Divider, List, Typography } from '@mui/material'

import EquipmentCard from './EquipmentCard'
import { useEquipment } from '@/contexts/EquipmentContext'

const EquipmentList: React.FC = () => {
  const { filteredEquipment } = useEquipment()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '1rem 0',
          borderRadius: '1rem',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#EBEBEB',
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Equipamento</Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ height: '1rem' }}
        />
        <Typography sx={{ fontWeight: 600 }}>Modelo</Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ height: '1rem' }}
        />
        <Typography sx={{ fontWeight: 600 }}>Status</Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ height: '1rem' }}
        />
        <Typography sx={{ fontWeight: 600 }}>Ação</Typography>
      </Box>
      {filteredEquipment.length > 0 ? (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          {filteredEquipment.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} />
          ))}
        </List>
      ) : (
        <>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
              Nenhum equipamento encontrado
            </Typography>
          </Box>
        </>
      )}
    </>
  )
}

export default EquipmentList

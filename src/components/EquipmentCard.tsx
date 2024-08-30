import {
  Box,
  Chip,
  Button,
  ListItem,
  Typography,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'

import { Equipment } from '@/types'
import { useEquipment } from '@/contexts/EquipmentContext'

interface EquipmentCardProps {
  equipment: Equipment
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const { models, states, lastStates, stateColors } = useEquipment()
  const lastState = lastStates.get(equipment.id)
  const stateColor = lastState ? stateColors.get(lastState) : undefined

  return (
    <ListItem sx={{ borderRadius: '1rem', border: '1px solid #EBEBEB' }}>
      <ListItemText
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'left', width: '23%' }}>
              <Typography
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#1E201E',
                }}
              >
                {equipment.name}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'left', width: '32%' }}>
              <Typography>{models.get(equipment.equipmentModelId)}</Typography>
            </Box>

            <Box sx={{ textAlign: 'left', width: '25%' }}>
              <Chip
                label={states.get(lastState || '')}
                sx={{
                  color: '#FFFFFF',
                  backgroundColor: stateColor || 'gray',
                }}
              />
            </Box>

            <Link href={`/equipments/details/${equipment.id}`} passHref>
              <Button
                sx={{
                  color: '#FFFFFF',
                  padding: '11px 30px',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  backgroundColor: '#003380',
                  '&:hover': {
                    backgroundColor: '#002060',
                  },
                }}
              >
                Ver mais
              </Button>
            </Link>
          </Box>
        }
      />
    </ListItem>
  )
}

export default EquipmentCard

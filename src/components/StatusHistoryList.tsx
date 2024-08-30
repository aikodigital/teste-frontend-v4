import { Box, Chip, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { EquipmentStateHistory } from '@/types'
import { useEquipment } from '@/contexts/EquipmentContext'

interface StatusHistoryListProps {
  states: EquipmentStateHistory['states']
  stateMap: Map<string, string>
}

const StatusHistoryList: React.FC<StatusHistoryListProps> = ({
  states,
  stateMap,
}) => {
  const { stateColors } = useEquipment()

  return (
    <Box>
      <Typography
        sx={{
          marginBottom: '1rem',
          fontSize: '1.4rem',
          fontWeight: 600,
          color: '#1E201E',
        }}
      >
        Histórico de Status
      </Typography>
      {states.map((state, index) => {
        const stateColor = stateColors.get(state.equipmentStateId)
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              marginTop: '.5rem',
              borderRadius: '1rem',
              border: '1px solid #EBEBEB',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Typography sx={{ fontWeight: 600 }}>Horário:</Typography>
              <Typography>
                {`${new Date(state.date).toLocaleTimeString('pt-BR', {
                  timeZone: 'America/Sao_Paulo',
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Typography>
              <AccessTimeIcon />
            </Box>
            <Chip
              label={stateMap.get(state.equipmentStateId) || 'Unknown'}
              sx={{
                color: '#FFFFFF',
                backgroundColor: stateColor || 'gray',
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default StatusHistoryList

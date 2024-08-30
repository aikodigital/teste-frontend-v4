import { Box, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { EquipmentPositionHistory } from '@/types'

interface PositionHistoryListProps {
  positions: EquipmentPositionHistory['positions']
}

const PositionHistoryList: React.FC<PositionHistoryListProps> = ({
  positions,
}) => {
  return (
    <Box>
      <Typography
        sx={{
          marginTop: '2rem',
          marginBottom: '1rem',
          fontSize: '1.4rem',
          fontWeight: 600,
          color: '#1E201E',
        }}
      >
        Histórico de Posições
      </Typography>
      {positions.map((position, index) => (
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
              {`${new Date(position.date).toLocaleTimeString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
              })}`}
            </Typography>
            <AccessTimeIcon />
          </Box>
          <Box>
            <Box
              sx={{
                gap: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Latitude: </Typography>
              <Typography>{`${position.lat.toFixed(6)}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Typography sx={{ fontWeight: 600 }}>Longitute: </Typography>
              <Typography>{`${position.lon.toFixed(6)}`}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default PositionHistoryList

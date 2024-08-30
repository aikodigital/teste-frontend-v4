import { Box, Typography } from '@mui/material'
import InsightsIcon from '@mui/icons-material/Insights'

interface DailyProductivitySummaryProps {
  earnings: number
  productivity: number
}

const DailyProductivitySummary: React.FC<DailyProductivitySummaryProps> = ({
  earnings,
  productivity,
}) => {
  return (
    <Box sx={{ padding: '0 2rem', background: '#F5F5F5' }}>
      <Box
        sx={{
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #EBEBEB',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: '1rem', fontWeight: 600, color: '#758694' }}
            >
              GANHOS TOTAIS
            </Typography>
            <Typography
              sx={{ fontSize: '2rem', fontWeight: 600, color: '#1E201E' }}
            >
              R$ {earnings.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '.6rem .8rem .4rem .8rem',
              borderRadius: '.5rem',
              border: '1px solid #EBEBEB',
              backgroundColor: '#e8e8e8',
            }}
          >
            <InsightsIcon />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '.4rem' }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: productivity > 0 ? '#2ecc71' : '#e74c3c',
            }}
          >
            {productivity.toFixed(2)}%
          </Typography>
          <Typography
            sx={{ fontSize: '.8rem', fontWeight: 600, color: '#758694' }}
          >
            de Produtividade
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default DailyProductivitySummary

import { Box, Button, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface DateNavigationProps {
  currentDate: string
  onPreviousDay: () => void
  onNextDay: () => void
  isPreviousDisabled: boolean
  isNextDisabled: boolean
}

const DateNavigation: React.FC<DateNavigationProps> = ({
  currentDate,
  onPreviousDay,
  onNextDay,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const weekday = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
    }).format(date)
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)

    // Capitalize the first letter of the weekday
    const capitalizedWeekday =
      weekday.charAt(0).toUpperCase() + weekday.slice(1)

    return `${capitalizedWeekday}, ${formattedDate}`
  }

  return (
    <Box
      sx={{
        gap: '2rem',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
      }}
    >
      <Box sx={{ display: 'flex', gap: '.5rem' }}>
        <Button
          onClick={onPreviousDay}
          disabled={isPreviousDisabled}
          sx={{
            color: '#1E201E',
            padding: '.5rem 1rem .5rem 1.5rem',
            background: '#EBEBEB',
            borderRadius: '.5rem',
          }}
        >
          <ArrowBackIosIcon />
        </Button>
        <Button
          onClick={onNextDay}
          disabled={isNextDisabled}
          sx={{
            color: '#1E201E',
            padding: '.5rem 1rem',
            background: '#EBEBEB',
            borderRadius: '.5rem',
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Box>
      <Typography sx={{ fontSize: '1.4rem', color: '#1E201E' }}>
        {formatDate(currentDate)}
      </Typography>
    </Box>
  )
}

export default DateNavigation

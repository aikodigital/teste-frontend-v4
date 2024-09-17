import { TextField } from '@mui/material'
import './style.scss'
import { InputSelectDarkProps } from './types'

export default function InputTextDark({
  placeholder,
  onValueChange
}: InputSelectDarkProps) {
  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    onValueChange(value)
  }

  return (
    <TextField
      className="input-text-dark"
      label={placeholder}
      onChange={handleValueChange}
      sx={{
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#2f2f2f'
        },
        '& .MuiInputLabel-root:not(.Mui-focused):not(.MuiInputLabel-shrink)': {
          top: -5
        }
      }}
    />
  )
}

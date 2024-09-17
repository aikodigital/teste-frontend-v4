import { useState } from 'react'
import Select from '@mui/material/Select'
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { InputSelectDarkProps } from './types'
import './style.scss'

export default function InputSelectDark({
  placeholder,
  selected,
  list,
  onValueChange
}: InputSelectDarkProps) {
  const [valueSelected, setValueSelected] = useState<string>(selected)

  function handleValueChange(event: SelectChangeEvent<string>) {
    const value = event.target.value
    setValueSelected(value)
    onValueChange(value)
  }

  return (
    <FormControl fullWidth className="input-select-dark">
      <InputLabel
        sx={{
          '&.MuiInputLabel-root:not(.Mui-focused):not(.MuiInputLabel-shrink)': {
            top: -5
          }
        }}
      >
        {placeholder}
      </InputLabel>
      <Select
        value={valueSelected}
        label={placeholder}
        onChange={handleValueChange}
        sx={{
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2f2f2f'
          }
        }}
      >
        {list.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

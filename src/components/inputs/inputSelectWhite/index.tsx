import { useState } from 'react'
import Select from '@mui/material/Select'
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { InputSelectWhiteProps } from './types'
import './style.scss'

export default function InputSelectWhite({
  placeholder,
  selected,
  list,
  onValueChange
}: InputSelectWhiteProps) {
  const [valueSelected, setValueSelected] = useState<string>(selected)

  function handleValueChange(event: SelectChangeEvent<string>) {
    const value = event.target.value
    setValueSelected(value)
    onValueChange(value)
  }

  return (
    <FormControl fullWidth className="input-select">
      <InputLabel>{placeholder}</InputLabel>
      <Select
        value={valueSelected}
        label={placeholder}
        onChange={handleValueChange}
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

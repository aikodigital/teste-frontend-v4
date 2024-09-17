import Button from '@mui/material/Button'
import { IButtonProps } from './types'
import './style.scss'

export default function ButtonContained({ label, onClick }: IButtonProps) {
  return (
    <Button className="button-contained" variant="contained" onClick={onClick}>
      {label}
    </Button>
  )
}

import './style.scss'
import List from './list'
import { Container } from '@mui/material'

export default function Equipment() {
  return (
    <Container maxWidth="xl" className="equipment">
      <List />
    </Container>
  )
}

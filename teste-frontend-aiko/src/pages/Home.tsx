import LocateMachines from '../components/LocateMachines/LocateMachines'
import NavBar from '../components/Navbar/Navbar'
import * as S from './styles'
import { Typography } from '@mui/material'

export const Home = () => {
  return (
    <S.Container>
      <NavBar />
      <S.Title>
        <Typography variant='h4'>Bem-vindo ao teste da Aiko!</Typography> 
        <LocateMachines />
      </S.Title>
    </S.Container>
  )
}

export default Home

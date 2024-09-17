import './assets/styles/global.scss'
import { Routes, Route } from 'react-router-dom'
import Equipment from './pages/equipment/index'
import LeftMenu from './components/leftMenu/index'
import { Box } from '@mui/material'

function App() {
  return (
    <Box className="global">
      <LeftMenu />
      <Routes>
        <Route path="/" element={<Equipment />} />
      </Routes>
    </Box>
  )
}

export default App

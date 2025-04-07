import { useEffect, useState } from 'react'
import { EquipmentFullData } from './interface/types'
import { getFullEquipmentData } from './services/equipament'
import { EquipmentTable } from './components/Table/equipamentTable'


function App() {
  const [data, setData] = useState<EquipmentFullData[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFullEquipmentData()
        setData(result)
      } catch (error) {
        console.error("Erro ao carregar equipamentos:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <EquipmentTable data={data} />
    </>
  )
}

export default App

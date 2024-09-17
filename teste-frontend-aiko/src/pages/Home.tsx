import { useEffect, useState } from "react"
import HistoryMachine from "../components/HistoryMachine"
import LocateMachines from "../components/LocateMachines"
import NavBar from "../components/Navbar"
import SearchMachine from "../components/SearchMachine/index."
import * as S from "./styles"
import { Typography } from "@mui/material"

interface EquipmentModel {
  id: string
  name: string
}

interface Equipment {
  id: string
  name: string
  equipmentModelId: string
}

export const Home = () => {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null
  )
  const [options, setOptions] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    Promise.all([
      fetch("/data/equipmentModel.json").then((response) => response.json()),
      fetch("/data/equipment.json").then((response) => response.json()),
    ]).then(([modelData, equipmentData]) => {
      const modelMap = modelData.reduce(
        (acc: Record<string, string>, model: EquipmentModel) => {
          acc[model.id] = model.name
          return acc
        },
        {}
      )

      const options = equipmentData.map((equipment: Equipment) => ({
        id: equipment.id,
        name: `${equipment.name} (${
          modelMap[equipment.equipmentModelId] || "Modelo Desconhecido"
        })`,
      }))
      setOptions(options)
    })
  }, [])

  const handleMachineSelect = (machineId: string) => {
    setSelectedMachineId(machineId)
  }

  return (
    <S.Container>
      <NavBar />
      <S.Title>
        <Typography variant="h4">Bem-vindo(a) Avaliador(a) :D</Typography>
        <Typography variant="h6">
          Procure suas máquinas aqui e consulte o histórico.
        </Typography>
        <S.SearchMachine>
          <SearchMachine option={options} onSelect={handleMachineSelect} />
        </S.SearchMachine>
      </S.Title>
      <S.Content>
        <S.LargerMap>
          <LocateMachines machineId={selectedMachineId} />
        </S.LargerMap>
        <S.SmallerHistory>
          <HistoryMachine selectedMachineId={selectedMachineId} />
        </S.SmallerHistory>
      </S.Content>
    </S.Container>
  )
}

export default Home
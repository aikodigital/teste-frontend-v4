import React, { useEffect, useState } from "react"
import * as S from "./styles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import FilterState from "./components/FilterState"

interface HistoryMachineProps {
  selectedMachineId: string | null
}

interface EquipmentState {
  date: string
  equipmentStateId: string
}

interface StateMapEntry {
  name: string
  color: string
}

interface EquipmentHistory {
  equipmentId: string
  states: EquipmentState[]
}

export const HistoryMachine = ({ selectedMachineId }: HistoryMachineProps) => {
  const [selectedMachineHistory, setSelectedMachineHistory] = useState<EquipmentState[]>([])
  const [stateMap, setStateMap] = useState<Record<string, StateMapEntry>>({})
  const [filteredHistory, setFilteredHistory] = useState<EquipmentState[]>([])
  const [selectedState, setSelectedState] = useState<string>('') 
  const [selectedTime, setSelectedTime] = useState<number | ''>('') 

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    if (selectedMachineId) {
      fetch("/data/equipmentStateHistory.json")
        .then((response) => response.json())
        .then((stateHistoryData: EquipmentHistory[]) => {
          const selectedHistory = stateHistoryData.find((equipment) => {
            return equipment.equipmentId === selectedMachineId
          })

          if (selectedHistory && Array.isArray(selectedHistory.states)) {
            setSelectedMachineHistory(selectedHistory.states)
            setFilteredHistory(selectedHistory.states) 
          } else {
            setSelectedMachineHistory([])
            setFilteredHistory([])
          }
        })
    } else {
      setSelectedMachineHistory([])
      setFilteredHistory([])
    }
  }, [selectedMachineId])

  useEffect(() => {
    fetch("/data/equipmentState.json")
      .then((response) => response.json())
      .then((stateData: Array<{ id: string, name: string, color: string }>) => {
        const stateMap = stateData.reduce(
          (acc: Record<string, StateMapEntry>, state) => {
            acc[state.id] = { name: state.name, color: state.color }
            return acc
          },
          {}
        )
        setStateMap(stateMap)
      })
  }, [])

  useEffect(() => {
    let filtered = selectedMachineHistory

    if (selectedState) {
      filtered = filtered.filter(
        (state) => stateMap[state.equipmentStateId]?.name === selectedState
      )
    }

    if (selectedTime) {
      filtered = filtered.filter((state) => {
        const stateDate = new Date(state.date)
        const now = new Date()
        
        const hoursDifference = Math.abs(now.getTime() - stateDate.getTime()) / 36e5
        return hoursDifference <= selectedTime
      })
    }

    setFilteredHistory(filtered)
  }, [selectedState, selectedTime, selectedMachineHistory, stateMap])

  const handleStateChange = (state: string) => {
    setSelectedState(state)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const currentData = filteredHistory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <S.Container>
      <S.Filters>
        <FilterState onStateChange={handleStateChange} />
      </S.Filters>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((state, index) => {
              const date = new Date(state.date);
              return (
                <TableRow key={index}>
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                  <TableCell>{date.toLocaleTimeString()}</TableCell>
                  <TableCell>
                    <span style={{ color: stateMap[state.equipmentStateId]?.color || "black" }}>
                      {stateMap[state.equipmentStateId]?.name || "Estado Desconhecido"}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Nenhum histórico encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredHistory.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
      />
    </S.Container>
  )
}

export default HistoryMachine;

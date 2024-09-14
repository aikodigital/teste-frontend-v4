import React, { useEffect, useState } from "react";
import * as S from "./styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchMachine from "../SearchMachine/index.";

interface HistoryMachineProps {
  selectedMachineId: string | null;
}

export const HistoryMachine = ({ selectedMachineId }: HistoryMachineProps) => {
  const [selectedMachineHistory, setSelectedMachineHistory] = useState<any[]>([]);
  const [stateMap, setStateMap] = useState<Record<string, { name: string; color: string }>>({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (selectedMachineId) {
      fetch("/data/equipmentStateHistory.json")
        .then((response) => response.json())
        .then((stateHistoryData) => {
          const selectedHistory = stateHistoryData.find((equipment: any) => {
            return equipment.equipmentId === selectedMachineId;
          });

          if (selectedHistory) {
            if (Array.isArray(selectedHistory.states)) {
              setSelectedMachineHistory(selectedHistory.states);
            } else {
              setSelectedMachineHistory([]);
            }
          } else {
            setSelectedMachineHistory([]);
          }
        });
    } else {
      setSelectedMachineHistory([]);
    }
  }, [selectedMachineId]);

  useEffect(() => {
    fetch("/data/equipmentState.json")
      .then((response) => response.json())
      .then((stateData) => {
        const stateMap = stateData.reduce(
          (acc: Record<string, { name: string; color: string }>, state: any) => {
            acc[state.id] = { name: state.name, color: state.color };
            return acc;
          },
          {}
        );
        setStateMap(stateMap);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = selectedMachineHistory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <S.Container>
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
        count={selectedMachineHistory.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
      />
    </S.Container>
  );
};

export default HistoryMachine;

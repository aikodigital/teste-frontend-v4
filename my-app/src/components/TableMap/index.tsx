'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { equipamentState } from '@/mocks/equipamentState';
import styles from './TableMap.module.css';

interface Column {
  id: 'name' | 'status' | 'date' | 'value' | 'productivity';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
}

const columns: readonly Column[] = [
  { id: 'status', label: 'Status', minWidth: 80 },
  { id: 'date', label: 'Data', minWidth: 80 },
  { id: 'value', label: 'Valor', minWidth: 80, align: 'left' },
  { id: 'productivity', label: 'Produtividade', minWidth: 80, align: 'left' },
];

interface Data {
  status: string;
  date: string;
  value: number;
  productivity: string;
}

type TableMapProps = {
  data: {
    result: Data[];
    overallResult: {
      value: number;
      productivity: string;
    };
  };
};

export default function TableMap({ data }: TableMapProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getProductivityColor = (productivity: string) => {
    const value = parseFloat(productivity);
    if (value >= 75) return '#4caf50'; // Green for high productivity
    if (value >= 50) return '#ffeb3b'; // Yellow for medium productivity
    return '#f44336'; // Red for low productivity
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, indice) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={indice}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'status' ? (
                            <Tooltip title={value}>
                              <span className={styles.status} style={{ color: equipamentState.find(state => state.name === value)?.color }}>
                                {value}
                              </span>
                            </Tooltip>
                          ) : column.id === 'value' ? (
                            <Tooltip title={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value as number)}>
                              <span>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value as number)}
                              </span>
                            </Tooltip>
                          ) : column.id === 'date' ? (
                            <Tooltip title={new Date(value as string).toLocaleDateString('pt-BR')}>
                              <span>
                                {new Date(value as string).toLocaleDateString('pt-BR')}
                              </span>
                            </Tooltip>
                          ) : column.id === 'productivity' ? (
                            <Tooltip title={value}>
                              <Box
                                sx={{
                                  display: 'inline-block',
                                  padding: '4px 8px',
                                  backgroundColor: getProductivityColor(value as string),
                                  borderRadius: '4px',
                                  width: '100px',
                                  textAlign: 'center',
                                  color: '#fff',
                                }}
                              >
                                {value}
                              </Box>
                            </Tooltip>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        labelRowsPerPage="Itens por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        component="div"
        count={data.result.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
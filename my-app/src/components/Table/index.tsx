'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styles from './Table.module.css';
import { Compass } from 'phosphor-react';

interface Column {
  id: 'name' | 'equipament' | 'status' | 'date' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 80 },
  { id: 'equipament', label: 'Equipamento', minWidth: 80 },
  {
    id: 'status',
    label: 'Estado atual',
    minWidth: 96,
    align: 'left',
  },
  {
    id: 'date',
    label: 'Ultima atualização',
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'actions',
    label: 'Ações',
    minWidth: 80,
    align: 'left',
  },
];

interface Data {
  id: string;
  name: string;
  equipament: string;
  status: string;
  date: string;
  actions: string;
}

interface StickyHeadTableProps {
  data: Data[];
}

function TablePaginationActions(props: any) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: '2.5rem' }}>
      <Tooltip title="Primeira página">
        <span>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="primeira página"
            className={page === 0 ? styles.disabledButton : ''}
          >
            <FirstPage />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Página anterior">
        <span>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="página anterior"
            className={page === 0 ? styles.disabledButton : ''}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Próxima página">
        <span>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="próxima página"
            className={page >= Math.ceil(count / rowsPerPage) - 1 ? styles.disabledButton : ''}
          >
            <KeyboardArrowRight />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Última página">
        <span>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="última página"
            className={page >= Math.ceil(count / rowsPerPage) - 1 ? styles.disabledButton : ''}
          >
            <LastPage />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

export default function StickyHeadTable({ data }: StickyHeadTableProps) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActionClick = (id: string) => {
    router.push(`/map/${id}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '2rem' }}>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ zIndex: 0 }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, background: '#002868', color: '#fff' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'actions' ? (
                            <Tooltip title="Ver no mapa">
                              <button
                                className={styles['button-action']}
                                onClick={() => handleActionClick(row.id)}
                              >
                                <Compass />
                              </button>
                            </Tooltip>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
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
        rowsPerPageOptions={[8, 16, 24]}
        labelRowsPerPage="Itens por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}
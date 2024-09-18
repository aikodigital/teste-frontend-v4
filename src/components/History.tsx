import React, { useState } from 'react';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  TableSortLabel,
  Chip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { format } from 'date-fns';
import { EquipmentStateHistory } from '../types/interfaces';
import { fetchEquipmentHistory } from '../redux/equipmentSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const History: React.FC<{ history: EquipmentStateHistory }> = ({ history }) => {
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState<'date' | 'equipmentId'>('date');
  const rowsPerPage = 8;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  const handleSortRequest = (property: 'date') => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const totalPages = history.states
    ? Math.ceil(history.states.length / rowsPerPage)
    : 0;

  const sortedData = history.states
    ? [...history.states].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
      })
    : [];

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleCloseHistory = () => {
    dispatch(fetchEquipmentHistory());
  };

  return (
    <Grid spacing={2} className="w-[35rem] flex-col ">
      <Grid item xs={12} className="flex items-center justify-between p-4">
        <Typography variant="subtitle1" gutterBottom className="text-white">
          Equipment History
        </Typography>
        <CloseIcon
          className="cursor-pointer text-white hover:text-red-500"
          onClick={handleCloseHistory}
        />
      </Grid>
      <Grid>
        <TableContainer className="bg-white rounded-md shadow-md">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-left font-medium px-4 py-2 border-b border-gray-200">
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? orderDirection : 'desc'}
                    onClick={() => handleSortRequest('date')}
                  >
                    Data
                  </TableSortLabel>
                </TableCell>
                <TableCell className="text-left font-medium px-4 py-2 border-b border-gray-200">
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, i) => (
                <TableRow key={`${history.equipmentId}+${i}`}>
                  <TableCell className="text-left px-4 py-2 border-b border-gray-200">
                    {format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss')}
                  </TableCell>
                  <TableCell className="text-left px-4 py-2 border-b border-gray-200">
                    <Chip
                      label={item.name}
                      variant="outlined"
                      className="mt-2"
                      style={{
                        backgroundColor: `${item.color}`,
                        color: '#FFF',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} className="flex justify-center py-4 bg-white">
        <Pagination
          className="bg-white"
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default History;

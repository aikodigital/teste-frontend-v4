import { Link } from 'react-router-dom';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { IEquipmentDetail } from '../interfaces/equipment';

interface IEquipementTable {
  equipmentTableValues: IEquipmentDetail[];
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-tertiary)',
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 700,
  },
}));

function EquipmentTable({ equipmentTableValues }: IEquipementTable) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Equipamento</StyledTableCell>
            <StyledTableCell align="center">Modelo</StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell>
            <StyledTableCell align="center">Última atualização</StyledTableCell>
            <StyledTableCell align="center">Mapa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipmentTableValues.map((row: IEquipmentDetail) => {
            const lastPosition = row?.positionHistory?.positions[row?.positionHistory.positions.length - 1];
            return (
              <TableRow key={row.id}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.model?.name}</StyledTableCell>
                <StyledTableCell align="center">{row.state?.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {lastPosition ? new Date(lastPosition?.date).toLocaleDateString('pt-BR') : ''}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`./equipmentdetail/${row.id}`}>
                    <MapIcon className="text-secondary hover:text-quaternary" />
                  </Link>
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EquipmentTable;

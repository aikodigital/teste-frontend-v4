import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import EquipmentDetailsModal from '../equipament-details/EquipamentDetailsModal';
import { styled, useTheme } from "@mui/material/styles";

import { IEquipment } from "../../models/Equipment";
import { useMediaQuery } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EquipmentTable = ({ equipments }: { equipments: IEquipment[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ currentEquipment, setCurrentEquipment ] = useState<IEquipment | null>(null);



  const openEquipamentDetailsModal = (equipment: IEquipment) => {
    setCurrentEquipment(equipment);
    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEquipment(null);

  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: isMobile ? "100%" : 650,
          maxWidth: 950,
          tableLayout: "fixed",
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell
              align={isMobile ? "center" : "left"}
              sx={{ fontWeight: "bold" }}
            >
              Id
            </StyledTableCell>
            <StyledTableCell
              align={isMobile ? "center" : "right"}
              sx={{ fontWeight: "bold" }}
            >
              Nome
            </StyledTableCell>
            <StyledTableCell
              align={isMobile ? "center" : "right"}
              sx={{ fontWeight: "bold" }}
            >
              Model Id
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment) => (
            <StyledTableRow
              onClick={()=> openEquipamentDetailsModal(equipment)}
              key={equipment.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0, cursor: 'pointer' } }}
            >
              <StyledTableCell component="th" scope="row">
                {equipment.id}
              </StyledTableCell>
              <StyledTableCell align="right">{equipment.name}</StyledTableCell>
              <StyledTableCell align="right">
                {equipment.equipmentModelId}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {currentEquipment &&
        <EquipmentDetailsModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          equipment={currentEquipment}
        />}
    </TableContainer>
  );
};

export default EquipmentTable;

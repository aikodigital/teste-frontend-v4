import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { IEquipment } from '../../models/Equipment';



const EquipmentTable = ({ equipments }: { equipments: IEquipment[] }) => {

  return (

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Model Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipments.map((equipment) => (
              <TableRow
                key={equipment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {equipment.id}
                </TableCell>
                <TableCell align="right">{equipment.name}</TableCell>
                <TableCell align="right">{equipment.equipmentModelId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}



export default EquipmentTable;

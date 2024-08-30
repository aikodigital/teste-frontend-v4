import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { IEquipment } from '../../models/Equipment';
import EquipmentDetailsModal from '../equipament-details/EquipamentDetailsModal';



const EquipmentTable = ({ equipments }: { equipments: IEquipment[] }) => {

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
      <>
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
                  onClick={()=> openEquipamentDetailsModal(equipment)}
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

       {currentEquipment &&
        <EquipmentDetailsModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          equipment={currentEquipment}
        />}
      </>
  );
}



export default EquipmentTable;

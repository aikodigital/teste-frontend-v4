import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const EquipmentList = ({ equipments, onEquipmentClick }) => {
  return (
    <List>
      {equipments.map((equipment) => (
        <ListItem
          button
          key={equipment.id}
          onClick={() => onEquipmentClick(equipment)}
          className="equipment-list-item"
        >
          <ListItemText primary={equipment.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default EquipmentList;

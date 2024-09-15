import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface StateHistoryModalProps {
  open: boolean;
  onClose: () => void;
  equipmentName: string;
  stateHistory: Array<{
    date: string;
    stateName: string;
    stateColor: string;
  }>;
}

const StateHistoryModal: React.FC<StateHistoryModalProps> = ({
  open,
  onClose,
  equipmentName,
  stateHistory,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{`Histórico de Estados - ${equipmentName}`}</DialogTitle>
      <DialogContent>
        <List>
          {stateHistory.map((state, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography>
                    <span style={{ color: state.stateColor }}>
                      {state.stateName}
                    </span>
                  </Typography>
                }
                secondary={new Date(state.date).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default StateHistoryModal;

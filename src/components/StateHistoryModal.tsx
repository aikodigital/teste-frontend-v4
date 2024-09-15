import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
}));

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ borderRadius: 5 }}>
      <StyledDialogTitle>
        {`Histórico de Dados - ${equipmentName}`}
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <List>
          {stateHistory.map((state, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography>
                    <span style={{ color: state.stateColor }}>{state.stateName}</span>
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

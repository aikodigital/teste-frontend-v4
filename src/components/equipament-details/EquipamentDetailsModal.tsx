import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IEquipment } from '../../models/Equipment';
import { IEquipmentModel } from '../../models/EquipmentModel';
import EquipmentStateContext from '../../context/EquipmentStateContext';

import { Typography, useMediaQuery, useTheme } from "@mui/material";

interface IEquipmentDetailsModal {
  equipment: IEquipment;
  isOpen: boolean;
  onClose: () => void;
}

const EquipmentDetailsModal = ({
  equipment,
  isOpen,
  onClose,
}: IEquipmentDetailsModal) => {
  
  const navigate = useNavigate();
  const [equipmentModel, setEquipmentModel] = useState<IEquipmentModel>();
  const equipamentStateContext = useContext(EquipmentStateContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  useEffect(() => {
    getEquipmentModel();
  }, [equipment.id]);

  const getEquipmentModel = async () => {
    try {
      const resp: any = await fetch("data/equipmentModel.json");
      const data: IEquipmentModel[] = await resp.json();
      setEquipmentModel(
        data.find((eq) => eq.id === equipment.equipmentModelId)
      );
    } catch (e) {
      console.log(e);
    }
  };



  const goToMap = () => {
    navigate(`map/${equipment.id}`);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 16, // Adiciona bordas arredondadas
          padding: 2, // Adiciona padding ao redor do conteúdo
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Equipamento: {equipment.name}
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        {equipmentModel && (
          <>
            <DialogContentText sx={{ marginBottom: 2 }}>
              Modelo do Equipamento: <strong>{equipmentModel.name}</strong>
            </DialogContentText>
            <DialogContentText sx={{ marginBottom: 2 }}>
              Id do modelo: {equipmentModel.id}
            </DialogContentText>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <Typography variant="h6">Ganhos Por Hora</Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: isMobile ? "100%" : 360,
                  bgcolor: "background.paper",
                  padding: 0,
                }}
              >
                {equipmentModel.hourlyEarnings.map((hEarning, index) => {
                  const state = equipamentStateContext?.states.find(
                    (state) => state.id === hEarning.equipmentStateId
                  );
                  return (
                    <ListItem
                      key={`${hEarning.equipmentStateId}_${index}`}
                      sx={{
                        backgroundColor:
                          state?.color || theme.palette.grey[300],
                        borderRadius: 2,
                        marginBottom: 1,
                        padding: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemText
                        primary={String(state?.name || "Unknown")}
                        secondary={`R$ ${hEarning.value.toFixed(2)}`}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight: "bold",
                          },
                          "& .MuiListItemText-secondary": {
                            color: theme.palette.text.secondary,
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={goToMap}>
          Visualizar No Mapa
        </Button>
        <Button onClick={onClose} autoFocus>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentDetailsModal;

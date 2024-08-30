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

interface IEquipmentDetailsModal {
  equipment: IEquipment,
  isOpen: boolean,
  onClose: () => void
}



const EquipmentDetailsModal = ({ equipment, isOpen, onClose }: IEquipmentDetailsModal) => {

  const navigate = useNavigate();
  const [equipmentModel, setEquipmentModel] = useState<IEquipmentModel>();
  const equipamentStateContext = useContext(EquipmentStateContext);


  useEffect(() => {
    getEquipmentModel();

  }, [equipment.id])




  const getEquipmentModel = async () => {
    try {
      const resp: any = await fetch("data/equipmentModel.json");
      const data: IEquipmentModel[] = await resp.json();
      setEquipmentModel(data.find(eq => eq.id === equipment.equipmentModelId));
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
      fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title">
        Equipamento: {equipment.name}
      </DialogTitle>
      <DialogContent>
        {equipmentModel &&
          <>

            <DialogContentText >
              Modelo do Equipamento: <strong>{equipmentModel.name}</strong>
            </DialogContentText>

            <DialogContentText >
              Id do modelo {equipmentModel.id}
            </DialogContentText>

            <div style={{display: 'flex',alignItems: 'center',  justifyContent: 'center' }}>
              Ganhos Por Hora

              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex' }}>

                {equipmentModel.hourlyEarnings.map((hEarning, index) => {

                  const state = equipamentStateContext?.states.find(state => state.id === hEarning.equipmentStateId);

                  return (
                    <ListItem 
                      key={`${hEarning.equipmentStateId}_${index}`}>
                      <ListItemText
                       style={{
                        backgroundColor: state?.color,
                        borderRadius: 5,
                       }}
                       sx={{ 
                        '> span, > p': {
                         paddingLeft: 2,
                         paddingRight: 2,
                         
                        },
                        '.MuiListItem-root': {
                          width: 60,
                          height: 40
                        }
                      }}
                       primary={String(state?.name)}
                       secondary={`R$ ${hEarning.value.toFixed(2)}`} />
                    </ListItem>)
                }

                )}
              </List>

            </div>
          </>}
      </DialogContent>
      <DialogActions>
        <Button onClick={goToMap}>Visualizar No Mapa</Button>
        <Button onClick={onClose} autoFocus>
          Fechar
        </Button>
      </DialogActions>

    </Dialog>

  );
}



export default EquipmentDetailsModal;

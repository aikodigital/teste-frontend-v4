import React, { useEffect, useState } from 'react'; 
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Modal, Box, Typography, Button } from '@mui/material';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const EquipmentMap = ({ equipmentPositions }) => {
  const [open, setOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleOpen = (equipment) => {
    setSelectedEquipment(equipment);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const map = L.map('map').setView([-19.126536, -45.947756], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    equipmentPositions.forEach((equipment) => {
      const { lat, lon, name, state, stateColor } = equipment;

      const marker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${name}</b><br><span style="color:${stateColor}">${state}</span>`)
        .openPopup();

      // Abrir o modal ao clicar no botão no popup
      marker.on('click', () => handleOpen(equipment));
    });
  }, [equipmentPositions]);

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100%' }}></div>

      {/* Modal para exibir o histórico de estados */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {selectedEquipment ? (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Histórico de Estados - {selectedEquipment.name}
              </Typography>

              <Box id="modal-description" sx={{ mt: 2, maxHeight: '300px', overflowY: 'auto' }}>
                <ul>
                  {selectedEquipment.history.map((entry, index) => (
                    <Box key={index} sx={entryStyle}>
                      <Typography><strong>Data:</strong> {new Date(entry.date).toLocaleString()}</Typography>
                      <Typography><strong>Estado:</strong> {entry.name}</Typography>
                      <Typography><strong>Duração:</strong> {entry.duration} horas</Typography>
                      <Typography><strong>Ganho nesse estado:</strong> R$ {entry.stateEarnings}</Typography>
                    </Box>
                  ))}
                  <Typography sx={totalStyle}><strong>Ganho total:</strong> R$ {selectedEquipment.totalEarnings}</Typography>
                </ul>
              </Box>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Fechar
              </Button>
            </>
          ) : (
            <Typography>Carregando...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const entryStyle = {
  mb: 2,
  p: 2,
  borderBottom: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

const totalStyle = {
  mt: 2,
  p: 2,
  fontWeight: 'bold',
  backgroundColor: '#e0f7fa',
  borderRadius: '4px',
};

export default EquipmentMap;

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
                <ul style={ulStyle}>
                  {selectedEquipment.history.map((entry, index) => (
                    <li key={index} style={entryStyle}>
                      <Typography variant="body2" style={dateStyle}>
                        Data: {new Date(entry.date).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" style={stateStyle}>
                        Estado: {entry.name}
                      </Typography>
                      <Typography variant="body2">
                        Duração: {entry.duration} horas
                      </Typography>
                      <Typography variant="body2">
                        Ganho nesse estado: R$ {entry.stateEarnings}
                      </Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="h6" style={totalEarningsStyle}>
                  Ganho total: R$ {selectedEquipment.totalEarnings}
                </Typography>
                <Typography variant="h6" style={productivityStyle}>
                  Percentual de Produtividade: {selectedEquipment.productivityPercentage.toFixed(2)}%
                </Typography>
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

const ulStyle = {
  listStyleType: 'none',
  padding: 0,
};

const entryStyle = {
  marginBottom: '15px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

const dateStyle = {
  fontWeight: 'bold',
  color: '#215d87',
};

const stateStyle = {
  fontWeight: 'bold',
  color: '#9ec023',
};

const totalEarningsStyle = {
  fontWeight: 'bold',
  fontSize: '1.0em',
  color: '#28a745', 
  marginTop: '15px',
};

const productivityStyle = {
  fontWeight: 'bold',
  fontSize: '1.0em',
  color: '#17a2b8', 
  marginTop: '5px',
};

export default EquipmentMap;

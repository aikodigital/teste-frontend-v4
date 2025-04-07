import React, { useEffect, useRef, useState } from 'react';
import { 
  Paper, 
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import dayjs from 'dayjs';

const MapContainer = styled(Box)`
  height: 400px;
  width: 100%;
  z-index: 0;
`;

const PositionHistory = ({ equipmentId, positionHistory }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'day', 'week', 'month'
  const [filteredPositions, setFilteredPositions] = useState([]);
  
  // Encontrar o histórico de posições do equipamento específico
  const equipmentPositions = positionHistory.find(e => e.equipmentId === equipmentId);
  
  // Atualizar posições filtradas quando o filtro mudar
  useEffect(() => {
    if (!equipmentPositions || !equipmentPositions.positions) {
      setFilteredPositions([]);
      return;
    }
    
    let positions = [...equipmentPositions.positions];
    
    // Aplicar filtro de tempo
    if (timeFilter !== 'all') {
      const now = dayjs();
      let cutoffDate;
      
      switch (timeFilter) {
        case 'day':
          cutoffDate = now.subtract(1, 'day');
          break;
        case 'week':
          cutoffDate = now.subtract(1, 'week');
          break;
        case 'month':
          cutoffDate = now.subtract(1, 'month');
          break;
        default:
          cutoffDate = null;
      }
      
      if (cutoffDate) {
        positions = positions.filter(p => dayjs(p.date).isAfter(cutoffDate));
      }
    }
    
    // Ordenar por data
    positions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setFilteredPositions(positions);
  }, [equipmentPositions, timeFilter]);
  
  // Inicializar o mapa
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Inicializar o mapa
      const map = L.map(mapRef.current, {
        center: [-19.2, -46.0],
        zoom: 10,
        zoomControl: true,
        attributionControl: true,
        dragging: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        boxZoom: true,
        keyboard: true,
        tap: false,
        tapTolerance: 15,
        clickable: false,
        draggableCursor: 'default'
      });

      // Prevent unwanted click behaviors
      map.on('click', function(e) {
        if (e.originalEvent) {
          const target = e.originalEvent.target;
          if (target.classList.contains('custom-marker') || 
              target.closest('.custom-marker') || 
              target.closest('.leaflet-popup')) {
            L.DomEvent.stopPropagation(e);
            return false;
          }
        }
      });
      
      // Adicionar camada de mapa (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      mapInstanceRef.current = map;
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  // Atualizar o mapa quando as posições filtradas mudarem
  useEffect(() => {
    if (!mapInstanceRef.current || filteredPositions.length === 0) return;
    
    // Limpar camadas existentes
    mapInstanceRef.current.eachLayer(layer => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        layer.remove();
      }
    });
    
    // Criar pontos para a linha
    const points = filteredPositions.map(p => [p.lat, p.lon]);
    
    // Criar linha
    const polyline = L.polyline(points, { 
      color: '#3498db', 
      weight: 3,
      opacity: 0.7,
      interactive: false
    }).addTo(mapInstanceRef.current);
    
    // Adicionar marcadores para início e fim
    if (points.length > 0) {
      // Marcador de início (verde)
      const startIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background-color: #2ecc71; 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          border: 2px solid white;
          pointer-events: none;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      
      // Marcador de fim (vermelho)
      const endIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background-color: #e74c3c; 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          border: 2px solid white;
          pointer-events: none;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      
      // Adicionar marcadores com popups informativos
      const startMarker = L.marker(points[0], { 
        icon: startIcon,
        interactive: true,
        bubblingMouseEvents: false,
        riseOnHover: true,
        riseOffset: 250
      }).addTo(mapInstanceRef.current);

      const startPopup = L.popup({
        closeButton: true,
        className: 'custom-popup',
        maxWidth: 300,
        autoPan: true,
        keepInView: true,
        closeOnClick: false
      }).setContent(`
        <div>
          <strong>Início</strong><br>
          Data: ${dayjs(filteredPositions[0].date).format('DD/MM/YYYY HH:mm')}
        </div>
      `);

      startMarker.bindPopup(startPopup);
      
      const endMarker = L.marker(points[points.length - 1], { 
        icon: endIcon,
        interactive: true,
        bubblingMouseEvents: false,
        riseOnHover: true,
        riseOffset: 250
      }).addTo(mapInstanceRef.current);

      const endPopup = L.popup({
        closeButton: true,
        className: 'custom-popup',
        maxWidth: 300,
        autoPan: true,
        keepInView: true,
        closeOnClick: false
      }).setContent(`
        <div>
          <strong>Fim</strong><br>
          Data: ${dayjs(filteredPositions[filteredPositions.length - 1].date).format('DD/MM/YYYY HH:mm')}
        </div>
      `);

      endMarker.bindPopup(endPopup);

      // Prevent click events from propagating
      [startMarker, endMarker].forEach(marker => {
        marker.getElement().addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          marker.openPopup();
        }, false);

        marker.getElement().addEventListener('mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();
        }, false);

        marker.getElement().addEventListener('mousemove', function(e) {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });
      
      // Ajustar visualização para mostrar toda a rota
      mapInstanceRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [filteredPositions]);
  
  // Se não houver histórico, mostrar mensagem
  if (!equipmentPositions || !equipmentPositions.positions || equipmentPositions.positions.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Histórico de Posições</Typography>
        <Typography>Não há histórico de posições disponível para este equipamento.</Typography>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Histórico de Posições
        </Typography>
        
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="time-filter-label">Período</InputLabel>
          <Select
            labelId="time-filter-label"
            value={timeFilter}
            label="Período"
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <MenuItem value="all">Todo histórico</MenuItem>
            <MenuItem value="day">Último dia</MenuItem>
            <MenuItem value="week">Última semana</MenuItem>
            <MenuItem value="month">Último mês</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <MapContainer ref={mapRef} />
      
      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
        {filteredPositions.length} posições exibidas
      </Typography>
    </Paper>
  );
};

export default PositionHistory; 
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Tooltip, 
  CircularProgress, 
  useTheme,
  Zoom,
  IconButton,
  Card,
  Stack,
  alpha
} from '@mui/material';
import styled from '@emotion/styled';
import LayersIcon from '@mui/icons-material/Layers';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ColorModeContext } from '../App';

// Corrigir problema de ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapContainer = styled(Box)(({ theme }) => `
  height: 550px;
  width: 100%;
  z-index: 0;
  position: relative;
  border-radius: ${theme.shape.borderRadius * 1.5}px;
  overflow: hidden;
  box-shadow: ${theme.palette.mode === 'light' 
    ? '0 4px 12px rgba(0, 0, 0, 0.05)' 
    : '0 4px 12px rgba(0, 0, 0, 0.2)'};
  transition: all 0.5s ease-in-out;
  
  &:hover {
    box-shadow: ${theme.palette.mode === 'light' 
      ? '0 6px 16px rgba(0, 0, 0, 0.08)' 
      : '0 6px 20px rgba(0, 0, 0, 0.3)'};
  }
  
  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: ${theme.shape.borderRadius * 1.5}px;
    font-family: ${theme.typography.fontFamily};
    transition: filter 0.5s ease-in-out;
    filter: ${theme.palette.mode === 'dark' ? 'brightness(0.85) invert(0.9) hue-rotate(200deg)' : 'none'};
  }
  
  .leaflet-control-zoom, .leaflet-control-attribution {
    border-radius: ${theme.shape.borderRadius}px !important;
    overflow: hidden;
    transition: background-color 0.3s ease;
  }
  
  .leaflet-control-zoom-in, .leaflet-control-zoom-out {
    border-radius: ${theme.shape.borderRadius / 2}px !important;
    margin: 4px !important;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: ${theme.shape.borderRadius * 1.5}px;
    box-shadow: ${theme.shadows[3]};
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
  }
  
  .leaflet-popup-content {
    margin: 0;
    padding: 0;
  }
  
  .leaflet-popup-tip {
    background-color: ${theme.palette.background.paper};
    transition: background-color 0.3s ease;
  }
  
  .leaflet-popup-close-button {
    padding: 8px !important;
    margin: 2px !important;
    border-radius: 50% !important;
    width: 24px !important;
    height: 24px !important;
    font-size: 18px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    color: ${theme.palette.text.primary} !important;
    
    &:hover {
      background-color: ${theme.palette.mode === 'light' 
        ? 'rgba(0, 0, 0, 0.05)' 
        : 'rgba(255, 255, 255, 0.05)'} !important;
    }
  }
  
  .custom-popup-header {
    background-color: ${theme.palette.mode === 'light' 
      ? theme.palette.grey[100] 
      : theme.palette.grey[800]};
    padding: 12px 16px;
    border-bottom: 1px solid ${theme.palette.divider};
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  
  .custom-popup-body {
    padding: 16px;
    transition: background-color 0.3s ease;
  }
  
  .custom-popup-footer {
    padding: 12px 16px;
    border-top: 1px solid ${theme.palette.divider};
    background-color: ${theme.palette.mode === 'light' 
      ? theme.palette.grey[50] 
      : theme.palette.grey[900]};
    display: flex;
    justify-content: flex-end;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  
  .details-link {
    text-decoration: none;
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    padding: 6px 12px;
    border-radius: ${theme.shape.borderRadius}px;
    font-weight: 500;
    font-size: 14px;
    display: inline-block;
    transition: all 0.3s;
    
    &:hover {
      background-color: ${theme.palette.primary.dark};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows[2]};
    }
  }
  
  .marker-pulse {
    position: relative;
  }
  
  .marker-pulse:before {
    content: '';
    display: block;
    position: absolute;
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    margin-left: -100%;
    margin-top: -100%;
    border-radius: 50%;
    background-color: currentColor;
    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    opacity: 0.6;
    z-index: -1;
  }
  
  .marker-pulse-cc:before {
    background-color: #2980b9 !important;
  }
  
  .marker-pulse-hv:before {
    background-color: #8e44ad !important;
  }
  
  .marker-pulse-gt:before {
    background-color: #16a085 !important;
  }
  
  @keyframes pulse-ring {
    0% {
      transform: scale(0.33);
      opacity: 0.8;
    }
    80%, 100% {
      opacity: 0;
      transform: scale(1);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Animação de destaque para marcadores operando */
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 25px 8px rgba(255, 255, 255, 0.8);
    }
    100% {
      box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
    }
  }
`);

const ControlsContainer = styled(Box)(({ theme }) => `
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease-in-out;
`);

const MapOverlay = styled(Card)(({ theme }) => `
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  max-width: 310px;
  border-radius: ${theme.shape.borderRadius * 1.5}px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: ${theme.shadows[4]};
`);

const ModelLegend = styled(Card)(({ theme }) => `
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  border-radius: ${theme.shape.borderRadius * 1.5}px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: ${theme.shadows[4]};
`);

const ModelChip = styled(Box)(({ theme, color }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  margin-right: 8px;
  padding: 0 12px;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1;
  border-radius: 14px;
  background-color: ${alpha(color, theme.palette.mode === 'light' ? 0.15 : 0.3)};
  color: ${color};
  border: 1.5px solid ${alpha(color, 0.4)};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  
  &:hover {
    background-color: ${alpha(color, theme.palette.mode === 'light' ? 0.25 : 0.4)};
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  }
`);

const MapTypeButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'theme'
})(({ theme, active }) => `
  background-color: ${active ? theme.palette.primary.main : theme.palette.background.paper};
  color: ${active ? theme.palette.primary.contrastText : theme.palette.text.primary};
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: ${active 
      ? theme.palette.primary.dark 
      : theme.palette.mode === 'light' 
        ? alpha(theme.palette.primary.main, 0.08)
        : alpha(theme.palette.primary.main, 0.15)
    };
    transform: translateY(-2px);
  }
`);

const Map = ({ equipments, equipmentModels, latestPositions, latestStates, equipmentStates }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState('street');
  const [mapStats, setMapStats] = useState({
    total: 0,
    operating: 0,
    stopped: 0,
    maintenance: 0
  });
  const [tileLayer, setTileLayer] = useState(null);

  // Criar definições de modelos para a legenda
  const modelDefinitions = [
    { acronym: 'CC', name: 'Caminhão de Carga', color: '#2980b9' },
    { acronym: 'HV', name: 'Harvester', color: '#8e44ad' },
    { acronym: 'GT', name: 'Garra Traçadora', color: '#16a085' }
  ];

  // Inicializar mapa
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [-23.5505, -46.6333], // São Paulo
        zoom: 5,
        zoomControl: false,
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
            L.DomEvent.preventDefault(e);
            return false;
          }
        }
      });

      // Disable click and drag events on markers
      map.on('popupopen', function(e) {
        if (e.popup && e.popup._source) {
          e.popup._source.dragging.disable();
        }
      });

      const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      setTileLayer(tile);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Efeito para ajustar o mapa ao mudar o tema
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, [theme.palette.mode]);

  // Debug para verificar os dados recebidos
  useEffect(() => {
    // Data validation happens silently
  }, [equipments, equipmentModels, latestPositions, latestStates, equipmentStates]);

  // Atualizar marcadores quando os dados mudarem
  useEffect(() => {
    if (mapInstanceRef.current && equipments.length > 0) {
      createMarkers();
      setIsLoading(false);
    }
  }, [equipments, latestPositions, latestStates, equipmentStates, theme.palette.mode]);

  // Função para criar marcadores
  const createMarkers = () => {
    // Limpar marcadores existentes
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Estatísticas para o dashboard do mapa
    const stats = {
      total: equipments.length,
      operating: 0,
      stopped: 0,
      maintenance: 0
    };

    // Criar novos marcadores
    equipments.forEach(equipment => {
      // Verificar se temos a posição para este equipamento
      const position = latestPositions.find(pos => {
        // Verificar o formato dos dados recebidos
        if (pos.equipmentId === equipment.id) {
          // Formato direto do objeto latestPositions
          return true;
        } else if (pos.latestPosition && pos.equipmentId === equipment.id) {
          // Formato anterior com latestPosition aninhado
          return true;
        }
        return false;
      });

      if (!position) {
        return;
      }
      
      // Extrair as coordenadas com base no formato dos dados
      let lat, lng;
      if (position.latitude !== undefined && position.longitude !== undefined) {
        lat = position.latitude;
        lng = position.longitude;
      } else if (position.latestPosition && position.latestPosition.lat !== undefined && position.latestPosition.lon !== undefined) {
        lat = position.latestPosition.lat;
        lng = position.latestPosition.lon;
      } else {
        return;
      }

      // Verificar se temos o estado para este equipamento
      const state = latestStates.find(state => {
        if (state.equipmentId === equipment.id) {
          return true;
        } else if (state.latestState && state.equipmentId === equipment.id) {
          return true;
        }
        return false;
      });

      if (!state) {
        return;
      }
      
      // Extrair o ID do estado com base no formato dos dados
      let stateId;
      if (state.stateId !== undefined) {
        stateId = state.stateId;
      } else if (state.latestState && state.latestState.equipmentStateId !== undefined) {
        stateId = state.latestState.equipmentStateId;
      } else {
        return;
      }

      const stateData = equipmentStates.find(s => s.id === stateId);
      if (!stateData) {
        return;
      }

      // Obter o modelo do equipamento
      const modelId = equipment.modelId || equipment.equipmentModelId;
      const model = equipmentModels.find(m => m.id === modelId);
      if (!model) {
        // Continue without logging
      }

      // Obter sigla e cor do modelo
      const getModelInfo = (modelName) => {
        if (!modelName) return { acronym: '??', color: '#777777' };
        
        if (modelName.includes('Caminhão')) return { acronym: 'CC', color: '#2980b9' }; // Azul mais vibrante
        if (modelName.includes('Harvester')) return { acronym: 'HV', color: '#8e44ad' }; // Roxo mais vibrante
        if (modelName.includes('Garra')) return { acronym: 'GT', color: '#16a085' }; // Verde água mais vibrante
        
        // Caso seja um modelo não identificado, usar as iniciais e uma cor padrão
        const acronym = modelName.split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase();
          
        return { acronym, color: '#777777' };
      };
      
      const modelInfo = getModelInfo(model?.name);

      // Atualizar estatísticas
      if (stateData.name.toLowerCase().includes('opera')) stats.operating++;
      else if (stateData.name.toLowerCase().includes('parado')) stats.stopped++;
      else if (stateData.name.toLowerCase().includes('manutenção')) stats.maintenance++;

      // Criar o HTML personalizado para o popup
      const popupContent = document.createElement('div');
      popupContent.className = 'custom-popup';
      
      popupContent.innerHTML = `
        <div class="custom-popup-header">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: ${theme.palette.text.primary}">
            ${equipment.name}
          </h3>
        </div>
        <div class="custom-popup-body">
          <p style="margin: 0 0 8px; font-size: 14px; color: ${theme.palette.text.secondary}">
            <strong>Modelo:</strong> ${model ? model.name : 'Desconhecido'}
          </p>
          <p style="margin: 0 0 8px; font-size: 14px; color: ${theme.palette.text.secondary}">
            <strong>Estado:</strong> 
            <span style="
              display: inline-block;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
              background-color: ${alpha(stateData.color, 0.2)};
              color: ${stateData.color};
              font-weight: 500;
            ">
              ${stateData ? stateData.name : 'Desconhecido'}
            </span>
          </p>
          <p style="margin: 0; font-size: 14px; color: ${theme.palette.text.secondary}">
            <strong>Localização:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}
          </p>
        </div>
        <div class="custom-popup-footer">
          <a href="#" class="details-link" data-id="${equipment.id}">Ver detalhes</a>
        </div>
      `;

      // Adicionar o evento de clique ao link
      setTimeout(() => {
        const detailsLink = popupContent.querySelector('.details-link');
        if (detailsLink) {
          detailsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            navigate(`/equipment/${id}`);
          });
        }
      }, 0);

      // Criar ícone personalizado
      const markerHtmlStyles = `
        background-color: ${stateData.color};
        width: 2.4rem;
        height: 2.4rem;
        display: block;
        position: relative;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        transform-origin: center;
        border: 2px solid #FFFFFF;
        box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        box-sizing: border-box;
        z-index: 10;
        overflow: visible;
        ${stateData.name.toLowerCase().includes('opera') ? 'animation: glow 2s infinite ease-in-out;' : ''}
      `;

      const iconHtmlStyles = `
        background-color: ${modelInfo.color};
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        border-radius: 50%;
        border: 1.5px solid #FFFFFF;
        font-weight: 700;
        font-size: 0.75rem;
        color: white;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        box-shadow: 0 2px 3px rgba(0,0,0,0.2);
        text-align: center;
        line-height: 1;
        padding: 0;
      `;

      const acronymStyles = `
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transform: translateY(0);
      `;

      // Criar o efeito de pulso baseado no estado e modelo
      let wrapperClass = '';
      let pulseStyle = '';
      let markerAdditionalStyles = '';
      
      if (stateData.name.toLowerCase().includes('opera')) {
        wrapperClass = `marker-pulse marker-pulse-${modelInfo.acronym.toLowerCase()}`;
        pulseStyle = `color: ${modelInfo.color};`;
        markerAdditionalStyles = `animation: glow 2s infinite ease-in-out;`;
      } else if (stateData.name.toLowerCase().includes('parado')) {
        pulseStyle = `animation: pulse 1.5s ease-in-out infinite;`;
      } else if (modelInfo.acronym === 'HV') {
        wrapperClass = `marker-pulse marker-pulse-${modelInfo.acronym.toLowerCase()}`;
        pulseStyle = `color: ${modelInfo.color};`;
      }

      const icon = L.divIcon({
        className: "custom-marker",
        iconAnchor: [19, 38],
        popupAnchor: [0, -35],
        iconSize: [38, 38],
        html: `
          <div class="${wrapperClass}" style="${pulseStyle}; pointer-events: none;">
            <span style="${markerHtmlStyles} ${markerAdditionalStyles}; pointer-events: none;">
              <div style="${iconHtmlStyles}" role="presentation" aria-hidden="true">
                <span style="${acronymStyles}">${modelInfo.acronym}</span>
              </div>
            </span>
          </div>
        `
      });

      // Criar o marcador com o popup
      const marker = L.marker([lat, lng], { 
        icon,
        interactive: true,
        bubblingMouseEvents: false,
        riseOnHover: true,
        riseOffset: 250
      }).addTo(mapInstanceRef.current);
      
      // Criar e adicionar o popup
      const popup = L.popup({
        closeButton: true,
        className: `popup-${theme.palette.mode}`,
        maxWidth: 300,
        autoPan: true,
        keepInView: true,
        closeOnClick: false
      }).setContent(popupContent);
      
      marker.bindPopup(popup);
      
      // Prevent any click events from propagating
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
      
      // Armazenar o marcador para referência futura
      markersRef.current[equipment.id] = marker;
    });
    
    setMapStats(stats);
    
    // Ajustar o zoom para mostrar todos os marcadores
    if (Object.keys(markersRef.current).length > 0) {
      fitAllMarkers();
    }
  };

  const changeMapType = (type) => {
    if (mapInstanceRef.current && tileLayer) {
      tileLayer.remove();
      let newTileLayer;
      
      switch(type) {
        case 'satellite':
          newTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          });
          break;
        case 'terrain':
          newTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          });
          break;
        default:
          newTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          });
      }
      
      newTileLayer.addTo(mapInstanceRef.current);
      setTileLayer(newTileLayer);
      setMapType(type);
    }
  };

  const fitAllMarkers = () => {
    const map = mapInstanceRef.current;
    if (map && Object.keys(markersRef.current).length > 0) {
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  };

  const changeZoom = (delta) => {
    const map = mapInstanceRef.current;
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + delta);
    }
  };

  return (
    <MapContainer theme={theme}>
      {isLoading ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            zIndex: 2000,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <CircularProgress size={48} color="primary" />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Carregando mapa...
          </Typography>
        </Box>
      ) : null}
      
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      
      {/* Legenda de modelos */}
      <ModelLegend theme={theme}>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Legenda de Modelos
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
            {modelDefinitions.map(model => (
              <ModelChip key={model.acronym} color={model.color} theme={theme}>
                {model.acronym}
              </ModelChip>
            ))}
          </Stack>
        </Box>
      </ModelLegend>
      
      <ControlsContainer theme={theme}>
        <Paper
          elevation={3}
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.9 : 0.8),
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Stack spacing={1}>
            <Tooltip title="Mapa normal" arrow placement="left">
              <MapTypeButton
                size="small"
                onClick={() => changeMapType('street')}
                active={mapType === 'street'}
                theme={theme}
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3137/3137880.png" 
                  alt="Street Map" 
                  style={{ width: 20, height: 20, filter: theme.palette.mode === 'dark' && mapType !== 'street' ? 'invert(1)' : 'none' }}
                />
              </MapTypeButton>
            </Tooltip>
            
            <Tooltip title="Satélite" arrow placement="left">
              <MapTypeButton
                size="small"
                onClick={() => changeMapType('satellite')}
                active={mapType === 'satellite'}
                theme={theme}
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3137/3137795.png" 
                  alt="Satellite Map" 
                  style={{ width: 20, height: 20, filter: theme.palette.mode === 'dark' && mapType !== 'satellite' ? 'invert(1)' : 'none' }}
                />
              </MapTypeButton>
            </Tooltip>
            
            <Tooltip title="Terreno" arrow placement="left">
              <MapTypeButton
                size="small"
                onClick={() => changeMapType('terrain')}
                active={mapType === 'terrain'}
                theme={theme}
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3137/3137807.png" 
                  alt="Terrain Map" 
                  style={{ width: 20, height: 20, filter: theme.palette.mode === 'dark' && mapType !== 'terrain' ? 'invert(1)' : 'none' }}
                />
              </MapTypeButton>
            </Tooltip>
          </Stack>
        </Paper>
        
        <Paper
          elevation={3}
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.9 : 0.8),
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Stack spacing={1}>
            <Tooltip title="Aumentar zoom" arrow placement="left">
              <IconButton size="small" onClick={() => changeZoom(1)}>
                <ZoomInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Diminuir zoom" arrow placement="left">
              <IconButton size="small" onClick={() => changeZoom(-1)}>
                <ZoomOutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Ajustar visualização" arrow placement="left">
              <IconButton size="small" onClick={fitAllMarkers}>
                <MyLocationIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Atualizar mapa" arrow placement="left">
              <IconButton size="small" onClick={() => createMarkers()}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </ControlsContainer>
      
      <MapOverlay theme={theme}>
        <Box sx={{ p: 2, bgcolor: 'background.paper', transition: 'background-color 0.3s ease-in-out' }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Equipamentos no mapa
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
            <Chip 
              label={`Total: ${mapStats.total}`} 
              color="primary" 
              size="small" 
              sx={{ borderRadius: '12px', transition: 'all 0.3s ease' }}
            />
            <Chip 
              label={`Em operação: ${mapStats.operating}`} 
              size="small" 
              sx={{ 
                borderRadius: '12px', 
                backgroundColor: alpha('#2ecc71', theme.palette.mode === 'light' ? 0.1 : 0.2), 
                color: '#2ecc71',
                transition: 'all 0.3s ease',
                border: `1px solid ${alpha('#2ecc71', 0.3)}`
              }} 
            />
            <Chip 
              label={`Parados: ${mapStats.stopped}`} 
              size="small" 
              sx={{ 
                borderRadius: '12px', 
                backgroundColor: alpha('#f1c40f', theme.palette.mode === 'light' ? 0.1 : 0.2), 
                color: theme.palette.mode === 'light' ? '#f39c12' : '#f1c40f',
                transition: 'all 0.3s ease',
                border: `1px solid ${alpha('#f1c40f', 0.3)}`
              }} 
            />
            <Chip 
              label={`Em manutenção: ${mapStats.maintenance}`} 
              size="small" 
              sx={{ 
                borderRadius: '12px', 
                backgroundColor: alpha('#e74c3c', theme.palette.mode === 'light' ? 0.1 : 0.2), 
                color: '#e74c3c',
                transition: 'all 0.3s ease',
                border: `1px solid ${alpha('#e74c3c', 0.3)}`
              }} 
            />
          </Stack>
        </Box>
      </MapOverlay>
    </MapContainer>
  );
};

export default Map; 
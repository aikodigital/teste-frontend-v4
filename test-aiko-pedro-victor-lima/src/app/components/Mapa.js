'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

// Função para selecionar o ícone com base no estado do equipamento
const selectUrlImg = (state) => {
  if (state === "Operando") {
    return "/img/operando.svg";
  }
  if (state === "Parado") {
    return "/img/parado.svg";
  }
  if (state === "Manutenção") {
    return "/img/manutencao.svg";
  }
  return "/img/default.svg"; // Ícone padrão
};

// Função para aplicar um pequeno deslocamento nas coordenadas
const applyOffset = (location, index) => {
  const offsetStep = 0.0001; // Pequeno deslocamento nas coordenadas
  return [
    location.position[0] + index * offsetStep, // Aplica deslocamento baseado no índice
    location.position[1] + index * offsetStep,
  ];
};

export default function Map() {
  const { selectedEquipment, datas } = useContext(DataContext);

  // Obter as últimas 5 posições
  const last5Positions = datas[selectedEquipment]?.history.slice(-5) || [];

  // Verifica posições duplicadas e aplica o deslocamento se necessário
  const adjustedPositions = last5Positions.map((location, index, array) => {
    // Verificar se há outras posições iguais
    const duplicatePositions = array.filter(
      (pos) =>
        pos.position[0] === location.position[0] && pos.position[1] === location.position[1]
    );

    // Se houver duplicatas, aplica deslocamento apenas às duplicatas
    if (duplicatePositions.length > 1) {
      return {
        ...location,
        adjustedPosition: applyOffset(location, index), // Aplica o deslocamento para as duplicatas
      };
    }
    // Se não houver duplicatas, retorna a posição original
    return {
      ...location,
      adjustedPosition: location.position,
    };
  });

  return (
    <div className="h-[250px] w-[400px] rounded-lg">
      <MapContainer center={[-23.55052, -46.633308]} zoom={5} style={{ height: '100%', width: '100%', borderRadius: 10 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {adjustedPositions.map((location, index) => {
          const iconUrl = selectUrlImg(location.equipmentStateId); // Diretamente usar o estado do location

          // Crie um ícone personalizado com o Leaflet
          const customIcon = L.icon({
            iconUrl,
            iconSize: [25, 41], // Tamanho do ícone
            iconAnchor: [12, 41], // Posição do ícone no mapa
            popupAnchor: [1, -34], // Onde o popup será exibido em relação ao ícone
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41], // Tamanho da sombra
            shadowAnchor: [12, 41], // Posição da sombra
          });

          return (
            <Marker
              key={index}
              position={[location.adjustedPosition[0], location.adjustedPosition[1]]} // Usando a posição ajustada
              icon={customIcon} // Use o ícone personalizado aqui
            >
              <Popup>{location.date}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

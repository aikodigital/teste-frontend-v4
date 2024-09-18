import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Leaflet.styles.scss';
import { Icon } from 'leaflet';
import local from '../../assets/img/local.png';
import { EquipPositionHistoryData } from './Leaflet.types';
import { useContextApi } from '../../context/ContextApi';

interface ILeaflet {
  equipPositionHistory: EquipPositionHistoryData[];
  showModal: () => void;
  idEquipSelect: (value: string) => void;
}

function Leaflet({ equipPositionHistory, showModal, idEquipSelect }: ILeaflet) {
  const {
    equipaments,
    equipamentsModel,
    equipamentsStateHistory,
    equipamentsState,
  } = useContextApi();
  const customIcon = new Icon({
    iconUrl: local,
    iconSize: [38, 38],
  });

  function openModal(idEquip: string) {
    idEquipSelect(idEquip);
    showModal();
  }

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  function getName(equiId: string) {
    const [{ name }] = equipaments.filter((item) => item.id === equiId);
    return name;
  }

  function getModel(equiId: string) {
    const [{ equipmentModelId }] = equipaments.filter(
      (item) => item.id === equiId
    );
    const [{ name }] = equipamentsModel.filter(
      (item) => item.id === equipmentModelId
    );
    return name;
  }

  function getSituation(equiId: string) {
    const [{ states }] = equipamentsStateHistory.filter(
      (item) => item.equipmentId === equiId
    );
    const lastState = states[states.length - 1];
    const [{ name, color }] = equipamentsState.filter(
      (item) => item.id === lastState.equipmentStateId
    );
    return (
      <p>
        Situação: <span style={{ backgroundColor: `${color}` }}>{name}</span>
      </p>
    );
  }

  function getState(equiId: string) {
    const [{ states }] = equipamentsStateHistory.filter(
      (item) => item.equipmentId === equiId
    );
    const lastState = states[states.length - 1];
    return formatDate(lastState.date);
  }

  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipPositionHistory.map((item) => (
        <Marker
          position={[
            item.positions[item.positions.length - 1].lat,
            item.positions[item.positions.length - 1].lon,
          ]}
          icon={customIcon}
        >
          <Popup className="popup">
            <p>Nome: {getName(item.equipmentId)}</p>
            <p>Modelo: {getModel(item.equipmentId)}</p>
            {getSituation(item.equipmentId)}
            <p>Última Atualização: {getState(item.equipmentId)}</p>
            <button type="button" onClick={() => openModal(item.equipmentId)}>
              Mostrar Histórico
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Leaflet;

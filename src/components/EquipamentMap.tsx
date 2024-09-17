import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentData from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import { Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

const EquipmentMap: React.FC = () => {
  const [positions, setPositions] = useState<any[]>([]);
  const [filterState, setFilterState] = useState('Todos');
  const [filterModel, setFilterModel] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const latestPositions = equipmentPositionHistory.map((equipment: any) => {
      const lastPosition = equipment.positions[equipment.positions.length - 1];
      return { id: equipment.equipmentId, ...lastPosition };
    });
    setPositions(latestPositions);
  }, []);

  const getLatestState = (equipmentId: string) => {
    const equipmentStateHistoryData = equipmentStateHistory.find(
      (e) => e.equipmentId === equipmentId
    );
    if (equipmentStateHistoryData) {
      const latestState =
        equipmentStateHistoryData.states[
          equipmentStateHistoryData.states.length - 1
        ];
      const stateData = equipmentState.find(
        (s) => s.id === latestState.equipmentStateId
      );
      return stateData ? stateData.name : 'Desconhecido';
    }
    return 'Desconhecido';
  };

  const getEquipmentName = (equipmentId: string) => {
    const equipment = equipmentData.find((e) => e.id === equipmentId);
    return equipment ? equipment.name : 'Desconhecido';
  };

  const getEquipmentModel = (equipmentId: string) => {
    const equipment = equipmentData.find((e) => e.id === equipmentId);
    if (equipment) {
      const model = equipmentModel.find(
        (m) => m.id === equipment.equipmentModelId
      );
      return model ? model.name : 'Modelo Desconhecido';
    }
    return 'Modelo Desconhecido';
  };

  const calculateProductivity = (equipmentId: string) => {
    const equipmentStateHistoryData = equipmentStateHistory.find(
      (e) => e.equipmentId === equipmentId
    );
    if (equipmentStateHistoryData) {
      const hoursInOperation = equipmentStateHistoryData.states.filter(
        (stateRecord) => {
          const stateData = equipmentState.find(
            (s) => s.id === stateRecord.equipmentStateId
          );
          return stateData && stateData.name === 'Operando';
        }
      ).length;
      const totalHours = equipmentStateHistoryData.states.length;
      const productivity = (hoursInOperation / totalHours) * 100;
      return productivity.toFixed(2);
    }
    return '0.00';
  };

  const calculateGains = (equipmentId: string) => {
    const equipment = equipmentData.find((e) => e.id === equipmentId);
    const model = equipmentModel.find(
      (m) => m.id === equipment?.equipmentModelId
    );
    if (equipment && model) {
      let totalGains = 0;
      const equipmentStateHistoryData = equipmentStateHistory.find(
        (e) => e.equipmentId === equipmentId
      );
      if (equipmentStateHistoryData) {
        equipmentStateHistoryData.states.forEach((stateRecord) => {
          const stateData = equipmentState.find(
            (s) => s.id === stateRecord.equipmentStateId
          );
          if (stateData) {
            const hourlyEarning = model.hourlyEarnings.find(
              (h) => h.equipmentStateId === stateData.id
            );
            if (hourlyEarning) {
              totalGains += hourlyEarning.value;
            }
          }
        });
      }
      return totalGains;
    }
    return 0;
  };

  const getStateHistory = (equipmentId: string) => {
    const equipmentStateHistoryData = equipmentStateHistory.find(
      (e) => e.equipmentId === equipmentId
    );
    if (equipmentStateHistoryData) {
      return equipmentStateHistoryData.states.map((stateRecord) => {
        const stateData = equipmentState.find(
          (s) => s.id === stateRecord.equipmentStateId
        );
        return {
          date: new Date(stateRecord.date).toLocaleDateString(),
          state: stateData ? stateData.name : 'Desconhecido',
        };
      });
    }
    return [];
  };

  const getPositionHistory = (equipmentId: string) => {
    const equipmentPositionHistoryData = equipmentPositionHistory.find(
      (e) => e.equipmentId === equipmentId
    );
    if (equipmentPositionHistoryData) {
      return equipmentPositionHistoryData.positions.map((positionRecord) => {
        return {
          date: new Date(positionRecord.date).toLocaleDateString(),
          position: `Lat: ${positionRecord.lat}, Lon: ${positionRecord.lon}`,
        };
      });
    }
    return [];
  };

  const filteredPositions = positions.filter((position) => {
    const latestState = getLatestState(position.id);
    const model = getEquipmentModel(position.id);
    const equipmentName = getEquipmentName(position.id).toLowerCase();
    const equipmentId = position.id.toLowerCase();
    const stateMatches = filterState === 'Todos' || latestState === filterState;
    const modelMatches = filterModel === 'Todos' || model === filterModel;
    const searchMatches =
      searchTerm === '' ||
      equipmentName.includes(searchTerm.toLowerCase()) ||
      equipmentId.includes(searchTerm.toLowerCase());
    return stateMatches && modelMatches && searchMatches;
  });

  return (
    <Container>
      <Form className="mb-4">
        <Row className="justify-content-center">
          <Col xs={12} md={4}>
            <Form.Group controlId="searchEquipment">
              <Form.Label>Pesquisar Equipamento:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome ou ID do Equipamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group controlId="stateFilter">
              <Form.Label>Filtrar por Estado:</Form.Label>
              <Form.Control
                as="select"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {equipmentState.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group controlId="modelFilter">
              <Form.Label>Filtrar por Modelo:</Form.Label>
              <Form.Control
                as="select"
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {equipmentModel.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={5}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPositions.map((position, idx) => (
          <Marker
            key={idx}
            position={[position.lat, position.lon]}
            icon={defaultIcon}
          >
            <Popup>
              <div>
                <p>
                  <strong>Nome do Equipamento:</strong>{' '}
                  {getEquipmentName(position.id)}
                </p>
                <p>
                  <strong>ID do Equipamento:</strong> {position.id}
                </p>
                <p>
                  <strong>Estado Atual:</strong> {getLatestState(position.id)}
                </p>
                <p>
                  <strong>Modelo:</strong> {getEquipmentModel(position.id)}
                </p>
                <p>
                  <strong>Produtividade:</strong>{' '}
                  {calculateProductivity(position.id)}%
                </p>
                <p>
                  <strong>Ganho Total:</strong> R${' '}
                  {calculateGains(position.id).toFixed(2)}
                </p>

                <h4>Histórico de Estados</h4>
                <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                  <ul>
                    {getStateHistory(position.id).map((stateRecord, index) => (
                      <li key={index}>
                        {stateRecord.date}: {stateRecord.state}
                      </li>
                    ))}
                  </ul>
                </div>

                <h4>Histórico de Posições</h4>
                <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                  <ul>
                    {getPositionHistory(position.id).map(
                      (positionRecord, index) => (
                        <li key={index}>
                          {positionRecord.date}: {positionRecord.position}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default EquipmentMap;

import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

interface EquipmentStateHistoryProps {
  show: boolean;
  onHide: () => void;
  equipmentName: string;
  stateHistory: { date: string; stateName: string; color: string }[];
}

const EquipmentStateHistory: React.FC<EquipmentStateHistoryProps> = ({
  show,
  onHide,
  equipmentName,
  stateHistory,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Histórico de Estados - {equipmentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {stateHistory.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {stateHistory.map((state, index) => (
                <tr key={index}>
                  <td>{new Date(state.date).toLocaleString()}</td>
                  <td style={{ color: state.color }}>{state.stateName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Nenhum histórico de estados disponível.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EquipmentStateHistory;
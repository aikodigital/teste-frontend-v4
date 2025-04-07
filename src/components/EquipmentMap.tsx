import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Spinner } from "react-bootstrap";
import EquipmentStateHistory from "./EquipmentStateHistory";

// Tipos de dados
interface Equipment {
  id: string;
  name: string;
}

interface EquipmentPosition {
  equipmentId: string;
  positions: { lat: number; lon: number; date: string }[];
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: { date: string; equipmentStateId: string }[];
}

// Ícone personalizado para o marcador
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const EquipmentMap = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [positions, setPositions] = useState<EquipmentPosition[]>([]);
  const [states, setStates] = useState<EquipmentState[]>([]);
  const [stateHistory, setStateHistory] = useState<EquipmentStateHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState<{
    name: string;
    history: { date: string; stateName: string; color: string }[];
  } | null>(null); // Estado para o equipamento selecionado
  
  const mapRef = useRef<L.Map | null>(null); // Referência para o mapa

  useEffect(() => {
    setTimeout(() => {
      import("../data/equipment.json").then((data) => {
        console.log("Equipment data:", data.default);
        setEquipment(data.default);
      });
      import("../data/equipmentPositionHistory.json").then((data) => {
        console.log("Position data:", data.default);
        setPositions(data.default);
      });
      import("../data/equipmentState.json").then((data) => {
        console.log("State data:", data.default);
        setStates(data.default);
      });
      import("../data/equipmentStateHistory.json").then((data) => {
        console.log("State history data:", data.default);
        setStateHistory(data.default);
      });
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (positions.length > 0 && mapRef.current) {
      // Calcula os limites (bounds) com base nas posições dos equipamentos
      const bounds = L.latLngBounds(
        positions.flatMap((pos) =>
          pos.positions.map((p) => [p.lat, p.lon] as [number, number])
        )
      );
      mapRef.current.fitBounds(bounds); // Ajusta o mapa para mostrar todos os marcadores
    }
  }, [positions]); // Executa quando as posições são carregadas

  const handleMarkerClick = (equipmentId: string) => {
    const equipmentName =
      equipment.find((eq) => eq.id === equipmentId)?.name ??
      "Equipamento Desconhecido";
    const equipmentStateHistory = stateHistory.find(
      (history) => history.equipmentId === equipmentId
    );

    const history = equipmentStateHistory
      ? equipmentStateHistory.states
          .map((state) => {
            const matchedState = states.find(
              (s) => s.id === state.equipmentStateId
            );
            return {
              date: state.date,
              stateName: matchedState?.name ?? "Desconhecido",
              color: matchedState?.color ?? "#000",
            };
          })
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ) // Ordenar por data
      : [];

    setSelectedEquipment({ name: equipmentName, history });
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null); // Limpa o equipamento selecionado ao fechar o modal
  };

  if (loading) {
    return <Spinner animation="border" className="m-3" />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Mapa de Equipamentos</h2>
      <MapContainer
        center={[-19.126536, -42.947756]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
        ref={mapRef} // Adiciona a referência ao mapa
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((pos) => {
          const sortedPositions = pos.positions.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const lastPosition = sortedPositions[0];

          return lastPosition ? (
            <Marker
              key={pos.equipmentId}
              position={[lastPosition.lat, lastPosition.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(pos.equipmentId), // Abre o modal ao clicar no marcador
              }}
            >
              <Popup>
                <strong>
                  {equipment.find((eq) => eq.id === pos.equipmentId)?.name ??
                    "Equipamento Desconhecido"}
                </strong>{" "}
                <br />
                Última posição registrada:{" "}
                {new Date(lastPosition.date).toLocaleString()}
                <br />
                Último estado:{" "}
                {(() => {
                  const equipmentStateHistory = stateHistory.find(
                    (history) => history.equipmentId === pos.equipmentId
                  );
                  if (equipmentStateHistory) {
                    const lastState = equipmentStateHistory.states.sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )[0];
                    const matchedState = states.find(
                      (state) => state.id === lastState?.equipmentStateId
                    );
                    return matchedState?.name ?? "Desconhecido";
                  }
                  return "Desconhecido";
                })()}
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
     {/* Relação do maquinário e seu último estado */}
<div className="mt-4">
  <h3>Relação do Maquinário</h3>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Equipamento</th>
        <th>Último Estado</th>
      </tr>
    </thead>
    <tbody>
      {equipment.map((eq) => {
        const equipmentStateHistory = stateHistory.find(
          (history) => history.equipmentId === eq.id
        );
        const lastState = equipmentStateHistory
          ? equipmentStateHistory.states.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0]
          : null;
        const matchedState = lastState
          ? states.find((state) => state.id === lastState.equipmentStateId)
          : null;

        return (
          <tr key={eq.id}>
            <td>{eq.name}</td>
            <td>{matchedState?.name ?? "Estado Desconhecido"}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

      {/* Modal para exibir o histórico de estados */}
      {selectedEquipment && (
        <EquipmentStateHistory
          show={!!selectedEquipment}
          onHide={handleCloseModal}
          equipmentName={selectedEquipment.name}
          stateHistory={selectedEquipment.history}
        />
      )}
    </div>
  );
};

export default EquipmentMap;

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import useEquipmentStore from "@/store/useEquipmentStore";
import {
  Equipment,
  EquipmentState,
  EquipmentModel,
  EquipmentPositionEntry,
  SelectedEquipment,
  StateHistory,
} from "@/types"; // Importando todos os tipos necessários

const containerStyle = {
  width: "100%",
  height: "500px",
};

const initialCenter = {
  lat: -19.126536,
  lng: -45.947756,
};

const MapComponent = () => {
  // Definir estado para verificar se estamos no cliente
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Isso garante que estamos no lado do cliente
    setIsClient(true);
  }, []);

  const {
    loadEquipmentData,
    equipment,
    getLatestPosition,
    getLatestState,
    getStateHistory,
    getEquipmentModel,
  } = useEquipmentStore();

  // Carrega a API do Google Maps, verificando se a chave está presente
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Forçando string para evitar erro de tipo
  });

  // Definir o estado com tipos específicos
  const [selectedEquipment, setSelectedEquipment] =
    useState<SelectedEquipment | null>(null); // Controle de equipamento selecionado
  const [filters, setFilters] = useState({
    state: "Todos os Estados",
    model: "Todos os Modelos",
  });
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [selectedHistory, setSelectedHistory] = useState<StateHistory[]>([]); // Histórico do equipamento

  // Carrega os dados dos equipamentos
  useEffect(() => {
    loadEquipmentData();
  }, [loadEquipmentData]);

  // Se não estamos no cliente ou o mapa não foi carregado, retorna um placeholder
  if (!isClient || !isLoaded) {
    return <div>Carregando o mapa...</div>;
  }

  // Converte `lon` para `lng` e organiza os dados para o mapa
  const equipmentWithPositions = equipment.map((eq: Equipment) => {
    const position = getLatestPosition(eq.id);
    const state = getLatestState(eq.id);
    const model =
      getEquipmentModel(eq.equipmentModelId)?.name || "Modelo Desconhecido";
    if (position) {
      // Convertendo `lon` para `lng` ao criar uma nova propriedade `lng`
      return {
        ...eq,
        position: {
          ...position,
          lng: position.lon, // Convertendo `lon` para `lng`
        },
        state,
        model, // Adicionando a propriedade `model`
      };
    }
    return { ...eq, position: undefined, state, model };
  });

  // Filtra os equipamentos com base nos filtros aplicados
  const filteredEquipment = equipmentWithPositions.filter((eq: Equipment) => {
    const matchesState =
      filters.state === "Todos os Estados" || eq.state?.name === filters.state;
    const matchesModel =
      filters.model === "Todos os Modelos" || eq.model === filters.model;
    return matchesState && matchesModel && eq.position;
  });

  const handleMarkerClick = (equipmentId: string) => {
    const selectedPosition = getLatestPosition(equipmentId);
    const equipmentData = equipment.find(
      (eq: Equipment) => eq.id === equipmentId
    ); // Tipagem explícita

    if (equipmentData) {
      const equipmentModel = getEquipmentModel(equipmentData.equipmentModelId); // Obtenha o modelo do equipamento

      const model = equipmentData.name || "Modelo Desconhecido"; // Exibir o nome correto (ex: CA-0001)
      const type = equipmentModel?.name || "Tipo Desconhecido"; // Exibir o tipo correto (ex: Caminhão de carga)

      setSelectedEquipment({
        id: equipmentData.id,
        name: model, // Aqui está o nome do equipamento (ex: CA-0001)
        type: type, // Aqui está o tipo do equipamento (ex: Caminhão de carga)
        position: {
          lat: selectedPosition?.lat || 0,
          lon: selectedPosition?.lon || 0,
        },
      });

      const history = getStateHistory(equipmentId); // Obtenha o histórico de estados
      setSelectedHistory(history);
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div className="filters">
        <select
          className="filter"
          value={filters.state}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, state: e.target.value }))
          }
        >
          <option value="Todos os Estados">Todos os Estados</option>
          <option value="Operando">Operando</option>
          <option value="Parado">Parado</option>
          <option value="Manutenção">Manutenção</option>
        </select>
        <select
          className="filter"
          value={filters.model}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, model: e.target.value }))
          }
        >
          <option value="Todos os Modelos">Todos os Modelos</option>
          <option value="Caminhão de carga">Caminhão de carga</option>
          <option value="Harvester">Harvester</option>
          <option value="Garra traçadora">Garra traçadora</option>
        </select>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={8}
      >
        {filteredEquipment.map(
          (eq: Equipment) =>
            eq.position &&
            typeof eq.position.lat === "number" && // Verificando se `lat` é um número
            typeof eq.position.lng === "number" && ( // Verificando se `lng` é um número
              <Marker
                key={eq.id}
                position={{ lat: eq.position.lat, lng: eq.position.lng }} // Usando `lng` após conversão
                onClick={() => handleMarkerClick(eq.id)}
              />
            )
        )}
      </GoogleMap>

      {/* Modal com histórico detalhado */}
      {showModal && selectedEquipment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96 max-h-96 overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-white bg-red-500 px-4 py-2 rounded"
              onClick={closeModal}
            >
              Fechar
            </button>

            <h2 className="font-bold text-lg mb-2">
              Histórico de Estados - {selectedEquipment.name}
            </h2>
            <p className="text-sm mb-4">Tipo: {selectedEquipment.type}</p>

            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {selectedHistory.map((entry, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-sm">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`inline-block px-2 py-1 text-white ${
                          entry.state === "Operando"
                            ? "bg-green-500"
                            : entry.state === "Parado"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } rounded`}
                      >
                        {entry.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import equipmentData from "../data/equipment.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentModelData from "../data/equipmentModel.json";
import Filter from './Filter';  // Importe o componente de filtro
import HistoryModal from './HistoryModal';  // Importe o componente HistoryModal
import SideModal from './SideModal';  // Importe o componente SideModal

const MapView = () => {
    const [equipments, setEquipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // modalVerMais
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // modal laterel
    const [showSideModal, setShowSideModal] = useState(false);
    const [sideModalEquipment, setSideModalEquipment] = useState(null);
    // historicoLoc
    const [equipmentPath, setEquipmentPath] = useState([]);

    const [filterState, setFilterState] = useState(""); // Estado para filtrar por estado
    const [filterModel, setFilterModel] = useState(""); // Estado para filtrar por modelo

    const filteredEquipments = equipments.filter((equipment) =>
        (equipment.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterState ? equipment.stateHistory.length && equipment.stateHistory[0].stateInfo?.name === filterState : true) &&
        (filterModel ? equipment.model?.name === filterModel : true)
    );


    const handleOpenSideModal = (equipment) => {
        setSideModalEquipment(equipment);
        setShowSideModal(true);

        // Buscar histórico de posições do equipamento selecionado
        const positionHistory = equipmentPositionHistory.find((pos) => pos.equipmentId === equipment.id);
        if (positionHistory) {
            setEquipmentPath(positionHistory.positions.map((p) => [p.lat, p.lon]));
        } else {
            setEquipmentPath([]);
        }
    };

    const handleShowHistory = (equipment) => {
        setSelectedEquipment(equipment);
        setShowModal(true);
    };

    const handleToggleHistory = (equipmentId) => {
        setActivePaths((prev) => ({
            ...prev,
            [equipmentId]: !prev[equipmentId],
        }));
    };

    const getStatusIcon = (state) => {
        let color;

        // Definindo a cor do ícone baseado no estado do equipamento
        if (state === "Operando") {
            color = "green";
        } else if (state === "Manutenção") {
            color = "red";
        } else if (state === "Parado") {
            color = "yellow";
        } else {
            color = "gray"; // Cor padrão para "Desconhecido"
        }

        return new L.DivIcon({
            className: "", // Removendo o estilo padrão do ícone
            html: `<div style="width: 18px; height: 18px; background-color: ${color}; border-radius: 50%;"></div>`, // Bola colorida
            iconSize: [0, 0], // Tamanho do ícone
        });
    };

    const calculateProductivity = (equipment, stateHistory) => {
        if (!stateHistory || stateHistory.length === 0) return "Indeterminado";

        // Ordenar os estados por data para garantir a sequência correta
        const sortedHistory = [...stateHistory].sort((a, b) => new Date(a.date) - new Date(b.date));

        // Identificar o primeiro e o último registro para calcular o total de horas analisadas
        const firstRecordTime = new Date(sortedHistory[0].date);
        const lastRecordTime = new Date(sortedHistory[sortedHistory.length - 1].date);
        const totalTime = (lastRecordTime - firstRecordTime) / (1000 * 60 * 60); // Tempo total em horas

        if (totalTime <= 0) return "Indeterminado";

        // Calcular tempo total "Operando"
        let totalOperatingTime = 0;
        for (let i = 0; i < sortedHistory.length - 1; i++) {
            const currentState = sortedHistory[i];
            const nextState = sortedHistory[i + 1];

            if (currentState.equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57") { // Estado "Operando"
                const startTime = new Date(currentState.date);
                const endTime = new Date(nextState.date);
                totalOperatingTime += (endTime - startTime) / (1000 * 60 * 60); // Convertendo de ms para horas
            }
        }

        // Calcular percentual de produtividade
        const productivityPercentage = (totalOperatingTime / totalTime) * 100;

        return `${productivityPercentage.toFixed(2)}%`;
    };

    const calculateTotalEarnings = (equipment, stateHistory, model) => {
        if (!stateHistory || stateHistory.length === 0 || !model) return "R$0,00";

        // Buscar os ganhos por hora do modelo do equipamento
        const earningsMap = {};
        model.hourlyEarnings.forEach(earning => {
            earningsMap[earning.equipmentStateId] = earning.value;
        });

        // Ordenar o histórico por data para evitar cálculos errados
        const sortedHistory = [...stateHistory].sort((a, b) => new Date(a.date) - new Date(b.date));

        let totalEarnings = 0;

        for (let i = 0; i < sortedHistory.length; i++) {
            const currentState = sortedHistory[i];
            let nextState = sortedHistory[i + 1];  // Alterado de const para let

            if (!nextState) {
                // Se não houver um próximo estado, considerar o tempo até o momento atual
                nextState = { date: new Date().toISOString() };
            }

            const stateEarnings = earningsMap[currentState.equipmentStateId] || 0; // Pegando o valor do estado atual
            const startTime = new Date(currentState.date);
            const endTime = new Date(nextState.date);
            const hours = (endTime - startTime) / (1000 * 60 * 60); // Convertendo de ms para horas

            if (hours > 0) {
                totalEarnings += stateEarnings * hours;
            }
        }

        return totalEarnings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    useEffect(() => {
        const combinedData = equipmentData.map((equipment) => {
            const model = equipmentModelData.find((m) => m.id === equipment.equipmentModelId);
            const position = equipmentPositionHistory.find((pos) => pos.equipmentId === equipment.id);
            const stateHistory = equipmentStateHistory.find((state) => state.equipmentId === equipment.id);

            const latestPosition = position ? position.positions[position.positions.length - 1] : null;
            const states = stateHistory
                ? stateHistory.states.map((s) => ({
                    ...s,
                    stateInfo: equipmentState.find((state) => state.id === s.equipmentStateId),
                }))
                : [];

            return {
                ...equipment,
                model,
                position: latestPosition,
                stateHistory: states.reverse(), // Ordena do mais recente para o mais antigo
            };
        });

        setEquipments(combinedData);
    }, []);

    return (
        <div className="relative h-screen">
            {/* Filtro acima do mapa */}
            <Filter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterState={filterState}
                setFilterState={setFilterState}
                filterModel={filterModel}
                setFilterModel={setFilterModel}
                equipments={equipments}
            />

            {/* Mapa */}
            <MapContainer center={[-19.126536, -45.947756]} zoom={10} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredEquipments.map((equipment) =>
                    equipment.position ? (
                        <Marker
                            key={equipment.id}
                            position={[equipment.position.lat, equipment.position.lon]}
                            icon={getStatusIcon(
                                equipment.stateHistory.length ? equipment.stateHistory[0].stateInfo?.name : "Desconhecido"
                            )}
                            eventHandlers={{
                                click: () => handleOpenSideModal(equipment), // Adiciona o clique para abrir o modal lateral
                                mouseover: (e) => {
                                    e.target.openPopup();
                                },
                            }}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-bold text-lg">{equipment.name}</h3>
                                    <p>
                                        <strong>Modelo:</strong> {equipment.model ? equipment.model.name : "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong>Posição:</strong> Latitude: {equipment.position.lat}, Longitude: {equipment.position.lon}
                                    </p>

                                    <div className="mt-4">
                                        {/* Estado Atual */}
                                        <strong className="font-semibold mr-2">Estado Atual:</strong>
                                        <span
                                            className={`${equipment.stateHistory.length
                                                ? equipment.stateHistory[0].stateInfo?.name === "Operando"
                                                    ? "text-green-500" // Verde para "Operando"
                                                    : equipment.stateHistory[0].stateInfo?.name === "Manutenção"
                                                        ? "text-red-500" // Vermelho para "Manutenção"
                                                        : equipment.stateHistory[0].stateInfo?.name === "Parado"
                                                            ? "text-yellow-500" // Amarelo para "Parado"
                                                            : "text-gray-500" // Cor padrão se o estado for desconhecido
                                                : "text-gray-500" // Cor padrão se não tiver histórico
                                                }`}
                                        >
                                            {equipment.stateHistory.length
                                                ? equipment.stateHistory[0].stateInfo?.name
                                                : "Desconhecido"}
                                        </span>
                                    </div>

                                    {/* Botão para abrir o modal de histórico */}
                                    <button
                                        onClick={() => handleShowHistory(equipment)}
                                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer transition"
                                    >
                                        Ver Histórico de Posições
                                    </button>
                                </div>
                            </Popup>
                            <Tooltip>{equipment.name}</Tooltip>
                        </Marker>

                    ) : null
                )}

                {/* Exibir a linha do trajeto do equipamento selecionado */}
                {equipmentPath.length > 1 && (
                    <Polyline positions={equipmentPath} color="blue" />
                )}
            </MapContainer>

            <HistoryModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedEquipment={selectedEquipment}
            />

            <SideModal
                showSideModal={showSideModal}
                setShowSideModal={setShowSideModal}
                sideModalEquipment={sideModalEquipment}
                calculateProductivity={calculateProductivity}
                calculateTotalEarnings={calculateTotalEarnings}
            />
        </div>
    );
};

export default MapView;

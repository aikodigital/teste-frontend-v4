import React, { useState } from 'react';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import { Equipment } from '../types'; // Assumindo que você tem um tipo Equipment

interface HistoryPositionProps {
    equipmentData: Equipment[];
    onFilter?: (positions: { lat: number, lon: number }[]) => void;
}

const HistoryPosition: React.FC<HistoryPositionProps> = ({ equipmentData, onFilter }) => {
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
    const [startDateTime, setStartDateTime] = useState<string>('');
    const [endDateTime, setEndDateTime] = useState<string>('');
    const [filteredPositions, setFilteredPositions] = useState<any[]>([]);
    const [latLonArray, setLatLonArray] = useState<{ lat: number; lon: number }[]>([]);
    const [noRecords, setNoRecords] = useState<boolean>(false);

    const handleFilter = () => {
        if (selectedEquipmentId && startDateTime && endDateTime) {
            const equipmentHistory = equipmentPositionHistoryData.find(history => history.equipmentId === selectedEquipmentId);
            if (equipmentHistory) {
                const filtered = equipmentHistory.positions.filter(position => {
                    const positionDate = new Date(position.date).getTime();
                    return positionDate >= new Date(startDateTime).getTime() && positionDate <= new Date(endDateTime).getTime();
                });

                if (filtered.length === 0) {
                    setNoRecords(true);
                } else {
                    setNoRecords(false);
                    setFilteredPositions(filtered);

                    // Criando um array apenas com lat e lon
                    const latLon = filtered.map(pos => ({
                        lat: pos.lat,
                        lon: pos.lon
                    }));

                    setLatLonArray(latLon);
                    if (onFilter) {
                        onFilter(latLon);
                    }

                }
            } else {
                setNoRecords(true);
            }
        }
    };

    return (
        <div>
            <h3>Histórico de Posições</h3>
            <div>
                <label>
                    Selecione o Equipamento:
                    <select
                        value={selectedEquipmentId}
                        onChange={(e) => setSelectedEquipmentId(e.target.value)}
                    >
                        <option value="">-- Selecione --</option>
                        {equipmentData.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Data e Hora Inicial:
                    <input
                        type="datetime-local"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Data e Hora Final:
                    <input
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={handleFilter}>
                Aplicar Filtro
            </button>

            {noRecords && <p>Não há registros para o período selecionado.</p>}

        </div>
    );
};

export default HistoryPosition;

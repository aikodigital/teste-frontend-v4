document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    Promise.all([
        fetch('data/equipment.json').then(response => response.json()),
        fetch('data/equipmentPositionHistory.json').then(response => response.json()),
        fetch('data/equipmentStateHistory.json').then(response => response.json()),
        fetch('data/equipmentState.json').then(response => response.json()),

    ]).then(([equipments, positionHistory, stateHistory, states, model]) => {

        positionHistory.forEach(equipment => {
            const latestPosition = equipment.positions[equipment.positions.length - 1];
            if (!latestPosition) {
                console.error(`Sem posição encontrada para equipamento ${equipment.equipmentId}`);
                return; 
            }
            
            const equipmentState = stateHistory.find(state => state.equipmentId === equipment.equipmentId);
            if (!equipmentState) {
                console.error(`Sem estado encontrado para equipamento ${equipment.equipmentId}`);
                return; 
            }
            
            const latestStateId = equipmentState.states[equipmentState.states.length - 1].equipmentStateId;
            const stateDetails = states.find(s => s.id === latestStateId);
            if (!stateDetails) {
                console.error(`Sem detalhes de estado encontrados para equipamento ${equipment.equipmentId}`);
                return; 
            }

            const marker = L.marker([latestPosition.lat, latestPosition.lon]).addTo(map);

            const popupContent = `
                <div>
                    <strong>${getEquipmentName(equipment.equipmentId, equipments)}</strong><br>
                    Estado atual: <span style="color: ${stateDetails.color};">${stateDetails.name}</span><br>
                    Latitude: ${latestPosition.lat}<br>
                    Longitude: ${latestPosition.lon}
                </div>
            `;
            marker.bindPopup(popupContent);

            marker.openPopup();

            marker.on('click', () => {
                map.setView([latestPosition.lat, latestPosition.lon], map.getZoom());
                marker.openPopup();
                displayEquipmentHistory(equipment.equipmentId, equipments, stateHistory, states);
            });
        });
    }).catch(error => {
        console.error('Erro ao carregar os dados JSON:', error);
    });

    function getEquipmentName(id, equipments) {
        const equipment = equipments.find(eq => eq.id === id);
        return equipment ? equipment.name : 'Desconhecido';
    }

    function formatDateTimeToLocal(date) {
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    
    function displayEquipmentHistory(equipmentId, equipments, stateHistory, states) {
        const history = stateHistory.find(hist => hist.equipmentId === equipmentId);
        const equipmentName = getEquipmentName(equipmentId, equipments);
        let historyHtml = `<h3>${equipmentName} - Histórico de Estados</h3><ul>`;
    
        history.states.forEach(stateRecord => {
            const state = states.find(s => s.id === stateRecord.equipmentStateId);
            const date = new Date(stateRecord.date);
            const dateTimeStr = formatDateTimeToLocal(date);
            historyHtml += `
                <li>
                    <span>${dateTimeStr}</span>: ${state.name}
                </li>
            `;
        });
        historyHtml += '</ul>';
    
        const equipmentInfoDiv = document.getElementById('equipment-info');
        equipmentInfoDiv.innerHTML = historyHtml;
        equipmentInfoDiv.style.display = 'block'; 
    }   
});

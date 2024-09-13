// Dados simulados
const equipment = [
    { id: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9", name: "CA-0001", modelId: "a3540227-2f0e-4362-9517-92f41dabbfdf" }
];

const equipmentState = [
    { id: "0808344c-454b-4c36-89e8-d7687e692d57", name: "Operando", color: "#2ecc71" },
    { id: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f", name: "Manutenção", color: "#e74c3c" }
];

const equipmentModel = [
    {
        id: "a3540227-2f0e-4362-9517-92f41dabbfdf",
        name: "Caminhão de carga",
        hourlyEarnings: [
            { equipmentStateId: "0808344c-454b-4c36-89e8-d7687e692d57", value: 100 },
            { equipmentStateId: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f", value: -20 }
        ]
    }
];

const equipmentPositionHistory = [
    {
        equipmentId: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        positions: [
            { date: "2021-02-01T03:00:00.000Z", lat: -19.126536, lon: -45.947756 }
        ]
    }
];

const equipmentStateHistory = [
    {
        equipmentId: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        states: [
            { date: "2021-02-01T03:00:00.000Z", equipmentStateId: "0808344c-454b-4c36-89e8-d7687e692d57" },
            { date: "2021-02-02T03:00:00.000Z", equipmentStateId: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f" }
        ]
    }
];

// Inicializa o mapa
const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Cria um objeto de referências para os marcadores
let markers = {};

// Preenche os filtros de estado e modelo
function populateFilters() {
    const stateFilter = document.getElementById('stateFilter');
    const modelFilter = document.getElementById('modelFilter');

    equipmentState.forEach(state => {
        const option = document.createElement('option');
        option.value = state.id;
        option.textContent = state.name;
        stateFilter.appendChild(option);
    });

    equipmentModel.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.name;
        modelFilter.appendChild(option);
    });
}

// Calcula o ganho total
function calculateEarnings(equipmentId) {
    const stateHistories = equipmentStateHistory.find(hist => hist.equipmentId === equipmentId).states;
    const model = equipmentModel.find(model => model.id === equipment.find(eq => eq.id === equipmentId).modelId);

    let totalEarnings = 0;

    stateHistories.forEach(stateHistory => {
        const stateData = equipmentState.find(state => state.id === stateHistory.equipmentStateId);
        const earnings = model.hourlyEarnings.find(earn => earn.equipmentStateId === stateData.id);
        
        if (earnings) {
            totalEarnings += earnings.value; // Assume 1 hora por estado para simplicidade
        }
    });

    return totalEarnings;
}

// Calcula a produtividade
function calculateProductivity(equipmentId) {
    const stateHistories = equipmentStateHistory.find(hist => hist.equipmentId === equipmentId).states;
    const totalHours = stateHistories.length; // Assume 1 hora por estado para simplicidade
    const operatingHours = stateHistories.filter(stateHistory => 
        equipmentState.find(state => state.id === stateHistory.equipmentStateId).name === "Operando"
    ).length;

    return (operatingHours / totalHours) * 100;
}

// Cria e adiciona o marcador
function createMarker(equipmentId, position, stateData, equipmentData) {
    const marker = L.marker([position.lat, position.lon]).addTo(map);

    const totalEarnings = calculateEarnings(equipmentId);
    const productivity = calculateProductivity(equipmentId);

    let popupContent = `
        <div>
            <h2>${equipmentData.name}</h2>
            <p>Estado atual: <span style="color:${stateData.color}">${stateData.name}</span></p>
            <p>Ganho total: $${totalEarnings.toFixed(2)}</p>
            <p>Produtividade: ${productivity.toFixed(2)}%</p>
            <button id="history-btn" style="padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 5px;">Ver Histórico</button>
        </div>
    `;

    marker.bindPopup(popupContent);

    markers[equipmentId] = marker;

    marker.on('popupopen', function() {
        const historyBtn = document.getElementById('history-btn');
        if (historyBtn) {
            historyBtn.addEventListener('click', function() {
                showStateHistory(equipmentId, position);
            });
        }
    });
}

// Exibe o histórico de estados
function showStateHistory(equipmentId, position) {
    const states = equipmentStateHistory.find(hist => hist.equipmentId === equipmentId).states;
    let historyContent = '<div><h3>Histórico de Estados:</h3>';
    states.forEach(state => {
        const stateInfo = equipmentState.find(st => st.id === state.equipmentStateId);
        historyContent += `<p>${new Date(state.date).toLocaleDateString()}: ${stateInfo.name}</p>`;
    });
    historyContent += '</div>';
    
    L.popup()
        .setLatLng([position.lat, position.lon])
        .setContent(historyContent)
        .openOn(map);
}

// Filtra e mostra os equipamentos no mapa
function filterAndUpdateMarkers() {
    const stateFilter = document.getElementById('stateFilter').value;
    const modelFilter = document.getElementById('modelFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Remove todos os marcadores existentes
    Object.values(markers).forEach(marker => map.removeLayer(marker));
    markers = {};

    equipmentPositionHistory.forEach(equipmentHistory => {
        const equipmentData = equipment.find(eq => eq.id === equipmentHistory.equipmentId);
        const latestPosition = equipmentHistory.positions[0]; // Assume a posição mais recente
        const equipmentStateData = equipmentStateHistory.find(hist => hist.equipmentId === equipmentHistory.equipmentId);
        
        if (!equipmentStateData || !equipmentData) return;

        const stateId = equipmentStateData.states[0].equipmentStateId;
        const stateData = equipmentState.find(state => state.id === stateId);

        // Verifica se o equipamento corresponde aos filtros
        const matchesStateFilter = !stateFilter || stateFilter === stateId;
        const matchesModelFilter = !modelFilter || modelFilter === equipmentData.modelId;
        const matchesSearch = !searchInput || equipmentData.name.toLowerCase().includes(searchInput);

        if (matchesStateFilter && matchesModelFilter && matchesSearch) {
            createMarker(equipmentHistory.equipmentId, latestPosition, stateData, equipmentData);
        }
    });
}

// Adiciona os manipuladores de eventos para os filtros e pesquisa
function addEventListeners() {
    document.getElementById('stateFilter').addEventListener('change', filterAndUpdateMarkers);
    document.getElementById('modelFilter').addEventListener('change', filterAndUpdateMarkers);
    document.getElementById('searchInput').addEventListener('input', filterAndUpdateMarkers);
}

// Inicializa a página
function init() {
    populateFilters();
    filterAndUpdateMarkers();
    addEventListeners();
}

// Inicializa o mapa e aplica os filtros
init();

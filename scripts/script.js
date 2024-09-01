// Inicializa o mapa
const map = new ol.Map({
    target: 'map', // Associa o mapa ao div com id 'map'
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Usa OpenStreetMap como camada base
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-45.947756, -19.126536]), // Centraliza a visualização inicial
        zoom: 10,
        minZoom: 5,
        maxZoom: 20
    })
});

// Função para carregar ícones personalizados
function carregarIcone(equipmentModelName) {
    let iconUrl = '';
    switch (equipmentModelName) {
        case 'Caminhão de carga':
            iconUrl = 'img/truck-icon.png';
            break;
        case 'Harvester':
            iconUrl = 'img/harvester-icon.png';
            break;
        case 'Garra traçadora':
            iconUrl = 'img/claw-icon.png';
            break;
        default:
            iconUrl = 'img/default-icon.png'; // Ícone padrão caso não encontre o equipamento
    }

    return new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: iconUrl,
            size: [40, 40], // Define o tamanho do ícone
            imgSize: [40, 40], // Garante que a imagem seja renderizada em 40x40 pixels
            className: 'custom-icon' // Adiciona uma classe a todas as imagens
        })
    });
}

// Função para carregar ícones de status e alinhá-los no canto inferior direito
function carregarIconeStatus(equipmentState) {
    let iconUrl = '';
    switch (equipmentState) {
        case 'Operando':
            iconUrl = 'img/operating-icon.png';
            break;
        case 'Manutenção':
            iconUrl = 'img/maintance-icon.png';
            break;
        case 'Parado':
            iconUrl = 'img/pause-icon.png';
            break;
        default:
            return null; // Retorna null se o estado for desconhecido ou não mapeado
    }

    return new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0, 1], // Alinha o ícone de status no canto inferior direito
            src: iconUrl,
            size: [20, 20], // Define o tamanho do ícone de status
            imgSize: [20, 20], // Garante que a imagem seja renderizada em 20x20 pixels
            className: 'status-icon' // Classe customizada para o ícone de status
        })
    });
}

// Função para carregar o estilo do nome do equipamento
function carregarTextoNome(nome) {
    return new ol.style.Style({
        text: new ol.style.Text({
            font: 'bold 12px Calibri,sans-serif',
            fill: new ol.style.Fill({ color: '#30373D' }),
            offsetY: -45, // Ajusta a posição vertical do texto
            textAlign: 'center', // Centraliza o texto
            text: nome
        })
    });
}

// Função para buscar dados e adicionar marcadores e preencher a tabela
function carregarDados() {
    Promise.all([
        fetch('data/equipment.json').then(response => response.json()),
        fetch('data/equipmentModel.json').then(response => response.json()),
        fetch('data/equipmentPositionHistory.json').then(response => response.json()),
        fetch('data/equipmentStateHistory.json').then(response => response.json()),
        fetch('data/equipmentState.json').then(response => response.json())
    ]).then(([equipmentData, equipmentModelData, positionData, stateHistoryData, stateData]) => {
        const equipmentModelMap = {};
        const equipmentStateMap = {};

        // Mapeia os modelos de equipamento
        equipmentModelData.forEach(model => {
            equipmentModelMap[model.id] = model.name;
        });

        // Mapeia os estados de equipamento
        stateData.forEach(state => {
            equipmentStateMap[state.id] = state.name;
        });

        const features = [];

        // Obtenha a referência da tabela
        const tableBody = document.querySelector('#equipment-table tbody');

        positionData.forEach(equipment => {
            const equipamentoInfo = equipmentData.find(e => e.id === equipment.equipmentId);
            if (equipamentoInfo) {
                const equipmentModelName = equipmentModelMap[equipamentoInfo.equipmentModelId];
                const iconStyle = carregarIcone(equipmentModelName);

                // Pega a posição mais recente do equipamento
                const lastPosition = equipment.positions.reduce((latest, current) => {
                    return new Date(current.date) > new Date(latest.date) ? current : latest;
                });

                const feature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([lastPosition.lon, lastPosition.lat])),
                    name: equipamentoInfo.name,
                    model: equipmentModelName,
                    date: new Date(lastPosition.date).toLocaleString()
                });

                feature.setStyle([
                    iconStyle,
                    carregarTextoNome(equipamentoInfo.name)
                ]);
                features.push(feature);

                // Encontrar o estado mais recente do equipamento
                const stateHistory = stateHistoryData.find(state => state.equipmentId === equipment.equipmentId);
                let currentStateId = null;

                if (stateHistory) {
                    const latestState = stateHistory.states.reduce((latest, current) => {
                        return new Date(current.date) > new Date(latest.date) ? current : latest;
                    });

                    currentStateId = latestState ? latestState.equipmentStateId : null;
                }

                const equipmentState = currentStateId ? equipmentStateMap[currentStateId] : 'Desconhecido';

                // Adiciona o ícone de status se houver um estado mapeado
                if (equipmentState !== 'Desconhecido') {
                    const statusIconStyle = carregarIconeStatus(equipmentState);
                    if (statusIconStyle) {
                        const statusFeature = new ol.Feature({
                            geometry: new ol.geom.Point(ol.proj.fromLonLat([lastPosition.lon, lastPosition.lat])),
                        });
                        statusFeature.setStyle(statusIconStyle);
                        features.push(statusFeature);
                    }
                }

                // Adicione um listener de clique ao feature
                feature.set('equipamentoInfo', equipamentoInfo);
                feature.set('positions', equipment.positions);
                feature.set('stateHistory', stateHistory);

                map.on('singleclick', function(evt) {
                    map.forEachFeatureAtPixel(evt.pixel, function(clickedFeature) {
                        if (clickedFeature === feature) {
                            mostrarHistoricoNaTabela(clickedFeature.get('equipamentoInfo'), clickedFeature.get('positions'), clickedFeature.get('stateHistory'), equipmentModelMap, equipmentStateMap);
                            document.getElementById('historico-equipamento').scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                });

                // Adiciona efeito de hover
                map.on('pointermove', function(evt) {
                    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
                    map.forEachFeatureAtPixel(evt.pixel, function(hoveredFeature) {
                        if (hoveredFeature === feature) {
                            iconStyle.getImage().setScale(1.1); // Aumenta o ícone ao passar o mouse
                        } else {
                            iconStyle.getImage().setScale(1); // Retorna ao tamanho original
                        }
                    });
                });

                // Adicione uma linha à tabela
                const row = document.createElement('tr');

                const equipamentoCell = document.createElement('td');
                equipamentoCell.textContent = equipamentoInfo.name; // Nome do equipamento
                row.appendChild(equipamentoCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = equipmentState;
                row.appendChild(statusCell);

                const dataCell = document.createElement('td');
                dataCell.textContent = new Date(lastPosition.date).toLocaleDateString();
                row.appendChild(dataCell);

                const horaCell = document.createElement('td');
                horaCell.textContent = new Date(lastPosition.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                row.appendChild(horaCell);

                const localizacaoCell = document.createElement('td');
                localizacaoCell.textContent = 'São Paulo - SP, Brasil'; // Placeholder
                row.appendChild(localizacaoCell);

                const infoCell = document.createElement('td');
                const detailsButton = document.createElement('button');
                detailsButton.textContent = 'Detalhes';
                infoCell.appendChild(detailsButton);
                row.appendChild(infoCell);

                tableBody.appendChild(row);
            }
        });

        const vectorSource = new ol.source.Vector({
            features: features
        });

        const vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        map.addLayer(vectorLayer);

        const extent = vectorSource.getExtent();
        map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 20 });
    }).catch(error => console.error('Erro ao carregar os dados:', error));
}

// Função para mostrar o histórico completo na tabela
function mostrarHistoricoNaTabela(equipamentoInfo, positions, stateHistory, equipmentModelMap, equipmentStateMap) {
    const tableBody = document.querySelector('#equipment-table tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    positions
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordena do mais recente para o mais antigo
        .forEach(position => {
            const row = document.createElement('tr');

            const equipamentoCell = document.createElement('td');
            equipamentoCell.textContent = equipamentoInfo.name; // Nome do equipamento
            row.appendChild(equipamentoCell);

            const relevantState = stateHistory.states
                .filter(s => new Date(s.date) <= new Date(position.date))
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            const equipmentState = relevantState ? equipmentStateMap[relevantState.equipmentStateId] : 'Desconhecido';

            const statusCell = document.createElement('td');
            statusCell.textContent = equipmentState;
            row.appendChild(statusCell);

            const dataCell = document.createElement('td');
            dataCell.textContent = new Date(position.date).toLocaleDateString();
            row.appendChild(dataCell);

            const horaCell = document.createElement('td');
            horaCell.textContent = new Date(position.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            row.appendChild(horaCell);

            const localizacaoCell = document.createElement('td');
            localizacaoCell.textContent = 'São Paulo - SP, Brasil'; // Placeholder
            row.appendChild(localizacaoCell);

            const infoCell = document.createElement('td');
            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Detalhes';
            infoCell.appendChild(detailsButton);
            row.appendChild(infoCell);

            tableBody.appendChild(row);
        });
}

// Chama a função para carregar os dados e exibir no mapa e na tabela
carregarDados();

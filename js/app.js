// Configurações globais
const CONFIG = {
    MAP: {
      DEFAULT_VIEW: [-14.2350, -51.9253],
      DEFAULT_ZOOM: 4,
      TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      MAX_ZOOM: 18,
      MIN_ZOOM: 3
    },
    ICONS: {
      'CA': 'assets/icons/truck.png',      // Caminhão de Carga
      'HV': 'assets/icons/harvester.png',  // Harvester
      'GT': 'assets/icons/tracker.png',    // Garra Traçadora
      DEFAULT: 'assets/icons/truck.png'
    },
    COLORS: {
      ERROR: '#dc3545',
      WARNING: '#ffc107',
      SUCCESS: '#28a745',
      INFO: '#17a2b8',
      DEFAULT_STATE: '#6c757d'
    }
  };
  
  // Estado da aplicação
  const AppState = {
    map: null,
    miniMap: null,
    stateHistoryChart: null,
    currentEquipment: null,
    markers: {},
    data: {
      equipment: [],
      equipmentModel: [],
      equipmentState: [],
      equipmentStateHistory: [],
      equipmentPositionHistory: []
    },
    layers: {
      miniMap: {
        path: null,
        markers: []
      }
    }
  };
  
  // Inicialização da aplicação
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      showLoading();
      await loadAllData();
      initializeMap();
      initializeEventListeners();
      renderEquipmentMarkers();
      populateFilters();
      hideLoading();
    } catch (error) {
      console.error('Falha na inicialização:', error);
      showAlert('Falha ao carregar a aplicação. Por favor, recarregue a página.', 'error');
      hideLoading();
    }
  });
  
  // Carregamento de dados
  async function loadAllData() {
    const dataSources = [
      { name: 'equipment', url: 'data/equipment.json' },
      { name: 'equipmentModel', url: 'data/equipmentModel.json' },
      { name: 'equipmentState', url: 'data/equipmentState.json' },
      { name: 'equipmentStateHistory', url: 'data/equipmentStateHistory.json' },
      { name: 'equipmentPositionHistory', url: 'data/equipmentPositionHistory.json' }
    ];
  
    const loadPromises = dataSources.map(async (source) => {
      try {
        const response = await fetch(`${source.url}?t=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!data) throw new Error('Dados vazios recebidos');
        AppState.data[source.name] = data;
      } catch (error) {
        console.error(`Erro ao carregar ${source.name}:`, error);
        AppState.data[source.name] = [];
        throw error;
      }
    });
  
    await Promise.all(loadPromises);
  }
  
  // Inicialização do mapa
function initializeMap() {
    AppState.map = L.map('map', {
        preferCanvas: true,
        zoomSnap: 0.5
    });

    L.tileLayer(CONFIG.MAP.TILE_LAYER, {
        attribution: CONFIG.MAP.ATTRIBUTION,
        maxZoom: CONFIG.MAP.MAX_ZOOM,
        minZoom: CONFIG.MAP.MIN_ZOOM
    }).addTo(AppState.map);

    // Adicione este trecho para enquadrar os marcadores após carregar os dados
    setTimeout(() => {
        if (Object.keys(AppState.markers).length > 0) {
            const markersGroup = L.featureGroup(Object.values(AppState.markers));
            AppState.map.fitBounds(markersGroup.getBounds(), {
                padding: [50, 50],
                maxZoom: 15
            });
        } else {
            AppState.map.setView(CONFIG.MAP.DEFAULT_VIEW, CONFIG.MAP.DEFAULT_ZOOM);
        }
    }, 300); // Pequeno delay para garantir que os marcadores foram renderizados
}
  
  // Inicialização de event listeners
  function initializeEventListeners() {
    // Filtros
    document.getElementById('equipmentFilter').addEventListener('change', applyFilters);
    document.getElementById('stateFilter').addEventListener('change', applyFilters);
    document.getElementById('modelFilter').addEventListener('change', applyFilters);
    document.getElementById('fitToMarkersBtn').addEventListener('click', fitMapToVisibleMarkers);
    
    // Painel de detalhes
    document.getElementById('closeDetailsBtn').addEventListener('click', hideEquipmentDetails);
    document.getElementById('detailsOverlay').addEventListener('click', hideEquipmentDetails);
  }
  
  // Renderização dos marcadores no mapa
  function renderEquipmentMarkers() {
    clearAllMarkers();
  
    if (!AppState.data.equipment.length) {
      showAlert('Nenhum equipamento encontrado para exibir', 'warning');
      return;
    }
  
    AppState.data.equipment.forEach(equipment => {
      try {
        const positionHistory = AppState.data.equipmentPositionHistory.find(
          eph => eph.equipmentId === equipment.id
        );
        
        const latestPosition = getLatestPosition(positionHistory);
        if (!latestPosition) return;
  
        const latestState = getLatestEquipmentState(equipment.id);
        
        const marker = L.marker([latestPosition.lat, latestPosition.lon], {
          icon: createCustomIcon(equipment, latestState)
        }).addTo(AppState.map)
          .bindPopup(createPopupContent(equipment, latestState))
          .on('click', () => showEquipmentDetails(equipment.id));
        
        AppState.markers[equipment.id] = marker;
      } catch (error) {
        console.error(`Erro ao renderizar equipamento ${equipment.id}:`, error);
      }
    });
  }
  
  // Funções auxiliares para marcadores
  function getLatestPosition(positionHistory) {
    if (!positionHistory?.positions?.length) return null;
    
    return positionHistory.positions.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
  }
  
  function createCustomIcon(equipment, state) {
    const stateInfo = state ? 
      AppState.data.equipmentState.find(s => s.id === state.equipmentStateId) : 
      null;
    
    const stateColor = stateInfo?.color || CONFIG.COLORS.DEFAULT_STATE;
  
    return L.divIcon({
      className: 'equipment-marker',
      html: `
        <div style="position: relative; width: 32px; height: 32px;">
          <img src="${getEquipmentIcon(equipment.name)}" 
               style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));">
          <div style="position: absolute; bottom: -4px; right: -4px;
                      width: 14px; height: 14px; 
                      background-color: ${stateColor};
                      border: 2px solid white; border-radius: 50%;
                      box-shadow: 0 0 3px rgba(0,0,0,0.5);">
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  }
  
  function createPopupContent(equipment, state) {
    const model = AppState.data.equipmentModel.find(m => m.id === equipment.equipmentModelId);
    const stateInfo = state ? 
      AppState.data.equipmentState.find(s => s.id === state.equipmentStateId) : 
      { name: 'Desconhecido', color: CONFIG.COLORS.DEFAULT_STATE };
    
    const equipmentType = getEquipmentTypeName(equipment.name);
  
    return `
      <div style="min-width: 200px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <img src="${getEquipmentIcon(equipment.name)}" style="width: 24px; height: 24px;">
          <h6 style="margin: 0;">${equipment.name || `Equipamento ${equipment.id}`}</h6>
        </div>
        <p style="margin: 4px 0;"><strong>Tipo:</strong> ${equipmentType}</p>
        <p style="margin: 4px 0;"><strong>Modelo:</strong> ${model?.name || 'Desconhecido'}</p>
        <p style="margin: 4px 0;"><strong>Estado:</strong> 
          <span class="badge" style="background-color: ${stateInfo.color}">
            ${stateInfo.name}
          </span>
        </p>
      </div>
    `;
  }
  
  // Funções para o painel de detalhes
  function showEquipmentDetails(equipmentId) {
    try {
      AppState.currentEquipment = AppState.data.equipment.find(e => e.id === equipmentId);
      if (!AppState.currentEquipment) {
        showAlert('Equipamento não encontrado', 'error');
        return;
      }
  
      // Mostrar overlay e painel
      document.getElementById('detailsOverlay').classList.add('show');
      document.getElementById('equipmentDetails').style.display = 'block';
      document.body.classList.add('details-open');
  
      // Carregar conteúdo
      renderEquipmentBasicInfo();
      renderOperationInfo();
      renderMiniMap();
      renderStateHistoryChart();
  
      // Adicionar listener para tecla ESC
      document.addEventListener('keydown', handleEscapeKey);
    } catch (error) {
      console.error('Erro ao mostrar detalhes:', error);
      showAlert('Erro ao carregar detalhes do equipamento', 'error');
      hideEquipmentDetails();
    }
  }
  
  function hideEquipmentDetails() {
    document.getElementById('detailsOverlay').classList.remove('show');
    document.getElementById('equipmentDetails').style.display = 'none';
    document.body.classList.remove('details-open');
    destroyMiniMap();
    destroyStateHistoryChart();
    document.removeEventListener('keydown', handleEscapeKey);
    AppState.currentEquipment = null;
  }
  
  function handleEscapeKey(event) {
    if (event.key === 'Escape') hideEquipmentDetails();
  }
  
  function renderEquipmentBasicInfo() {
    const { currentEquipment } = AppState;
    const model = AppState.data.equipmentModel.find(m => m.id === currentEquipment.equipmentModelId);
    const latestState = getLatestEquipmentState(currentEquipment.id);
    const state = latestState ? 
      AppState.data.equipmentState.find(s => s.id === latestState.equipmentStateId) : 
      null;
    
    const equipmentType = getEquipmentTypeName(currentEquipment.name);
  
    document.getElementById('equipmentInfo').innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-3">
            <img src="${getEquipmentIcon(currentEquipment.name)}" style="width: 40px; height: 40px;">
            <h5 class="mb-0">${currentEquipment.name || `Equipamento ${currentEquipment.id}`}</h5>
          </div>
          <p class="mb-1"><strong>Tipo:</strong> ${equipmentType}</p>
          <p class="mb-1"><strong>Modelo:</strong> ${model?.name || 'Desconhecido'}</p>
          <p class="mb-0"><strong>Estado:</strong> 
            <span class="badge" style="background-color: ${state?.color || CONFIG.COLORS.DEFAULT_STATE}">
              ${state?.name || 'Desconhecido'}
            </span>
          </p>
        </div>
      </div>
    `;
  }
  
  function renderOperationInfo() {
    const { currentEquipment } = AppState;
    const stateHistory = AppState.data.equipmentStateHistory.find(
      esh => esh.equipmentId === currentEquipment.id
    );
  
    if (!stateHistory?.states?.length) {
      document.getElementById('operationInfo').innerHTML = `
        <div class="alert alert-info">Nenhum dado de operação disponível</div>
      `;
      return;
    }
  
    const sortedStates = [...stateHistory.states].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  
    const startDate = new Date(sortedStates[0].date);
    const endDate = new Date(sortedStates[sortedStates.length - 1].date);
  
    const operationalHours = calculateOperationalHours(stateHistory, startDate, endDate);
    const productivity = calculateProductivity(currentEquipment.id, startDate, endDate);
  
    document.getElementById('operationInfo').innerHTML = `
      <div class="mb-3">
        <strong>Período de Dados:</strong> 
        ${formatDate(startDate)} - ${formatDate(endDate)}
      </div>
      <div class="mb-3">
        <strong>Última Atualização:</strong> 
        ${formatDateTime(endDate)}
      </div>
      <div class="mb-3">
        <strong>Horas Operacionais:</strong> 
        ${operationalHours.toFixed(1)} horas
      </div>
      <div class="mb-3">
        <strong>Produtividade:</strong> 
        ${productivity.toFixed(1)}%
      </div>
      
    `;
  }
  
  // Funções do mini mapa
  function renderMiniMap(startDate, endDate) {
    // Destruir mapa existente
    destroyMiniMap();

    const { currentEquipment } = AppState;
    if (!currentEquipment) return;

    // Obter histórico de posições para o equipamento atual
    const positionHistory = AppState.data.equipmentPositionHistory.find(
        eph => eph.equipmentId === currentEquipment.id
    );

    // Verificar se há dados disponíveis
    if (!positionHistory?.positions?.length) {
        document.getElementById('miniMap').innerHTML = `
            <div class="alert alert-info">Nenhum dado de trajeto disponível</div>
        `;
        return;
    }

    try {
        // Processar e filtrar posições
        const positions = positionHistory.positions
            .map(p => ({
                ...p,
                date: new Date(p.date)
            }))
            .filter(p => {
                if (!startDate || !endDate) return true;
                return p.date >= startDate && p.date <= endDate;
            })
            .sort((a, b) => a.date - b.date);

        // Verificar se há posições após filtragem
        if (positions.length === 0) {
            document.getElementById('miniMap').innerHTML = `
                <div class="alert alert-info">Nenhuma posição disponível para o período selecionado</div>
            `;
            return;
        }

        // Criar elemento container para o mapa
        const mapContainer = document.getElementById('miniMap');
        mapContainer.innerHTML = ''; // Limpar conteúdo anterior

        // Inicializar o mini mapa
        AppState.miniMap = L.map('miniMap', {
            zoomControl: false,
            attributionControl: false,
            preferCanvas: true,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            tap: false
        });

        // Adicionar camada base
        L.tileLayer(CONFIG.MAP.TILE_LAYER, {
            maxZoom: 18,
            minZoom: 3
        }).addTo(AppState.miniMap);

        // Preparar coordenadas para o trajeto
        const latLngs = positions.map(p => [p.lat, p.lon]);

        // Adicionar linha do trajeto
        AppState.layers.miniMap.path = L.polyline(latLngs, {
            color: '#3498db',
            weight: 3,
            opacity: 0.8,
            lineJoin: 'round',
            dashArray: positions.length > 100 ? '5, 5' : null // Tracejado para trajetos longos
        }).addTo(AppState.miniMap);

        // Adicionar marcador de início
        const startMarker = L.circleMarker(latLngs[0], {
            radius: 6,
            color: '#27ae60',
            fillColor: '#2ecc71',
            fillOpacity: 1,
            weight: 2
        }).addTo(AppState.miniMap)
          .bindTooltip(`Início: ${formatDateTime(positions[0].date)}`, {
              permanent: false,
              direction: 'top'
          });

        // Adicionar marcador de fim
        const endMarker = L.circleMarker(latLngs[latLngs.length - 1], {
            radius: 6,
            color: '#c0392b',
            fillColor: '#e74c3c',
            fillOpacity: 1,
            weight: 2
        }).addTo(AppState.miniMap)
          .bindTooltip(`Fim: ${formatDateTime(positions[positions.length - 1].date)}`, {
              permanent: false,
              direction: 'top'
          });

        // Adicionar marcadores intermediários para trajetos longos
        if (positions.length > 10) {
            const midIndex = Math.floor(positions.length / 2);
            const midMarker = L.circleMarker(latLngs[midIndex], {
                radius: 4,
                color: '#f39c12',
                fillColor: '#f1c40f',
                fillOpacity: 1,
                weight: 1
            }).addTo(AppState.miniMap)
              .bindTooltip(`Meio: ${formatDateTime(positions[midIndex].date)}`, {
                  permanent: false,
                  direction: 'top'
              });
            
            AppState.layers.miniMap.markers = [startMarker, midMarker, endMarker];
        } else {
            AppState.layers.miniMap.markers = [startMarker, endMarker];
        }

        // Calcular bounds e ajustar visualização
        const bounds = L.latLngBounds(latLngs);
        const padding = positions.length > 50 ? 0.02 : 0.05; // Padding baseado na quantidade de pontos

        setTimeout(() => {
            if (AppState.miniMap) {
                AppState.miniMap.invalidateSize();
                AppState.miniMap.fitBounds(bounds, {
                    padding: [padding, padding],
                    maxZoom: 15,
                    duration: 1
                });
            }
        }, 100);

        // Adicionar controle de zoom se necessário
        if (positions.length > 1) {
            L.control.zoom({
                position: 'topright'
            }).addTo(AppState.miniMap);
        }

    } catch (error) {
        console.error('Erro ao renderizar mini mapa:', error);
        document.getElementById('miniMap').innerHTML = `
            <div class="alert alert-danger">Erro ao carregar trajeto do equipamento</div>
        `;
    }
}
  
function destroyMiniMap() {
  try {
      // Remover mapa existente
      if (AppState.miniMap) {
          AppState.miniMap.remove();
          AppState.miniMap = null;
      }
      
      // Limpar camadas
      AppState.layers.miniMap.path = null;
      if (AppState.layers.miniMap.markers) {
          AppState.layers.miniMap.markers.forEach(marker => {
              if (marker && marker.remove) marker.remove();
          });
          AppState.layers.miniMap.markers = [];
      }
      
      // Limpar container
      const container = document.getElementById('miniMap');
      if (container) {
          container.innerHTML = '';
      }
  } catch (error) {
      console.error('Erro ao destruir mini mapa:', error);
  }
}
  
  // Funções do gráfico de histórico
  function renderStateHistoryChart(startDate, endDate) {
    // Destruir gráfico existente
    destroyStateHistoryChart();

    const { currentEquipment } = AppState;
    if (!currentEquipment) return;

    // Obter histórico de estados para o equipamento atual
    const stateHistory = AppState.data.equipmentStateHistory.find(
        esh => esh.equipmentId === currentEquipment.id
    );

    // Verificar se há dados disponíveis
    if (!stateHistory?.states?.length) {
        document.getElementById('stateHistoryChart').innerHTML = `
            <div class="alert alert-info">Nenhum histórico de estados disponível</div>
        `;
        return;
    }

    try {
        // Filtrar e ordenar estados pelo período selecionado
        const filteredStates = [...stateHistory.states]
            .map(state => ({
                ...state,
                date: new Date(state.date)
            }))
            .filter(state => {
                if (!startDate || !endDate) return true;
                return state.date >= startDate && state.date <= endDate;
            })
            .sort((a, b) => a.date - b.date);

        // Verificar se há estados após filtragem
        if (filteredStates.length === 0) {
            document.getElementById('stateHistoryChart').innerHTML = `
                <div class="alert alert-info">Nenhum dado disponível para o período selecionado</div>
            `;
            return;
        }

        // Preparar dados para o gráfico
        const labels = filteredStates.map(state => formatDateTime(state.date));
        const backgroundColors = filteredStates.map(state => {
            const stateInfo = AppState.data.equipmentState.find(s => s.id === state.equipmentStateId);
            return stateInfo?.color || CONFIG.COLORS.DEFAULT_STATE;
        });

        // Criar elemento canvas
        const canvas = document.createElement('canvas');
        document.getElementById('stateHistoryChart').appendChild(canvas);

        // Configurações do gráfico
        AppState.stateHistoryChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: new Array(filteredStates.length).fill(1),
                    backgroundColor: backgroundColors,
                    borderWidth: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        display: false,
                        suggestedMin: 0,
                        suggestedMax: 1
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            autoSkip: true,
                            maxTicksLimit: 10,
                            font: {
                                size: 10,
                                family: "'Arial', sans-serif"
                            },
                            color: '#6c757d'
                        },
                        grid: { 
                            display: false,
                            drawBorder: false
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 12,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 11
                        },
                        callbacks: {
                            label: (context) => {
                                const stateId = filteredStates[context.dataIndex].equipmentStateId;
                                const state = AppState.data.equipmentState.find(s => s.id === stateId);
                                return state?.name || 'Desconhecido';
                            },
                            title: (context) => {
                                return formatDateTime(filteredStates[context[0].dataIndex].date);
                            },
                            afterLabel: (context) => {
                                const stateId = filteredStates[context.dataIndex].equipmentStateId;
                                const state = AppState.data.equipmentState.find(s => s.id === stateId);
                                return state?.description || '';
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 0,
                                yMax: 0,
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                                borderWidth: 1,
                                borderDash: [3, 3]
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                    animationDuration: 200
                },
                layout: {
                    padding: {
                        top: 10,
                        right: 10,
                        bottom: 20,
                        left: 10
                    }
                }
            }
        });

        // Adicionar evento para redimensionar o gráfico quando o painel for aberto/redimensionado
        setTimeout(() => {
            if (AppState.stateHistoryChart) {
                AppState.stateHistoryChart.resize();
            }
        }, 100);

    } catch (error) {
        console.error('Erro ao renderizar gráfico de histórico:', error);
        document.getElementById('stateHistoryChart').innerHTML = `
            <div class="alert alert-danger">Erro ao carregar histórico de estados</div>
        `;
    }
}
  
function destroyStateHistoryChart() {
  try {
      if (AppState.stateHistoryChart) {
          AppState.stateHistoryChart.destroy();
          AppState.stateHistoryChart = null;
      }
      
      const container = document.getElementById('stateHistoryChart');
      if (container) {
          container.innerHTML = '';
      }
  } catch (error) {
      console.error('Erro ao destruir gráfico de histórico:', error);
  }
}
  
  // Funções de filtro
  function populateFilters() {
    populateSelect('equipmentFilter', AppState.data.equipment, e => e.name || `Equipamento ${e.id}`);
    populateSelect('stateFilter', AppState.data.equipmentState, s => s.name || `Estado ${s.id}`);
    populateSelect('modelFilter', AppState.data.equipmentModel, m => m.name || `Modelo ${m.id}`);
  }
  
  function populateSelect(selectId, data, getName) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="all">Todos</option>';
    
    if (data?.length) {
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = getName(item);
        select.appendChild(option);
      });
    }
  }
  
  function applyFilters() {
    const equipmentFilter = document.getElementById('equipmentFilter').value;
    const stateFilter = document.getElementById('stateFilter').value;
    const modelFilter = document.getElementById('modelFilter').value;
  
    AppState.data.equipment.forEach(equipment => {
      const marker = AppState.markers[equipment.id];
      if (!marker) return;
  
      const modelMatch = modelFilter === 'all' || equipment.equipmentModelId === modelFilter;
      const equipmentMatch = equipmentFilter === 'all' || equipment.id === equipmentFilter;
      const stateMatch = stateFilter === 'all' || checkStateFilter(equipment.id, stateFilter);
  
      if (modelMatch && equipmentMatch && stateMatch) {
        AppState.map.addLayer(marker);
      } else {
        AppState.map.removeLayer(marker);
      }
    });
  }
  
  function checkStateFilter(equipmentId, stateFilter) {
    if (stateFilter === 'all') return true;
    
    const stateHistory = AppState.data.equipmentStateHistory.find(
      esh => esh.equipmentId === equipmentId
    );
    
    if (!stateHistory?.states?.length) return false;
    
    const latestState = stateHistory.states.reduce((latest, current) => 
      new Date(current.date) > new Date(latest.date) ? current : latest
    );
    
    return latestState.equipmentStateId === stateFilter;
  }
  
  // Funções de utilidade
  function getLatestEquipmentState(equipmentId) {
    const stateHistory = AppState.data.equipmentStateHistory.find(
      esh => esh.equipmentId === equipmentId
    );
    
    if (!stateHistory?.states?.length) return null;
    
    return stateHistory.states.reduce((latest, current) => 
      new Date(current.date) > new Date(latest.date) ? current : latest
    );
  }
  
  function getEquipmentIcon(equipmentName) {
    const prefix = equipmentName?.substring(0, 2);
    return CONFIG.ICONS[prefix] || CONFIG.ICONS.DEFAULT;
  }
  
  function getEquipmentTypeName(equipmentName) {
    const prefix = equipmentName?.substring(0, 2) || 'CA';
    switch(prefix) {
      case 'CA': return 'Caminhão de Carga';
      case 'HV': return 'Harvester';
      case 'GT': return 'Garra Traçadora';
      default: return 'Equipamento';
    }
  }
  
  function calculateOperationalHours(stateHistory, startDate, endDate) {
    if (!stateHistory?.states || stateHistory.states.length < 2) return 0;
    
    const operatingState = AppState.data.equipmentState.find(state => state.name === 'Operando');
    if (!operatingState) return 0;
  
    let operationalHours = 0;
  
    for (let i = 0; i < stateHistory.states.length - 1; i++) {
      const currentState = stateHistory.states[i];
      const nextState = stateHistory.states[i + 1];
      
      const stateStart = new Date(currentState.date);
      const stateEnd = new Date(nextState.date);
      
      if (stateEnd < startDate || stateStart > endDate) continue;
      
      const periodStart = stateStart < startDate ? startDate : stateStart;
      const periodEnd = stateEnd > endDate ? endDate : stateEnd;
      
      if (currentState.equipmentStateId === operatingState.id) {
        operationalHours += (periodEnd - periodStart) / (1000 * 60 * 60);
      }
    }
    
    return operationalHours;
  }
  
  function calculateProductivity(equipmentId, startDate, endDate) {
    const stateHistory = AppState.data.equipmentStateHistory.find(
      h => h.equipmentId === equipmentId
    );
    if (!stateHistory?.states?.length) return 0;
  
    const operatingHours = calculateOperationalHours(stateHistory, startDate, endDate);
    const nonOperatingHours = calculateNonOperationalHours(stateHistory, startDate, endDate);
    const totalHours = operatingHours + nonOperatingHours;
  
    return totalHours > 0 ? Math.min((operatingHours / totalHours) * 100, 100) : 0;
  }
  
  function calculateNonOperationalHours(stateHistory, startDate, endDate) {
    if (!stateHistory?.states || stateHistory.states.length < 2) return 0;
    
    const nonOperatingStates = AppState.data.equipmentState.filter(state => 
      ['Parado', 'Manutenção'].includes(state.name)
    );
    if (!nonOperatingStates.length) return 0;
  
    let nonOperationalHours = 0;
  
    for (let i = 0; i < stateHistory.states.length - 1; i++) {
      const currentState = stateHistory.states[i];
      const nextState = stateHistory.states[i + 1];
      
      const stateStart = new Date(currentState.date);
      const stateEnd = new Date(nextState.date);
      
      if (stateEnd < startDate || stateStart > endDate) continue;
      
      const periodStart = stateStart < startDate ? startDate : stateStart;
      const periodEnd = stateEnd > endDate ? endDate : stateEnd;
      
      if (nonOperatingStates.some(state => state.id === currentState.equipmentStateId)) {
        nonOperationalHours += (periodEnd - periodStart) / (1000 * 60 * 60);
      }
    }
    
    return nonOperationalHours;
  }
  
  function formatDateTime(date) {
    if (!(date instanceof Date) || isNaN(date)) return 'N/A';
    
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    
    return date.toLocaleString('pt-BR', options)
        .replace(',', '')
        .replace(/\//g, '/');
}
  
  function formatDate(date) {
    if (!(date instanceof Date)) return 'N/A';
    return date.toLocaleDateString('pt-BR');
  }
  
  // Funções de controle do mapa
  function fitMapToVisibleMarkers() {
    try {
      const visibleMarkers = Object.values(AppState.markers).filter(marker => 
        AppState.map.hasLayer(marker)
      );
      
      if (!visibleMarkers.length) {
        showAlert('Nenhum equipamento visível para enquadrar! Ajuste os filtros e tente novamente.', 'info');
        return;
      }
  
      AppState.map.flyToBounds(L.featureGroup(visibleMarkers).getBounds(), {
        padding: [50, 50],
        duration: 1,
        maxZoom: 15
      });
    } catch (error) {
      console.error("Erro ao enquadrar marcadores:", error);
      showAlert("Ocorreu um erro ao processar a visualização", 'error');
    }
  }
  
  function clearAllMarkers() {
    Object.values(AppState.markers).forEach(marker => {
      if (marker && AppState.map.hasLayer(marker)) {
        AppState.map.removeLayer(marker);
      }
    });
    AppState.markers = {};
  }
  
  // Funções de UI
  function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('d-none');
  }
  
  function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('d-none');
  }
  
  function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 1100;
      max-width: 400px;
    `;
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleFiltersBtn');
    const filterSection = document.querySelector('.filter-section');
    
    if (toggleBtn && filterSection) {
        toggleBtn.addEventListener('click', function() {
            filterSection.classList.toggle('collapsed');
        });
    }
});

// Função para renderizar os resultados
function renderPeriodResults(data) {
  const { 
      operatingHours, 
      maintenanceHours, 
      stoppedHours, 
      totalHours,
      profitPerHour,
      costPerHour,
      totalProfit,
      totalCost,
      balance
  } = data;
  
  const balanceClass = balance >= 0 ? 'text-success' : 'text-danger';
  const balanceIcon = balance >= 0 ? 'bi-graph-up' : 'bi-graph-down';
  
  document.getElementById('periodResults').innerHTML = `
      <div class="row">
          <div class="col-md-6">
              <div class="card mb-3">
                  <div class="card-header bg-light">
                      <h6 class="mb-0">Tempo de Operação</h6>
                  </div>
                  <div class="card-body">
                      <div class="d-flex justify-content-between">
                          <span>Operando:</span>
                          <strong>${operatingHours.toFixed(1)} horas</strong>
                      </div>
                      <div class="d-flex justify-content-between">
                          <span>Em manutenção:</span>
                          <strong>${maintenanceHours.toFixed(1)} horas</strong>
                      </div>
                      <div class="d-flex justify-content-between">
                          <span>Parado:</span>
                          <strong>${stoppedHours.toFixed(1)} horas</strong>
                      </div>
                      <hr>
                      <div class="d-flex justify-content-between">
                          <span>Total:</span>
                          <strong>${totalHours.toFixed(1)} horas</strong>
                      </div>
                  </div>
              </div>
          </div>
          
          <div class="col-md-6">
              <div class="card mb-3">
                  <div class="card-header bg-light">
                      <h6 class="mb-0">Resultado Financeiro</h6>
                  </div>
                  <div class="card-body">
                      <div class="d-flex justify-content-between">
                          <span>Lucro operacional:</span>
                          <strong>R$ ${totalProfit.toFixed(2)}</strong>
                      </div>
                      <div class="d-flex justify-content-between">
                          <span>Custo manutenção:</span>
                          <strong>R$ ${totalCost.toFixed(2)}</strong>
                      </div>
                      <hr>
                      <div class="d-flex justify-content-between">
                          <span>Saldo:</span>
                          <strong class="${balanceClass}">
                              <i class="bi ${balanceIcon}"></i> R$ ${Math.abs(balance).toFixed(2)}
                          </strong>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <div class="alert alert-info mt-3">
          <small>
              <i class="bi bi-info-circle"></i> 
              Cálculos baseados em ${profitPerHour.toFixed(2)}/h (lucro) e ${costPerHour.toFixed(2)}/h (custo)
          </small>
      </div>
  `;
}

// Função auxiliar para calcular horas em um estado específico
function calculateStateHours(stateHistory, states, startDate, endDate) {
  if (!stateHistory?.states || stateHistory.states.length < 2) return 0;
  if (!states?.length) return 0;
  
  let totalHours = 0;
  const stateIds = states.map(s => s.id);
  
  for (let i = 0; i < stateHistory.states.length - 1; i++) {
      const currentState = stateHistory.states[i];
      const nextState = stateHistory.states[i + 1];
      
      const stateStart = new Date(currentState.date);
      const stateEnd = new Date(nextState.date);
      
      if (stateEnd < startDate || stateStart > endDate) continue;
      
      const periodStart = stateStart < startDate ? startDate : stateStart;
      const periodEnd = stateEnd > endDate ? endDate : stateEnd;
      
      if (stateIds.includes(currentState.equipmentStateId)) {
          totalHours += (periodEnd - periodStart) / (1000 * 60 * 60);
      }
  }
  
  return totalHours;
}

// Função para calcular os resultados do período
function calculatePeriodResults() {
  try {
      const { currentEquipment } = AppState;
      if (!currentEquipment) return;
      
      // Obter datas do formulário
      const startDateStr = document.getElementById('startDate').value;
      const endDateStr = document.getElementById('endDate').value;
      
      if (!startDateStr || !endDateStr) {
          showAlert('Por favor, informe ambas as datas', 'warning');
          return;
      }
      
      // Converter datas
      const startDateParts = startDateStr.split('/');
      const endDateParts = endDateStr.split('/');
      
      const startDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);
      const endDate = new Date(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`);
      
      if (startDate > endDate) {
          showAlert('Data final deve ser maior que data inicial', 'warning');
          return;
      }
      
      // Obter valores financeiros
      const profitPerHour = parseFloat(document.getElementById('profitPerHour').value) || 0;
      const costPerHour = parseFloat(document.getElementById('costPerHour').value) || 0;
      
      // Calcular tempos
      const stateHistory = AppState.data.equipmentStateHistory.find(
          esh => esh.equipmentId === currentEquipment.id
      );
      
      if (!stateHistory?.states?.length) {
          document.getElementById('periodResults').innerHTML = `
              <div class="alert alert-info">Nenhum dado de operação disponível para o período</div>
          `;
          return;
      }
      
      const operatingStates = AppState.data.equipmentState.filter(s => s.name === 'Operando');
      const maintenanceStates = AppState.data.equipmentState.filter(s => s.name === 'Manutenção');
      const stoppedStates = AppState.data.equipmentState.filter(s => s.name === 'Parado');
      
      const operatingHours = calculateStateHours(stateHistory, operatingStates, startDate, endDate);
      const maintenanceHours = calculateStateHours(stateHistory, maintenanceStates, startDate, endDate);
      const stoppedHours = calculateStateHours(stateHistory, stoppedStates, startDate, endDate);
      const totalHours = operatingHours + maintenanceHours + stoppedHours;
      
      // Calcular valores financeiros
      const totalProfit = operatingHours * profitPerHour;
      const totalCost = maintenanceHours * costPerHour;
      const balance = totalProfit - totalCost;
      
      // Renderizar resultados
      renderPeriodResults({
          operatingHours,
          maintenanceHours,
          stoppedHours,
          totalHours,
          profitPerHour,
          costPerHour,
          totalProfit,
          totalCost,
          balance
      });
      
      // Atualizar mini mapa e gráfico com o novo período
      renderMiniMap(startDate, endDate);
      renderStateHistoryChart(startDate, endDate);
      
  } catch (error) {
      console.error('Erro ao calcular período:', error);
      showAlert('Erro ao processar o período selecionado', 'error');
  }
}
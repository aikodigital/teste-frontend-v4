
//Inicializa o mapa
var map = L.map('mapa', {
    center: [-19.126536, -45.947756],
    zoom: 10
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

let marcadores = [];
const filtroModelos = [];

//Cria os popups dos equipamentos
function montaPopUp(equipamento) {
    // Pré-processamento: cria um mapa de dias e suas linhas
    const mapaDias = new Map();

    equipamento.historico_status.forEach(item => {
        if (!mapaDias.has(item.dia)) {
            mapaDias.set(item.dia, []);
        }
        mapaDias.get(item.dia).push(item);
    });
    // Gera o HTML
    let html = '';
    mapaDias.forEach((linhas, dia) => {
        linhas.forEach((linha, i) => {
            html += `
             <tr>
                 ${i === 0 ? `<td rowspan="${linhas.length}">${dia}</td>` : ''}
                 <td class="${linha.estadoNome}">${linha.hora}</td>
                 <td  class="${linha.estadoNome}">${linha.estadoNome}</td>
                 ${i === 0 ? `<td rowspan="${linhas.length}"> R$ ${equipamento.rendimentoDia[dia].valorDia.toFixed(2).replace('.', ',')}</td>` : ''}
                 ${i === 0 ? `<td rowspan="${linhas.length}">${equipamento.rendimentoDia[dia].eficiencia.replace('.', ',')} %</td>` : ''}
             </tr>
         `;
        });
    });

    return html;
}

//Carrega os pontos no mapa
function carregaItensMapa(equipamentos, mostrarHistoricoCompleto = false) {
    limpaMarker();

    equipamentos.forEach(equipamento => {
        const posicoes = equipamento.posicoes;
        const historicoStatus = equipamento.historico_status;

        if (mostrarHistoricoCompleto && posicoes.length > 0) {
            // Modo histórico completo - todas as posições
            posicoes.forEach(posicao => {
                const statusCorrespondente = encontrarStatusPorData(
                    historicoStatus,
                    posicao.date
                );

                criarMarcador(
                    equipamento,
                    [posicao.lat, posicao.lon],
                    statusCorrespondente || equipamento.ultimoStatus,
                    true // É um marcador histórico
                );
            });

            // Centraliza no primeiro ponto do histórico
            map.setView([posicoes[0].lat, posicoes[0].lon], 13);
        } else {
            // Modo normal - apenas última posição
            const ultimaPosicao = posicoes[posicoes.length - 1];
            criarMarcador(
                equipamento,
                [ultimaPosicao.lat, ultimaPosicao.lon],
                equipamento.ultimoStatus,
                false
            );
        }
    });
}

//Cria o objeto do marcador
function criarMarcador(equipamento, coordenadas, status, isHistorico) {
    const classeExtra = isHistorico ? ' marker-historico' : '';

    const myIcon = L.divIcon({
        className: 'custom-marker' + classeExtra,
        html: `
            <div class="marker-container" style="color: ${dados.status[status.estadoId]?.cor};">
                ${isHistorico ? `<span class="marker-date">${status.dia} ${status.hora}</span>` : ''}
                <span class="marker-label"><b>${equipamento.nome}</span>
                <span>${equipamento.modelos.nome}</b></span>
                <img src="./img/${status.estadoId}.png" class="marker-icon"/>
            </div>
        `,
        iconSize: [50, 100],
        iconAnchor: [25, 95],
        popupAnchor: [-3, -76]
    });

    const marker = L.marker(coordenadas, { icon: myIcon });

    // Popup mais simples para marcadores históricos
    if (isHistorico) {
        marker.bindPopup(`
            <div class="popup-historico">
                <h3>${equipamento.nome} - ${equipamento.modelos.nome}</h3>
                <div id="infos-historicas">
                    <span><b>Data:</b> ${status.dia} ${status.hora}</span>
                    <span><b>Status:</b> ${status.estadoNome}</span>
                    <span><b>Posição:</b> ${coordenadas[0].toFixed(6)}, ${coordenadas[1].toFixed(6)}</span>
                    <span><b>${(equipamento.rendimentoDia?.[status.dia]?.estados?.["0808344c-454b-4c36-89e8-d7687e692d57"]?.horas ?? 0).toFixed(2).replace('.', ':')} hora(s)</b> Operante</span>
                    <span><b>${(equipamento.rendimentoDia?.[status.dia]?.estados?.["03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"]?.horas ?? 0).toFixed(2).replace('.', ':')} hora(s)</b> em Manutenção</span>
                    <span><b>${(equipamento.rendimentoDia?.[status.dia]?.estados?.['baff9783-84e8-4e01-874b-6fd743b875ad']?.horas ?? 0).toFixed(2).replace('.', ':')} hora(s)</b> Parado</span>
                    <span><b>Rendimento: R$${(equipamento.rendimentoDia?.[status.dia].valorDia).toFixed(2).replace('.', ',')}</b></span>
                </div>
                <button onclick="carregaItensMapa(dados.equipamentos)">Voltar</button>
            </div>
        `);
        marker.modelo = equipamento.modelos.nome;
        marker.status = status.estadoNome; // Atribui o status correto
    } else {
        // Popup completo para a última posição
        const tabela = montaPopUp(equipamento);
        marker.bindPopup(`
            <div>
                <div id="dados-equipamento">
                    <h2>${equipamento.nome} - ${equipamento.modelos.nome}</h2>
                    <h3 id="total-gerado">Total Gerado: R$ ${equipamento.ganhos.toFixed(2).replace('.', ',')}</h3>
                    <div id="horas">
                        <span><b>${equipamento.estados[0].horasEstado}</b> Horas Operando</span>
                        <span><b>${equipamento.estados[1].horasEstado}</b> Horas Parado</span>
                        <span><b>${equipamento.estados[2].horasEstado}</b> Horas em Manutenção</span>
                    </div>
                    <button onclick="carregaHistorico('${equipamento.id}')">Carregar Histórico de Posições</button>
                </div>
                <table id="tabela-produtividade">
                <theader>
                <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Status</th>
                <th>Valor</th>
                <th>% Rendimento</th>
                </tr>
                </theader>
                    ${tabela}
                </table>
            </div>
        `).openPopup();
        marker.modelo = equipamento.modelos.nome; //Atribui o modelo
        marker.status = equipamento.ultimoStatus.estadoNome; // Atribui o status correto
    }

    marker.addTo(map);
    marcadores.push(marker); // Adiciona o marcador ao array global

    return marker;
}

//Filtra e organiza o histórico de Status
function encontrarStatusPorData(historicoStatus, dataPosicao) {
    if (!historicoStatus || !dataPosicao) return null;

    const data = new Date(dataPosicao);

    // Converte o formato "dd/MM/yyyy HH:mm" do histórico para Date
    const statusComDate = historicoStatus.map(status => {
        const [dia, mes, ano] = status.dia.split('/');
        const [hora, minuto] = status.hora.split(':');
        return {
            ...status,
            date: new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:00`)
        };
    });

    // Encontra o status mais próximo antes da data da posição
    for (let i = statusComDate.length - 1; i >= 0; i--) {
        if (statusComDate[i].date <= data) {
            return statusComDate[i];
        }
    }

    return null;
}

// Função para carregar histórico
function carregaHistorico(equipamentoId) {
    marcadores.forEach(marker => map.removeLayer(marker));
    marcadores = [];
    limpaMarker();
    const equipamento = dados.equipamentos.find(equip => equip.id == equipamentoId);
    if (equipamento) {
        carregaItensMapa([equipamento], true);
    }
}

//Limpa os itens na tela
function limpaMarker() {
    if (!map) return;

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    marcadores = []; // Limpa o array de marcadores
}

//Faz a filtragem por operação e por modelo
function filtraMapa() {
    // Obtém os estados selecionados nos checkboxes
    const estadosSelecionados = [];
    if (document.getElementById('op').checked) estadosSelecionados.push("Operando");
    if (document.getElementById('pa').checked) estadosSelecionados.push("Parado");
    if (document.getElementById('ma').checked) estadosSelecionados.push("Manutenção");

    const modelosSelecionados = [];
    document.querySelectorAll('.modelo-checkbox:checked').forEach(checkbox => {
        modelosSelecionados.push(checkbox.value);
    });


    // Itera sobre os marcadores e aplica o filtro
    marcadores.forEach(marker => {

        const atendeEstado = estadosSelecionados.length === 0 || estadosSelecionados.includes(marker.status);
        const atendeModelo = modelosSelecionados.length === 0 || modelosSelecionados.includes(marker.modelo);

        if (atendeEstado && atendeModelo) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map); // Mostra o marcador se passar nos dois filtros
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker); // Oculta o marcador se não passar em algum filtro
            }
        }
    });
}

//Abre o modal de filtro
function abreModal() {

    const modal = document.getElementById('modal-modelos');
    modal.style.display = 'inline-block';

}

//Fecha o modal de filtro
function fechaModal() {
    const modal = document.getElementById('modal-modelos');
    modal.style.display = 'none';
}
// cria um objeto global chamado window.MapManager e atribui a ele uma propriedade chamada carregaItensMapa
window.MapManager = {
    carregaItensMapa
};

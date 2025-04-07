//VARIÁVEIS GLOBAIS

local = './data/';
arquivos = ['equipment', 'equipmentModel', 'equipmentPositionHistory', 'equipmentState', 'equipmentStateHistory'];
let dados = {};

//Busca os Dados dos arquivos JSON.
function carregaDados(cod) {
    url = local + arquivos[cod] + '.json';
    return fetch(url).then(response => { return response.json() });

}


//Carrega todos os arquivos JSON necessários de forma assíncrona.
async function carregarTudo() {
    const promises = arquivos.map((_, index) => carregaDados(index));

    return await Promise.all(promises);
}


//Inicializa as funções necessárias para o Sistema Funcionar
async function carregaSistema() {
    const [equipamentos, modelos, posicoes, status, historico_status] = await carregarTudo();

    const dados_processados = await processaDados(equipamentos, modelos, posicoes, status, historico_status);

    dados = dados_processados;

    calculaProdutividade();
    window.MapManager.carregaItensMapa(dados_processados.equipamentos);

    montaModal();
}

//Faz o processamento dos dados brutos vindos do json, salvando de forma mais organizada
function processaDados(equipamentos, modelos, posicoes, status, historico_status) {
    const dados = {
        equipamentos: [],
        modelos: {},
        posicoes: [],
        status: {},
        historico_status: {}
    };

    modelos.forEach(modelo => {
        dados.modelos[modelo.id] = {
            nome: modelo.name,
            hourlyEarnings: modelo.hourlyEarnings
        };
    });

    status.forEach(stat => {
        dados.status[stat.id] = {
            nome: stat.name,
            cor: stat.color
        };
    });

    posicoes.forEach(posicao => {
        dados.posicoes[posicao.equipmentId] = {
            historico: posicao.positions,
        };
    });

    // Processamento do histórico de status
    dados.historico_status = historico_status.reduce((acc, historico) => {
        const estados = historico.states || [];

        const historicoFormatado = estados.map(stat => {
            const data = new Date(stat.date);
            return {
                estadoId: stat.equipmentStateId,
                estadoNome: dados.status[stat.equipmentStateId].nome,
                dia: data.toLocaleDateString('pt-BR'),
                hora: data.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            };
        });

        // Obtém o último status (último elemento do array)
        const ultimoEstado = estados.length > 0 ? estados[estados.length - 1] : null;

        // Armazena o último status formatado diretamente no objeto do equipamento
        acc[historico.equipmentId] = {
            historico: historicoFormatado,
            ultimoStatus: ultimoEstado ? {
                estadoId: ultimoEstado.equipmentStateId,
                estadoNome: dados.status[ultimoEstado.equipmentStateId].nome,
                estadoCor: dados.status[ultimoEstado.equipmentStateId].cor,
                dia: new Date(ultimoEstado.date).toLocaleDateString('pt-BR'),
                hora: new Date(ultimoEstado.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            } : null
        };

        return acc;
    }, {});

//Adiciona os dados aos equipamentos na variável global
    equipamentos.forEach(equipamento => {
        const equipamentoId = equipamento.id;
        const historicoInfo = dados.historico_status[equipamentoId] || {
            historico: [],
            ultimoStatus: null
        };

        dados.equipamentos.push({
            id: equipamentoId,
            nome: equipamento.name,
            modelos: dados.modelos[equipamento.equipmentModelId],
            estados: [],
            posicoes: dados.posicoes[equipamentoId]?.historico || [],
            historico_status: historicoInfo.historico,
            ultimoStatus: historicoInfo.ultimoStatus
        });
    });

    return dados;
}

//Faz o calculo da % de produtividade e do valor do rendimento
function calculaProdutividade() {
    dados.equipamentos.forEach(equipamento => {
        const historico = equipamento.historico_status;
        equipamento.rendimentoDia = {};
        equipamento.estados = equipamento.estados || [];
        let horasPorEstado = {};

        // Identifica o estado operacional
        const estadoOperacional = equipamento.modelos.hourlyEarnings.find(e => e.value > 0)?.equipmentStateId;

        for (let index = 0; index < historico.length - 1; index++) {
            const itemAtual = historico[index];
            const itemProximo = historico[index + 1];

            const horaAtual = converteHora(itemAtual.hora);
            const proximaHora = converteHora(itemProximo.hora);
            const diaAtual = itemAtual.dia;
            const diaProximo = itemProximo.dia;
            const estado = itemAtual.estadoId;

            // Caso normal: mesmo dia, horário crescente
            if (horaAtual < proximaHora && diaAtual === diaProximo) {

                const diferenca = proximaHora - horaAtual;
                adicionaHoras(equipamento, horasPorEstado, diaAtual, estado, diferenca);
            } else {// Caso passe da meia-noite

                // Parte 1: do horário atual até 24h (mesmo dia)
                const parte1 = 24 - horaAtual;
                adicionaHoras(equipamento, horasPorEstado, diaAtual, estado, parte1);

                // Parte 2: de 0h até o horário do próximo registro
                const parte2 = proximaHora;
                adicionaHoras(equipamento, horasPorEstado, diaProximo, estado, parte2);
            }
        }

        // Calcula a eficiência para cada dia
        for (const dia in equipamento.rendimentoDia) {
            const diaData = equipamento.rendimentoDia[dia];
            diaData.valorDia = 0;

            // Calcula o valor para cada estado no dia
            equipamento.modelos.hourlyEarnings.forEach(estado => {
                const estadoId = estado.equipmentStateId;
                const horasEstado = diaData.estados[estadoId]?.horas || 0;
                const valorPorHora = estado.value;

                diaData.valorDia += horasEstado * valorPorHora;
            });

            // Calcula a eficiência
            if (estadoOperacional) {
                const horasOperacionais = diaData.estados[estadoOperacional]?.horas || 0;
                diaData.eficiencia = ((horasOperacionais / 24) * 100).toFixed(2);
            } else {
                diaData.eficiencia = "0.000";
            }
        }

        // Cálculo dos ganhos totais
        equipamento.ganhos = equipamento.modelos.hourlyEarnings.reduce((somaTotal, idEstado) => {
            const estadoId = idEstado.equipmentStateId;
            const horas = horasPorEstado[estadoId];
            const multiplica = horas * idEstado.value;

            equipamento.estados.push({
                idEstado: estadoId,
                nome: dados.status[estadoId]?.nome,
                horasEstado: horas,
                ValorEstado: multiplica,
                corEstado: dados.status[estadoId].color
            });

            return somaTotal + multiplica;
        }, 0);

        // Cálculo da produtividade total
        const horasTotais = equipamento.estados.reduce((contador, estado) => contador + estado.horasEstado, 0);

        if (horasTotais > 0 && estadoOperacional) {
            const horasOperacionais = equipamento.estados.find(e => e.idEstado === estadoOperacional)?.horasEstado || 0;
            equipamento.produtividadeTotal = (horasOperacionais / horasTotais * 100).toFixed(2);
        } else {
            equipamento.produtividadeTotal = "0.000";
        }
    });
}

// Função auxiliar para adicionar horas
function adicionaHoras(equipamento, horasPorEstado, dia, estado, horas) {
    // Adiciona ao rendimento diário
    if (!equipamento.rendimentoDia[dia]) {
        equipamento.rendimentoDia[dia] = {
            estados: {},
            horasTotais: 0,
            eficiencia: 0
        };
    }
    //Caso o estado não exista, adiciona o novo estado e o nome
    if (!equipamento.rendimentoDia[dia].estados[estado]) {
        equipamento.rendimentoDia[dia].estados[estado] = {
            horas: 0,
            nome: dados.status[estado].nome
        };
    }
    //faz a somatoria das horas em cada estado
    equipamento.rendimentoDia[dia].estados[estado].horas += horas;
    equipamento.rendimentoDia[dia].horasTotais += horas;

    // Adiciona ao total por estado
    if (!horasPorEstado[estado]) {
        horasPorEstado[estado] = 0;
    }
    horasPorEstado[estado] += horas;
}

// Função auxiliar para converter hora no formato "HH:mm" para minutos e trazer somente as horas
function converteHora(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas;
}

let status_modal;

//Função para fazer a montagem do modal de filtro
function montaModal() {
    const modal = document.getElementById('modal-modelos');
    const div = document.createElement('div');
    const modelos = Object.entries(dados.modelos).map(([id, modelo]) => ({
        id,
        nome: modelo.nome
    }));
    modelos.forEach(modelo => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = modelo.nome;
        checkbox.id = `modelo-${modelo.id}`;
        checkbox.classList.add('modelo-checkbox');
        checkbox.addEventListener('change', filtraMapa);
        const label = document.createElement('label');
        label.htmlFor = `modelo-${modelo.id}`;
        label.textContent = modelo.nome;

        div.appendChild(checkbox);
        div.appendChild(label);
        modal.appendChild(div);
    });
}

//inicia o sistema ao carregar o DOM

document.addEventListener("DOMContentLoaded", carregaSistema);
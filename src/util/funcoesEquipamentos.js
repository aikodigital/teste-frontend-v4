import equipamento from '@/data/equipment.json';
import modeloEquipamento from '@/data/equipmentModel.json';
import posicoesEquipamento from '@/data/equipmentPositionHistory.json';
import statusEquipamento from '@/data/equipmentStateHistory.json';
import listaStatus from '@/data/equipmentState.json';

const CAMINHAODECARGA = 'Caminhão de carga';
const HARVESTER = 'Harvester';
const GARRATRACADORA = 'Garra traçadora';
const corCaminhaoDeCarga = '#FF5733';
const corHarvester = '#583470';
const corGarraTracadora = '#33FF57';

const ultimoEstadoEquipamentos = statusEquipamento.map((estadoEquipamento) => { 
    const ultimoEstado = estadoEquipamento.states[estadoEquipamento.states.length - 1];
    const estadoMaisRecente = listaStatus.find((statusVerificar) => statusVerificar.id === ultimoEstado.equipmentStateId);
    return { id: estadoEquipamento.equipmentId, estado: estadoMaisRecente};
});

const listaEquipamentos = equipamento.map((equip) => {
    const tipoEquipamento = modeloEquipamento.find((modelo) => modelo.id === equip.equipmentModelId);
    const estadoMaisRecente = ultimoEstadoEquipamentos.find((equipamentoEmAcao) => equipamentoEmAcao.id === equip.id);
    const cor = tipoEquipamento.name === CAMINHAODECARGA ? corCaminhaoDeCarga : tipoEquipamento.name === HARVESTER ? corHarvester : corGarraTracadora;
    return { id: equip.id, nome: equip.name, modelo: tipoEquipamento.name, corMarcador: cor, ultimoStatus: estadoMaisRecente.estado.name };
});

const retornarUltimaPosicao = () => {
    return posicoesEquipamento.map((equip) => {
        const equipamentoEmQuestao = listaEquipamentos.find((equipamentoComparar) => equipamentoComparar.id === equip.equipmentId);
        return { 
            ...equipamentoEmQuestao, 
            ultimaPosicao: equip.positions[equip.positions.length - 1], 
            dataHora: modificarData(equip.positions[equip.positions.length - 1].date) 
        };
    });
};

const retornarHistoricoPosicaoEquipamento = (nomeEquipamento) => {
    const equipamento = listaEquipamentos.find((equipamentoComparar) => equipamentoComparar.nome === nomeEquipamento);
    const historicoPosicoes = posicoesEquipamento.find((equip) => equip.equipmentId === equipamento.id);
    const historicoModificado = historicoPosicoes.positions.map((posicao) => ({
        ...posicao,
        dataHora: modificarData(posicao.date)
    }));
    return { ...equipamento, historico: historicoModificado};
};

const retornarHistoricoStatusEquipamento = (nomeEquipamento) => {
    const equipamento = listaEquipamentos.find((equipamentoComparar) => equipamentoComparar.nome === nomeEquipamento);
    const historicoStatus = statusEquipamento.find((equip) => equip.equipmentId === equipamento.id);
    const historicoComNomeStatus = historicoStatus.states.map((status) => {
        const statusEncontrado = listaStatus.find((statusAtual) => statusAtual.id === status.equipmentStateId);
        return { ...status, status: statusEncontrado.name, corStatus: statusEncontrado.color };
    });
    const historicoModificado = historicoComNomeStatus.map((status) => ({
        ...status,
        dataHora: modificarData(status.date)
    }));
    return { ...equipamento, historico: historicoModificado};
}

function modificarData(data) {
    const dataISO = data;
    const dataFormatar = new Date(dataISO);
    return dataFormatar.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export const funcoesEquipamento = {
    retornarUltimaPosicao,
    retornarHistoricoPosicaoEquipamento,
    retornarHistoricoStatusEquipamento,
    modificarData,
    CAMINHAODECARGA,
    HARVESTER,
    GARRATRACADORA
};

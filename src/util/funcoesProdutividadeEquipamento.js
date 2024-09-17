import { funcoesEquipamento } from "./funcoesEquipamentos";
import equipamento from '@/data/equipment.json';
import modeloEquipamento from '@/data/equipmentModel.json';
import statusEquipamento from '@/data/equipmentStateHistory.json';
import listaStatus from '@/data/equipmentState.json';

const listaEquipamentos = equipamento.map((equip) => {
    const tipoEquipamento = modeloEquipamento.find((modelo) => modelo.id === equip.equipmentModelId);
    const equipamentosComHistoricoStatus = statusEquipamento.find((historico) => equip.id === historico.equipmentId);
    const equipamentosComHistoricoStatusModificado = equipamentosComHistoricoStatus.states.map((equipamentoStatus) => {
        const statusDoEquipamento = listaStatus.find((statusVerificar) => equipamentoStatus.equipmentStateId === statusVerificar.id);
        return {
            ...equipamentoStatus,
            id: equip.id,
            status: statusDoEquipamento.name,
            corStatus: statusDoEquipamento.color,
            dataHora: funcoesEquipamento.modificarData(equipamentoStatus.date)
        };
    });

    const equipamentosComHistoricoStatusPorData = equipamentosComHistoricoStatusModificado.reduce((acc, item) => {
        const data = item.date.slice(0, 10);

        if (!acc[data]) {
            acc[data] = [];
        }

        acc[data].push(item);
        return acc;
    }, {});
    
    let ultimoStatus = null;
    
    const valoresDeStatus = tipoEquipamento.hourlyEarnings.map((valores) => {
        const statusAMudar = listaStatus.find((statusProcurar) => valores.equipmentStateId === statusProcurar.id);
        return { ...valores, nomeStatus: statusAMudar.name};
    });

    const valorManutencao = valoresDeStatus.find((valor) => valor.nomeStatus === 'Manutenção').value;
    const valorParado = valoresDeStatus.find((valor) => valor.nomeStatus === 'Parado').value;
    const valorOperando = valoresDeStatus.find((valor) => valor.nomeStatus === 'Operando').value;

    const historicoAgrupado = Object.keys(equipamentosComHistoricoStatusPorData).map((dataReferencia) => {
        const items = equipamentosComHistoricoStatusPorData[dataReferencia];
        
        let totalParado = 0;
        let totalOperando = 0;
        let totalManutencao = 0;

        items.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (ultimoStatus) {
            const objetoStatus = listaStatus.find((statusProcurar) => statusProcurar.name === ultimoStatus);
            const ultimoIdStatus = objetoStatus.id;
            items.unshift({ date: inicioDoDia(dataReferencia), status: ultimoStatus, equipmentStateId: ultimoIdStatus, corStatus: objetoStatus.color });
        }

        for (let i = 0; i < items.length - 1; i++) {
            const itemAtual = items[i];
            const proximoItem = items[i + 1];

            const diferencaDeHoras = diferencaEmHoras(itemAtual.date, proximoItem.date);

            if (itemAtual.status === 'Parado') {
                totalParado += diferencaDeHoras;
            } else if (itemAtual.status === 'Operando') {
                totalOperando += diferencaDeHoras;
            } else if (itemAtual.status === 'Manutenção') {
                totalManutencao += diferencaDeHoras;
            }
        }

        const ultimoItem = items[items.length - 1];
        const horasParaAcabarODia = diferencaEmHoras(ultimoItem.date, finalDoDia(dataReferencia));

        if (ultimoItem.status === 'Parado') {
            totalParado += horasParaAcabarODia;
        } else if (ultimoItem.status === 'Operando') {
            totalOperando += horasParaAcabarODia;
        } else if (ultimoItem.status === 'Manutenção') {
            totalManutencao += horasParaAcabarODia;
        }

        ultimoStatus = ultimoItem.status;

        const porcentagemProdutividade = (totalOperando / 24 * 100);
        const totalGanho = totalOperando * valorOperando + totalManutencao * valorManutencao + totalParado * valorParado;

        return {
            data: dataReferencia,
            items,
            totalParado: Math.round(totalParado),
            totalOperando: Math.round(totalOperando),
            totalManutencao: Math.round(totalManutencao),
            porcentagemProdutividade,
            totalGanho
        };
    });


    return { id: equip.id, nome: equip.name, modelo: tipoEquipamento.name,  listaStatus: historicoAgrupado };
});

function finalDoDia(date) {
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);
    return end.toISOString();
}

function inicioDoDia(date) {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);
    return start.toISOString();
}

function diferencaEmHoras(dataInicio, dataFim) {
    const diffInMs = new Date(dataFim) - new Date(dataInicio);
    return diffInMs / (1000 * 60 * 60);
}

export const funcoesProdutividadeEquipamento = {
    listaEquipamentos
};
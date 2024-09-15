import { funcoesEquipamento } from "./funcoesEquipamentos";

const filtrarEquipamento = (equipamentosComUltimaPosicao, mostrarCaminhaoDeCarga, mostrarHarvester, mostrarGarraTracadora) => {
    if (mostrarCaminhaoDeCarga && mostrarHarvester && !mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.CAMINHAODECARGA ||
                equipamentoVerificar.modelo === funcoesEquipamento.HARVESTER
        );
    }
    else if (mostrarCaminhaoDeCarga && !mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.CAMINHAODECARGA ||
                equipamentoVerificar.modelo === funcoesEquipamento.GARRATRACADORA
        );
    }
    else if (mostrarCaminhaoDeCarga && !mostrarHarvester && !mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.CAMINHAODECARGA);
    }
    else if (!mostrarCaminhaoDeCarga && mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.HARVESTER ||
                equipamentoVerificar.modelo === funcoesEquipamento.GARRATRACADORA
        );
    }
    else if (!mostrarCaminhaoDeCarga && mostrarHarvester && !mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.HARVESTER);
    }
    else if (!mostrarCaminhaoDeCarga && !mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.GARRATRACADORA);
    } else if (mostrarCaminhaoDeCarga && mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosComUltimaPosicao;
    }
};

export const filtroEquipamento = {
    filtrarEquipamento
};
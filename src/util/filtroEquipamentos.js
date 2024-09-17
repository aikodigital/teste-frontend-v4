import { funcoesEquipamento } from "./funcoesEquipamentos";

const filtrarEquipamento = (equipamentosFiltrar, mostrarCaminhaoDeCarga, mostrarHarvester, mostrarGarraTracadora) => {
    if (mostrarCaminhaoDeCarga && mostrarHarvester && !mostrarGarraTracadora) {
        return equipamentosFiltrar.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.CAMINHAODECARGA ||
                equipamentoVerificar.modelo === funcoesEquipamento.HARVESTER
        );
    }
    else if (mostrarCaminhaoDeCarga && !mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosFiltrar.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.CAMINHAODECARGA ||
                equipamentoVerificar.modelo === funcoesEquipamento.GARRATRACADORA
        );
    }
    else if (mostrarCaminhaoDeCarga && !mostrarHarvester && !mostrarGarraTracadora) {
        return equipamentosFiltrar.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.CAMINHAODECARGA);
    }
    else if (!mostrarCaminhaoDeCarga && mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosFiltrar.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.HARVESTER ||
                equipamentoVerificar.modelo === funcoesEquipamento.GARRATRACADORA
        );
    }
    else if (!mostrarCaminhaoDeCarga && mostrarHarvester && !mostrarGarraTracadora) {
        return equipamentosFiltrar.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.HARVESTER);
    }
    else if (!mostrarCaminhaoDeCarga && !mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosFiltrar.filter(
            (equipamentoVerificar) => equipamentoVerificar.modelo === funcoesEquipamento.GARRATRACADORA);
    } else if (mostrarCaminhaoDeCarga && mostrarHarvester && mostrarGarraTracadora) {
        return equipamentosFiltrar;
    }
};

export const filtroEquipamento = {
    filtrarEquipamento
};
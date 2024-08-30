/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/IEquipmentDetails';

/** Estado reativo para armazenar as posições a serem exibidas */
const positionsToShow = ref<Map<string, { lat: number, lon: number }[]>>(new Map());

/**
 * Adiciona uma rota para o equipamento fornecido
 * @param {IEquipmentDetails} equipment - O equipamento para o qual a rota será adicionada
 */
function addRoute(equipment: IEquipmentDetails) {
  const equipmentPositions = getEquipmentPositionHistory(equipment);
  positionsToShow.value.set(equipment.id, equipmentPositions);
}

/**
 * Remove a rota do equipamento com o ID fornecido
 * @param {string} equipmentId - O ID do equipamento para o qual a rota será removida
 */
function removeRoute(equipmentId: string) {
  positionsToShow.value.delete(equipmentId);
}

/**
 * Verifica se uma rota existe para o equipamento com o ID fornecido
 * @param {string} equipmentId - O ID do equipamento para o qual a rota será removida
 * @returns {boolean} Verdadeiro se a rota existir, falso caso contrário
 */
function hasRoute(equipmentId: string) {
  return positionsToShow.value.has(equipmentId);
}

/**
 * Alterna a exibição da rota para o equipamento fornecido
 * @param {IEquipmentDetails} equipment - O equipamento para o qual a rota será adicionada
 */
function toggleRoute(equipment: IEquipmentDetails) {
  if (hasRoute(equipment.id)) {
    removeRoute(equipment.id);
  } else {
    addRoute(equipment);
  }
}

/**
 * Composable para gerenciar a exibição de rotas
 * @returns {Object} - Objeto contendo as posições a serem exibidas e métodos para manipulação
 */
export function useShowRoutes() {
  return { positionsToShow, addRoute, removeRoute, toggleRoute, hasRoute };
}
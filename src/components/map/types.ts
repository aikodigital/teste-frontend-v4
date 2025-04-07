// Tipos que permitem posição nula para equipamentos fora do mapa
export type EquipmentPosition = [number, number] | null;
export type EquipmentState = { equipmentStateId?: string };

// Interface para padronizar a estrutura de dados dos equipamentos no mapa
export interface EquipmentDataItem {
  id: string;
  model: string;
  position: EquipmentPosition;
  state: EquipmentState;
}

// Cores que representam os diferentes estados operacionais dos equipamentos
export type StateColor = 'green' | 'yellow' | 'red';
// Tipos de equipamentos suportados pelo sistema
export type EquipmentType = 'truck' | 'excavator' | 'tractor';

// Mapeamento entre tipos de equipamentos e seus ícones por estado
// Permite fácil extensão para novos tipos de equipamentos
export interface IconMap {
  [key: string]: {
    [key in StateColor]: string;
  };
}
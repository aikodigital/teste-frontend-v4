/** Core */
import type { PointExpression } from 'leaflet';

/** Data */
import { equipmentModelData, equipmentStateData, equipmentStateHistoryData } from '~/data/equipment';

/** Interfaces */
import type {
  IEquipment,
  IEquipmentDetails,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

/**
 * Retorna a classe CSS correspondente ao estado do equipamento
 * @param {string} state - O estado do equipamento
 * @returns {string} - A classe CSS correspondente ao estado
 */
export function getCurrentStateClass(state: string) {
  return state === 'Operando' ? 'text-operando'
    : state === 'Parado' ? 'text-parado'
      : 'text-manutencao';
}

type EquipmentStatesOnSameDay = Record<string, { hour: string, stateName: string }[]>;
interface EquipmentDailyStateHours {
  [date: string]: {
    percentages: Record<string, number>;
    hours: Record<string, number>;
    totalEarnings: number;
  }
}

/**
 * Retorna dados do modelo do equipamento
 * @param {IEquipment} equipment - O equipamento para o qual o modelo será obtido
 * @param {IEquipmentModel[]} equipmentsModel - Os modelos de equipamento disponíveis
 * @returns {IEquipmentModel} - O modelo do equipamento
 */
function getModel(equipment: IEquipment, equipmentsModel: IEquipmentModel[]) {
  return equipmentsModel.find((model) => model.id === equipment.equipmentModelId);
}

/**
 * Retorna o histórico de posições do equipamento
 * @param {IEquipment} equipment - O equipamento para o qual o modelo será obtido
 * @param {IEquipmentPositionHistory[]} equipmentsPositionHistory - O histórico de posições dos equipamentos
 * @returns {IEquipmentPositionHistory['positions']} - O histórico de posições do equipamento
 */
function getPositionHistory(equipment: IEquipment, equipmentsPositionHistory: IEquipmentPositionHistory[]) {
  return equipmentsPositionHistory.find((positionHistory) => positionHistory.equipmentId === equipment.id)?.positions || [];
}

/**
 * Retorna o histórico de estados do equipamento
 * @param {IEquipment} equipment - O equipamento para o qual o modelo será obtido
 * @param {IEquipmentStateHistory[]} equipmentsStateHistory - O histórico de estados dos equipamentos
 * @param {IEquipmentState[]} equipmentStates - Os estados de equipamento disponíveis
 * @returns {{ date: string, name: string }[]} - O histórico de estados do equipamento
 */
function getStateHistory(equipment: IEquipment, equipmentsStateHistory: IEquipmentStateHistory[], equipmentStates: IEquipmentState[]) {
  const stateHistoryMap = new Map((equipmentsStateHistory.map((stateHistory) => [stateHistory.equipmentId, stateHistory.states])));
  const stateNameMap = new Map(equipmentStates.map((state) => [state.id, state.name]));

  const stateHistory = stateHistoryMap.get(equipment.id) || [];

  return stateHistory.map((state) => {
    const stateName = stateNameMap.get(state.equipmentStateId) || 'Desconhecido';

    return { date: state.date, name: stateName };
  });
}

/**
 * Retorna a posição atual do equipamento
 * @param {{ lat: number; lon: number }[]} positionHistory - Histórico de posições do equipamento
 * @returns {{ lat: number; lon: number }} - A posição atual do equipamento
 */
function getCurrentPosition(positionHistory: { lat: number; lon: number }[]) {
  return positionHistory.at(-1)!;
}

/**
 * Retorna o nome do estado atual do equipamento
 * @param {{ date: string; name: string }[]} stateHistory - Histórico de estados do equipamento
 * @returns {{ date: string; name: string }} - O estado atual do equipamento
 */
function getCurrentState(stateHistory: { date: string; name: string }[]) {
  return stateHistory.at(-1)!.name;
}

/**
 * Converte um objeto em um array de objetos
 * @param {EquipmentDailyStateHours} dailyStateHours - Objeto no qual a chave é o dia e o valor é um objeto contendo as
 * horas, porcentagens e ganhos totais do equipamento naquele dia
 * @returns {EquipmentDailyStateHours & { date: string }[]} - Array de objetos contendo as informações de cada dia
 */
function convertObjectToArray(dailyStateHours: EquipmentDailyStateHours) {
  return Object.entries(dailyStateHours).map(([date, value]) => {
    return {
      date,
      hours: Object.entries(value.hours).map(([stateName, hour]) => ({ stateName, hour })),
      percentages: Object.entries(value.percentages).map(([stateName, percentage]) => ({ stateName, percentage })),
      totalEarnings: value.totalEarnings,
    };
  });
}

/**
 * Ordena os estados de equipamento de acordo com a ordem: 'Operando', 'Manutenção', 'Parado', 'Desconhecido'
 * @param {IEquipmentState['name']} a - Nome do estado A
 * @param {IEquipmentState['name']} b - Nome do estado B
 * @returns {number} - Resultado da comparação
 */
function customSort(a: IEquipmentState['name'], b: IEquipmentState['name']) {
  const stateOrder: IEquipmentState['name'][] = ['Operando', 'Manutenção', 'Parado', 'Desconhecido'];

  const indexA = stateOrder.indexOf(a);
  const indexB = stateOrder.indexOf(b);

  return indexA - indexB;
}

/**
 * Retorna os detalhes dos equipamentos
 * @param {IEquipment} equipments - O equipamento
 * @param {IEquipmentModel[]} equipmentsModel - Os modelos de equipamento disponíveis
 * @param {IEquipmentPositionHistory[]} equipmentsPositionHistory - O histórico de posições dos equipamentos
 * @param {IEquipmentStateHistory[]} equipmentsStateHistory - O histórico de estados dos equipamentos
 * @param {IEquipmentState[]} equipmentStates - Os estados de equipamento disponíveis
 * @returns {IEquipmentDetails[]} - Os equipamentos com detalhes
 */
export function getEquipmentDetails(
  equipments: IEquipment[],
  equipmentsModel: IEquipmentModel[],
  equipmentsPositionHistory: IEquipmentPositionHistory[],
  equipmentsStateHistory: IEquipmentStateHistory[],
  equipmentStates: IEquipmentState[]
): IEquipmentDetails[] {
  return equipments.map((equipment) => {
    const model = getModel(equipment, equipmentsModel);
    const positionHistory = getPositionHistory(equipment, equipmentsPositionHistory);
    const stateHistory = getStateHistory(equipment, equipmentsStateHistory, equipmentStates);
    const currentPosition = getCurrentPosition(positionHistory);
    const currentState = getCurrentState(stateHistory);

    return {
      id: equipment.id,
      name: equipment.name,
      model,
      currentState,
      stateHistory,
      currentPosition,
      positionHistory,
    };
  });
}

/**
 * Retorna a posição recente dos equipamentos
 * @param {IEquipment} equipments - O equipamento
 * @returns {{ lat: number; lon: number }[]} - A posição recente dos equipamentos
 */
export function getEquipmentsRecentPosition(equipments: IEquipmentDetails[]): { lat: number; lon: number }[] {
  return equipments.map((equipment) => ({
    lat: equipment.currentPosition.lat,
    lon: equipment.currentPosition.lon,
  }));
}

/**
 * Calcula a posição central dos equipamentos para inicializar o mapa
 * @param {{ lat: number; lon: number }[]} positions - Posições dos equipamentos
 * @returns {PointExpression} - A posição central dos equipamentos
 */
export function getCentralPosition(positions: { lat: number; lon: number }[]): PointExpression {
  const total = positions.length;

  const sum = positions.reduce((acc, position) => {
    acc.lat += position.lat;
    acc.lon += position.lon;

    return acc;
  }, { lat: 0, lon: 0 });

  return [
    sum.lat / total,
    sum.lon / total,
  ];
}

/**
 * Calcula o nível de zoom para inicializar o mapa
 * @param {{ lat: number; lon: number }[]} positions - Posições dos equipamentos
 * @returns {number} - O nível de zoom do mapa
 */
export function getZoomLevel(positions: { lat: number; lon: number }[]) {
  if (positions.length === 0) {
    return 2;
  }

  const latitudes = positions.map((position) => position.lat);
  const longitudes = positions.map((position) => position.lon);

  const latDiff = Math.max(...latitudes) - Math.min(...latitudes);
  const lonDiff = Math.max(...longitudes) - Math.min(...longitudes);
  const maxDiff = Math.max(latDiff, lonDiff);

  if (maxDiff < 0.01) {
    return 15;
  }

  if (maxDiff < 0.1) {
    return 14;
  }

  if (maxDiff < 0.5) {
    return 10;
  }

  if (maxDiff < 0.7) {
    return 8;
  }

  return 2;
}

/**
 * Retorna os nomes de estados de equipamento
 * @returns {string[]} - Os nomes de estados de equipamento
 */
export function getStates() {
  return equipmentStateData.map((state) => state.name);
}

/**
 * Retorna os nomes de modelos de equipamento
 * @returns {string[]} - Os nomes de modelos de equipamento
 */
export function getModels() {
  return equipmentModelData.map((model) => model.name);
}

/**
 * Retorna o relatório diário do equipamento
 * 
 * Esse método é bem complexo e possui muitas variáveis, então é importante que você entenda o que ele faz.
 * Por isso, não remova os comentários internos.
 * 
 * @param {IEquipment} equipment - O equipamento para o qual o relatório diário será gerado
 * @returns {EquipmentDailyStateHours & { date: string }[]} - O relatório diário do equipamento
 */
export function getDailyReport(equipment: IEquipmentDetails) {
  /** Recupera todos os estados do equipamento passado no parâmetro */
  const equipmentStateHistory = equipmentStateHistoryData.find((stateHistory) => stateHistory.equipmentId === equipment.id)?.states || [];

  /** Mapeia os estados com a chave sendo o ID e o valor sendo o nome do estado */
  const stateNameMap = new Map(equipmentStateData.map((state) => [state.id, state.name]));

  /** Recupera os ganhos por hora do modelo de equipamento passado no parâmetro */
  const hourlyEarnings = equipmentModelData.find((model) => model.id === equipment.model!.id)?.hourlyEarnings;

  /**
   * Converte o ID do estado para o nome do estado
   * @example { equipmentStateId: 1, value: 100 } => { stateName: 'Operando', value: 100 }
   */
  const hourlyEarningsWithStateNames = hourlyEarnings!.map((hourlyEarning) => {
    const stateName = stateNameMap.get(hourlyEarning.equipmentStateId) || 'Desconhecido';
    return { stateName, value: hourlyEarning.value };
  });

  /**
   * Inicializa o objeto no qual a chave é o dia e o valor é um array contendo o horário e o estado do equipamento
   * @example 
   * statesOnSameDay = {
   *  '2021-01-01': [
   *    { hour: '00:00:00.000Z', stateName: 'Operando' },
   *    { hour: '12:00:00.000Z', stateName: 'Parado' },
   *  ],
   *  '2021-01-02': [
   *    { hour: '00:00:00.000Z', stateName: 'Operando' },
   *    { hour: '12:00:00.000Z', stateName: 'Manutenção' },
   *  ],
   *  ...
   * }
   */
  const statesOnSameDay: EquipmentStatesOnSameDay = {};

  /** Itera sobre cada estado */
  for (let i = 0; i < equipmentStateHistory.length; i++) {
    /** Item na iteração atual */
    const state = equipmentStateHistory[i];

    /** Data e hora no estado atual */
    const [date, hour] = state.date.split('T');

    /** Nome do estado na iteração atual */
    const stateName = stateNameMap.get(state.equipmentStateId) || 'Desconhecido';

    /** Caso a data ainda não exista, cria uma nova data com um array vazio */
    if (!statesOnSameDay[date]) {
      statesOnSameDay[date] = [];
    }

    /** Popula o array da data com o horário e o nome do estado */
    statesOnSameDay[date].push({ hour, stateName });
  }

  /**
   * Inicializa o objeto no qual a chave é o dia e o valor é um objeto contendo as horas, porcentagens e ganhos totais
   * do equipamento naquele dia
   * @example
   * dailyStateHours = {
   *    '2021-01-01': {
   *      totalEarnings: 100,
   *      hours: {
   *        'Operando': 12,
   *        'Parado': 6,
   *        'Manutenção': 4,
   *        'Desconhecido': 2,
   *      },
   *      percentages: {
   *        'Operando': 50,
   *        'Parado': 25,
   *        'Manutenção': 16.67,
   *        'Desconhecido': 8.33,
   *      }
   *    },
   *  ...
   * }
   */
  const dailyStateHours: EquipmentDailyStateHours = {};

  /**
   * Inicializa o último estado do dia anterior como 'Desconhecido' e com a hora '00:00:00.000Z'
   * É importante inicializar dessa forma para não afetar o cálculo das horas do primeiro dia
   * É importante armazenar o último estado do dia anterior para calcular as horas do primeiro estado do dia atual
   * @example
   * lastStateOfPreviousDay = {
   *    hour: '22:00:00.000Z',
   *    stateName: 'Operando',
   * }
   * 
   * currentDay = [
   *    { hour: '12:00:00.000Z', stateName: 'Parado' },
   *    { hour: '15:00:00.000Z', stateName: 'Operando' },
   * ]
   * 
   *  @description Se considerarmos apenas o dia atual, o equipamento ficou 'Operando' apenas 9 horas (24 - 15).
   *  Por isso temos que considerar as 12 horas no dia atual que o equipamento ficou 'Operando' desde o dia anterior.
   */
  let lastStateOfPreviousDay: { hour: string, stateName: string } = {
    hour: '00:00:00.000Z',
    stateName: 'Desconhecido',
  };

  /** Itera sobre cada dia */
  for (const [day, states] of Object.entries(statesOnSameDay)) {
    /** Itera sobre cada estado no dia na iteração atual */
    for (let i = 0; i < states.length; i++) {
      /** Item na iteração atual */
      const state = states[i];

      /**
       * Usa o próximo estado para calcular as horas do estado atual
       * Se não houver um próximo estado, considera que o equipamento ficou no estado atual até o final do dia
       */
      const nextState = states[i + 1] || { hour: '24:00:00.000Z', stateName: state.stateName };

      /** Extrai apenas a hora do estado na iteração atual */
      const [hour] = state.hour.split(':');

      /** Extrai apenas a hora do próximo estado */
      const [nextHour] = nextState.hour.split(':');

      /** Caso não exista o dia no relatório, é criado um objeto com as informações do relatório daquele dia */
      if (!dailyStateHours[day]) {
        dailyStateHours[day] = { totalEarnings: 0, hours: {}, percentages: {} };
      }

      /** Caso não exista aquele estado no dia atual, a quantidade de horas daquele estado é inicializado em 0 */
      if (!dailyStateHours[day].hours[state.stateName]) {
        dailyStateHours[day].hours[state.stateName] = 0;
      }

      /**
       * Calcula a quantidade de horas que o equipamento ficou naquele estado e incrementa ao valor da quantidade de
       * horas daquele estado no relatório no dia na iteração atual
       */
      dailyStateHours[day].hours[state.stateName] += Number(nextHour) - Number(hour);

      /**
       * Caso seja o primeiro estado do dia, inicializa no dia na iteração atual o último estado do dia anterior
       * com a quantidade de horas que o equipamento ficou naquele estado
       */
      if (i === 0) {
        dailyStateHours[day].hours[lastStateOfPreviousDay.stateName] = Number(hour);
      } else if (i === states.length - 1) {
        /** Caso seja o último estado daquele dia, armazena o estado na varíavel */
        lastStateOfPreviousDay = state;
      }
    }

    /**
     * Nesse momento, o relatório do dia na iteração atual já possui as horas de cada estado do equipamento e está
     * assim:
     * @example
     * dailyStateHours = {
     *    '2021-01-01': {
     *      totalEarnings: 0,
     *      hours: {
     *        'Operando': 12,
     *        'Parado': 6,
     *        'Manutenção': 4,
     *        'Desconhecido': 2,
     *      },
     *      percentages: {}
     *    },
     *  ...
     * }
     * 
     * @description Agora, é necessário calcular as porcentagens de cada estado e o total de ganhos do equipamento naquele dia
     */

    /** Extrai o objeto de horas no dia na interação atual */
    const { hours } = dailyStateHours[day];

    /** Itera sobre cada estado e quantidade de horas do objeto */
    for (const [state, hour] of Object.entries(hours)) {
      /** Calcula a porcentagem de horas naquele dia e armazena no objeto */
      dailyStateHours[day].percentages[state] = parseFloat(((hour / 24) * 100).toFixed(2));

      /** Caso o estado não seja 'Desconhecido', incrementa o total de ganhos com base no modelo do equipamento */
      if (state !== 'Desconhecido') {
        dailyStateHours[day].totalEarnings += hourlyEarningsWithStateNames.find((hourlyEarning) => hourlyEarning.stateName === state)?.value! * hour;
      }
    }
  }

  /**
   * Nesse momemnto, o relatório está conforme o modelo na sua inicialização
   * @see dailyStateHours
   */

  /** Converte o objeto em um array de objetos para inverter a ordem dos dias, deixando o dia mais recente em primeiro */
  const arrayOfDailyStateHoursReversed = convertObjectToArray(dailyStateHours).reverse();

  /**
   * Ordena os estados de equipamento de acordo com a ordem
   * @see customSort
  */
  for (const day of arrayOfDailyStateHoursReversed) {
    day.hours.sort((a, b) => customSort(a.stateName, b.stateName));
    day.percentages.sort((a, b) => customSort(a.stateName, b.stateName));
  }

  return arrayOfDailyStateHoursReversed;
}

/**
 * Retorna o ícone correspondente ao modelo do equipamento
 * @see https://icones.js.org/collection/fa6-solid?s=truck&icon=fa6-solid:truck
 * @see https://icones.js.org/collection/fa6-solid?s=tractor&icon=fa6-solid:tractor
 * @see https://icones.js.org/collection/fa6-solid?s=truck-monster&icon=fa6-solid:truck-monster
 * @see https://icones.js.org/collection/fa6-solid?s=question&icon=fa6-solid:question
 *
 * @param {string} equipmentModelName - Nome do modelo do equipamento
 * @returns {string} - O ícone correspondente ao modelo do equipamento
 */
export function getIconModel(equipmentModelName?: string) {
  switch (equipmentModelName) {
    case 'Caminhão de carga':
      return 'fa6-solid:truck';
    case 'Harvester':
      return 'fa6-solid:tractor';
    case 'Garra traçadora':
      return 'fa6-solid:truck-monster';
    default:
      return 'fa6-solid:question';
  }
}

/**
 * Retorna o histórico de posições do equipamento
 * @param {IEquipmentDetails} equipment - O equipamento com detalhes
 * @returns {{ lat: number; lon: number }[]} - O histórico de posições do equipamento
 */
export function getEquipmentPositionHistory(equipment: IEquipmentDetails) {
  return equipment.positionHistory.map((position) => {
    return {
      lat: position.lat,
      lon: position.lon,
    };
  });
}

/**
 * Fetches JSON data from the provided URL.
 * @param {string} url - The URL to fetch JSON data from.
 * @returns {Promise<any>} A promise that resolves to the parsed JSON data.
 */
export async function fetchJSON(url) {
  const res = await fetch(url);
  return res.json();
}

/**
 * Fetches the equipment states.
 * @returns {Promise<any>} A promise that resolves to the equipment states data.
 */
export async function fetchStates() {
  return await fetchJSON("assets/equipmentState.json");
}

/**
 * Fetches the equipment models.
 * @returns {Promise<any>} A promise that resolves to the equipment models data.
 */
export async function fetchModels() {
  return await fetchJSON("assets/equipmentModel.json");
}

/**
 * Fetches all asset data related to equipments, including:
 * - Equipments
 * - Equipment models
 * - Equipment state histories
 * - Equipment states
 * - Equipment position histories
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   - equipments: Array of equipments.
 *   - equipmentModels: Array of equipment models.
 *   - equipmentStateHistories: Array of equipment state histories.
 *   - equipmentStates: Array of equipment states.
 *   - equipmentPositionHistories: Array of equipment position histories.
 */
async function getAssets() {
  const [
    equipments,
    equipmentModels,
    equipmentStateHistories,
    equipmentStates,
    equipmentPositionHistories,
  ] = await Promise.all([
    fetchJSON("assets/equipment.json"),
    fetchModels(),
    fetchJSON("assets/equipmentStateHistory.json"),
    fetchStates(),
    fetchJSON("assets/equipmentPositionHistory.json"),
  ]);
  return {
    equipments,
    equipmentModels,
    equipmentStateHistories,
    equipmentStates,
    equipmentPositionHistories,
  };
}

/**
 * Maps equipment data with its related information, such as model, state history, and position history.
 * @param {Object} equipment - The equipment object.
 * @param {Object} assets - The assets object containing arrays for models, state histories, states, and position histories.
 * @param {boolean} [includeHistory=false] - Indicates whether to include history details (states and positions).
 * @returns {Object} An object containing the mapped equipment information:
 *   - equipmentId: Equipment ID.
 *   - equipmentName: Equipment name.
 *   - modelName: Model name.
 *   - stateId: Most recent state ID.
 *   - actualState: Name of the most recent state.
 *   - latitude: Latitude of the latest position.
 *   - longitude: Longitude of the latest position.
 *   - colorState: Color associated with the most recent state.
 *   - historyPositions (optional): Position history details (if includeHistory is true).
 *   - stateHistoryDetails (optional): State history details (if includeHistory is true).
 */
function mapEquipment(equipment, assets, includeHistory = false) {
  const {
    equipmentModels,
    equipmentStateHistories,
    equipmentStates,
    equipmentPositionHistories,
  } = assets;

  const model = equipmentModels.find(
    (m) => m.id === equipment.equipmentModelId
  );

  const stateHistory = equipmentStateHistories.find(
    (s) => s.equipmentId === equipment.id
  );
  const sortedStates = [...stateHistory.states].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const orderedStateDetails = sortedStates.map((state) => {
    const stateDetail = equipmentStates.find(
      (s) => s.id === state.equipmentStateId
    );
    return {
      id: stateDetail.id,
      name: stateDetail.name,
      color: stateDetail.color,
      date: new Date(state.date).toLocaleString(),
    };
  });
  const mostRecentState = orderedStateDetails[0];

  const positionHistory = equipmentPositionHistories.find(
    (p) => p.equipmentId === equipment.id
  );
  const sortedPositions = [...positionHistory.positions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const orderedPositionsDetails = sortedPositions.map((position) => ({
    lat: position.lat,
    lon: position.lon,
    date: new Date(position.date).toLocaleString(),
  }));

  const latestPosition = orderedPositionsDetails[0];

  const popUpInfos = {
    equipmentId: equipment.id,
    equipmentName: equipment.name,
    modelId: model.id,
    modelName: model.name,
    stateId: mostRecentState.id,
    actualState: mostRecentState.name,
    latitude: latestPosition.lat,
    longitude: latestPosition.lon,
    colorState: mostRecentState.color,
  };

  if (includeHistory) {
    popUpInfos.historyPositions = orderedPositionsDetails;
    popUpInfos.stateHistoryDetails = orderedStateDetails;
  }

  return popUpInfos;
}

/**
 * Retrieves equipment data by its ID, with an option to include history details.
 * @param {string} equipmentId - The ID of the equipment to retrieve.
 * @param {boolean} [includeHistory=false] - Indicates whether to include state and position history.
 * @returns {Promise<Object>} A promise that resolves to the mapped equipment data.
 */
export async function getEquipmentById(equipmentId, includeHistory = false) {
  const assets = await getAssets();
  const equipment = assets.equipments.find((e) => e.id === equipmentId);
  return mapEquipment(equipment, assets, includeHistory);
}

/**
 * Retrieves all equipments with an option to filter by state or model.
 * @param {Object} [filters={}] - Filter object to restrict the equipments.
 * @param {string} [filters.stateId] - (Optional) State ID to filter the equipments.
 * @param {string} [filters.modelId] - (Optional) Model ID to filter the equipments.
 * @returns {Promise<Object[]>} A promise that resolves to an array of mapped equipment objects.
 */
export async function getAllEquipments(filters = {}) {
  const { stateId, modelId } = filters;
  const assets = await getAssets();
  const allEquipments = assets.equipments.map((equipment) =>
    mapEquipment(equipment, assets, false)
  );
  if (stateId || modelId) {
    return allEquipments.filter((equipment) => {
      let matches = true;
      if (stateId) {
        matches = matches && equipment.stateId === stateId;
      }
      if (modelId) {
        matches = matches && equipment.modelId === modelId;
      }
      return matches;
    });
  }
  return allEquipments;
}

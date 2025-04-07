import { 
    Equipment, 
    EquipmentModel, 
    HistoryData,
    PositionData
} from "../types/equipment";

/**
 * Generates friendly names for equipment based on their models
 */
export const generateEquipmentNames = (
    equipmentData: Equipment[], 
    modelsData: EquipmentModel[]
): Record<string, string> => {
    const names: Record<string, string> = {};
    const modelCounts: Record<string, number> = {};
    
    equipmentData.forEach((eq) => {
        const model = modelsData.find((m) => m.id === eq.equipmentModelId);
        if (model) {
            // Initialize counter for this model if not exists
            if (!modelCounts[model.name]) {
                modelCounts[model.name] = 0;
            }
            
            // Increment counter
            modelCounts[model.name]++;
            
            // Create friendly name with consistent naming
            let friendlyName = model.name;
            
            // Standardize model names in friendly names
            if (model.name.toLowerCase().includes('caminhão')) {
                friendlyName = 'Caminhão';
            } else if (model.name.toLowerCase().includes('harvester')) {
                friendlyName = 'Colheitadeira';
            } else if (model.name.toLowerCase().includes('garra')) {
                friendlyName = 'Garra';
            }
            
            names[eq.id] = `${friendlyName} ${modelCounts[model.name]}`;
        }
    });
    
    return names;
};

/**
 * Processes history data into a record keyed by equipment ID
 */
export const processHistoryData = <T extends 'states' | 'positions'>(
    data: (HistoryData | PositionData)[], 
    property: T
): Record<string, T extends 'states' ? HistoryData['states'] : PositionData['positions']> => {
    return data.reduce((acc, item) => {
        // Type guard to check which type of data we're dealing with
        if (property === 'states' && 'states' in item) {
            // Use a type assertion that respects the conditional return type
            acc[item.equipmentId] = item.states as (T extends 'states' ? HistoryData['states'] : PositionData['positions']);
        } else if (property === 'positions' && 'positions' in item) {
            // Use a type assertion that respects the conditional return type
            acc[item.equipmentId] = item.positions as (T extends 'states' ? HistoryData['states'] : PositionData['positions']);
        }
        return acc;
    }, {} as Record<string, T extends 'states' ? HistoryData['states'] : PositionData['positions']>);
};

/**
 * Determines equipment type based on model name
 */
export const getEquipmentTypeFromModel = (modelName: string): string => {
    const model = modelName.toLowerCase();
    if (model.includes('caminhão')) return 'truck';
    if (model.includes('harvester')) return 'harvester';
    if (model.includes('garra')) return 'garra';
    return 'truck'; // Default
};
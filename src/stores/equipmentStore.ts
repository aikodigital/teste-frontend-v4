import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentPositionHistory,
  EquipmentStateHistory
} from '@/models';

export const useEquipmentStore = defineStore('equipment', () => {
  const equipments = ref<Equipment[]>([]);
  const equipmentModels = ref<EquipmentModel[]>([]);
  const equipmentStates = ref<EquipmentState[]>([]);
  const positionHistory = ref<EquipmentPositionHistory[]>([]);
  const stateHistory = ref<EquipmentStateHistory[]>([]);
  
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed properties
  const equipmentWithDetails = computed(() => {
    return equipments.value.map(equipment => {
      const model = equipmentModels.value.find(m => m.id === equipment.equipmentModelId);
      const positions = positionHistory.value.find(p => p.equipmentId === equipment.id)?.positions || [];
      const states = stateHistory.value.find(s => s.equipmentId === equipment.id)?.states || [];
      
      const latestPosition = positions.length > 0 ? positions[positions.length - 1] : null;
      const latestState = states.length > 0 ? 
        equipmentStates.value.find(s => s.id === states[states.length - 1].equipmentStateId) : null;
      
      return {
        ...equipment,
        model,
        latestPosition,
        latestState,
        positions,
        states
      };
    });
  });

  async function fetchEquipmentData() {
    try {
      loading.value = true;
      error.value = null;
      
      const [equipRes, modelsRes, statesRes, posRes, stateHistRes] = await Promise.all([
        import('@/data/equipment.json'),
        import('@/data/equipmentModel.json'),
        import('@/data/equipmentState.json'),
        import('@/data/equipmentPositionHistory.json'),
        import('@/data/equipmentStateHistory.json')
      ]);
      
      equipments.value = equipRes.default;
      equipmentModels.value = modelsRes.default;
      equipmentStates.value = statesRes.default;
      positionHistory.value = posRes.default;
      stateHistory.value = stateHistRes.default;
    } catch (err) {
      error.value = 'Failed to load equipment data';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    equipments,
    equipmentModels,
    equipmentStates,
    positionHistory,
    stateHistory,
    equipmentWithDetails,
    loading,
    error,
    fetchEquipmentData
  };
});
<template>
  <div style="margin-bottom: 16px;">
    <label>
      Modelo:
      <select v-model="modelId">
        <option value="">Todos</option>
        <option
          v-for="model in uniqueModels"
          :key="model"
          :value="model"
        >
          {{ model }}
        </option>
      </select>
    </label>

    <label style="margin-left: 16px">
      Estado:
      <select v-model="stateId">
        <option value="">Todos</option>
        <option
          v-for="state in equipmentState"
          :key="state.id"
          :value="state.id"
        >
          {{ state.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import equipmentModel from '../data/equipmentModel.json';
import equipmentState from '../data/equipmentState.json';

export default {
  name: 'EquipmentFilter',

  data() {
    return {
      modelId: '',
      stateId: '',
      equipmentState
    };
  },

  computed: {
    uniqueModels() {
      return [...new Set(equipmentModel.map(e => e.name))];
    }
  },

  watch: {
    modelId() {
      this.emitFilters();
    },
    stateId() {
      this.emitFilters();
    }
  },

  methods: {
    emitFilters() {
      this.$emit('filter-change', {
        modelId: this.modelId,
        stateId: this.stateId
      });
    }
  }
};
</script>

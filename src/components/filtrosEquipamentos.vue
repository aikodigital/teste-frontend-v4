<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
  },
  data() {
    return {
      filters: {
        model: '',
        equipamento: '',
        status: '',
        updateDate: ''
      }
    };
  },
  computed: {
    ...mapState({
      equipamentos: state => state.equipamentosTratados,
      modelos: state => state.dadosEquipamentos.equipamentosModelo,
      estados: state => state.dadosEquipamentos.equipamentosEstado
    })
  },

  methods: {
    ...mapActions({
      filtrar: 'applyFilters'
    }),
    
    resetFilters() {
      this.filters = {
        model: '',
        equipamento: '',
        status: '',
        updateDate: ''
      };
      this.filtrar(this.filters)
    }
  }
};
</script>

<template>
  <div class="equipment-filter">
    <h5>Filtrar</h5>
    <form @submit.prevent="filtrar(filters)">
      <div class="filter-row">
        <div class="filter-group">
          <label>Modelo:</label>
          <select v-model="filters.model">
            <option value="">Todos</option>
            <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
              {{ modelo.name }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label>Status:</label>
          <select v-model="filters.status">
            <option value="">Todos</option>
            <option v-for="estado in estados" :key="estado.id" :value="estado.id">
              {{ estado.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-group">
          <label>Equipamento:</label>
          <select v-model="filters.equipamento">
            <option value="">Todos</option>
            <option v-for="equi in equipamentos" :key="equi.id" :value="equi.id">
              {{ equi.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="filter-actions">
        <button type="submit" class="apply-btn">Aplicar Filtros</button>
        <button type="button" @click="resetFilters" class="reset-btn">Limpar Filtros</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.equipment-filter {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.equipment-filter h5 {
  margin-top: 50px;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.filter-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}
.filter-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.filter-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #495057;
}
.filter-group select,
.filter-group input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}
.filter-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.apply-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.reset-btn {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #ced4da;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.apply-btn:hover {
  background-color: #3367d6;
}
.reset-btn:hover {
  background-color: #e9ecef;
}
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
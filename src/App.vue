<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
<script>
import { mapActions, mapState } from 'vuex'

import mapaEquipamentos from './components/mapaEquipamentos.vue'
import filtrosEquipamentos from './components/filtrosEquipamentos'

export default {
  components: {
    mapaEquipamentos,
    filtrosEquipamentos
  },
  computed: {
    ...mapState({
      equipamentosFiltrados: state => state.equipamentosTratados
    })
  },
  methods: {
    ...mapActions({
      getDadosEquipamentos: 'getDadosEquipamentos'
    })
  },
  created() {
    this.getDadosEquipamentos()
  }
}
</script>
<template>
  <div class="row app">
    <mapaEquipamentos class="col-lg-9" />
    <filtrosEquipamentos class="col-lg-3" />
  </div>
</template>

<style scoped>
  .app {
    margin-right:0px;
    background-color: #f5f5f5
  }
</style>
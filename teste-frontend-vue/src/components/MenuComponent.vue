<template>
  <div class="menu-content" :style="{ height: menuHeight }">
    <DataTable 
      :v-model:selection="selectedEquipment" 
      v-model:filters="filters"
      :value="listEquipments" 
      @row-select="selectEquipment"
      selectionMode="single"
      >
      <template #header>
        <div class="header-menu">
          <IconField>
            <InputText class="input-search" v-model="filters['global'].value" placeholder="Digite aqui..." />
          </IconField>
          <div class="selects-filters">
            <Select @change="setModelFilter" v-model="selectedModelFilter" showClear placeholder="Modelos" optionLabel="name" :options="equipamentModels"></Select>
            <Select @change="setStateFilter" v-model="selectedStateFilter" showClear placeholder="Estados" optionLabel="name" :options="equipamentStates"></Select>
          </div>
        </div>
      </template>
      <template #empty> Busca não encontrada </template>
      <Column field="name" sortable header="Nome do equipamento"></Column>
      <Column field="model.name" sortable header="Modelo"></Column>
      <Column field="actualState.name" sortable header="Status">
        <template #body="{ data }">
          <span class="dot-status" :style="{ color: data.actualState?.color }">•</span>
          {{ data.actualState?.name || '-' }} 
        </template>
      </Column>
      <Column field="id" sortable header="ID">
        <template #body="{ data }">
          {{ data.id || '-' }} 
          <a class="btn-copy" @click="copyId(data.id)">
            <i class="pi pi-clone" style="color: slateblue"></i>
          </a>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import equipmentModels from "../../../data/equipmentModel.json";
import equipmentStates from "../../../data/equipmentState.json";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';

export default {
  name: "MenuComponent",
  props: {
    menuHeight: {
      type: Number,
      default: 0
    },
    listEquipments: {
      type: Object,
      default: null
    }
  },
  components: {
    DataTable,
    Column,
    Select
  },
  setup() {
    const toast = useToast();
    const equipamentModels = equipmentModels;
    const equipamentStates = equipmentStates;
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    return {
      filters,
      toast,
      equipamentModels,
      equipamentStates
    }
  },
  data() {
    return {
      selectedModelFilter: null as any,
      selectedStateFilter: null as any,
      selectedEquipment: null as any,
      // listModels: ["Caminhão de carga", "Garra traçadora", "Harvester"] as string[],
      // listStates: ["Operando", "Manutenção", "Parado"] as string[]
    }
  },
  methods: {
    setModelFilter(ev: any) {
      // console.log(ev.value);
      this.$emit("setModelFilter", ev.value);
    },
    setStateFilter(ev: any) {
      this.$emit("setStateFilter", ev.value);
    },
    selectEquipment(ev: any) {
      this.$emit('selectEquipment', ev.data);
    },
    async copyId(id: string) {
      await navigator.clipboard.writeText(id);
      this.toast.add({ severity: 'success', summary: 'ID copiado!', life: 3000 });
    },
  },
  mounted() {
    console.log(this.listEquipments);
  },
}

</script>

<style scoped>
.menu-content {
  width: 100%;
  height: -webkit-fill-available;
  background-color: black;
}
.selects-filters .p-select {
  margin-left: 5px;
}
.input-search {
  width: 300px;
}
.dot-status {
  font-size: 22px;
  text-shadow: 0 0 5px currentColor;
  margin-right: 5px;
}
.header-menu{  
  display: flex;
  justify-content: space-between;
}
</style>


<template>
  <Dialog v-model:visible="isModalVisible" modal header="Histórico de estados do equipamento" @hide="closeModal()">
    <DataTable 
      class="table-modal-history"
      v-model:filters="filters"
      :value="equipment.stateHistory" 
      dataKey="date"
      :globalFilterFields="['date', 'state.name']"
      >
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['date'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
    <template #empty> No customers found. </template>
      <Column field="date" sortable header="Data">
        <template #body="{ data }">
          {{ parseDate(data.date) }}
        </template>
      </Column>
      <Column header="Status" sortable>
        <template #body="{ data }">
          <span class="dot-status" :style="{ color: data.state?.color }">•</span>
          {{ data.state?.name || '-' }} 
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>

<script lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';

export default {
  name: "HistoryComponent",
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    equipment: {
      type: Object,
      default: null
    }
  },
  components: {
    DataTable,
    Column,
    Dialog,
    InputText,
    InputIcon,
    IconField
  },
  setup() {

    const filters = ref({
      date: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    return {
      filters
    }
  },
  watch: {
    'isDialogVisible': {
      immediate: false,
      handler(newValue) {
        this.isModalVisible = newValue;
      }
    }
  },
  data() {
    return {
      isModalVisible: this.isDialogVisible as unknown as boolean
    }
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
      this.$emit("closeModal", false);
    },
    parseDate(value: string) {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
  },
  mounted() {
  },
}

</script>

<style scoped>
.menu-content {
  width: 100%;
  height: -webkit-fill-available;
  background-color: red;
}
.dot-status {
  font-size: 22px;
  text-shadow: 0 0 5px currentColor;
  margin-right: 5px;
}
.table-modal-history {
  height: 400px;
  width: 500px;
}
</style>


<template>
  <Dialog v-model:visible="isModalVisible" modal header="Histórico de posições do equipamento" @hide="closeModal()">
    <DataTable 
      class="table-modal-position"
      v-model:filters="filters"
      :value="equipment.history" 
      dataKey="date"
      :globalFilterFields="['date', 'state.name']"
      >
      <template #header>
        <div class="modal-positions-header">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['date'].value" placeholder="Keyword Search" />
          </IconField>
          <Button @click="sendPositionPolyline(equipment)">
            <i class="pi pi-map"></i>
            Desenhar no mapa
          </Button>
        </div>
      </template>
      <template #empty> Busca não encontrada </template>
      <Column field="date" sortable header="Data">
        <template #body="{ data }">
          {{ parseDate(data.date) }}
        </template>
      </Column>
      <Column header="Coordenadas" sortable>
        <template #body="{ data }">
          {{ "Lat: " + data.lat + ", Long: " + data.lon }} 
        </template>
      </Column>
      <!-- <Column>
        <template #body="{ data }">
          <a class="btn-see-position" @click="setCenter({lat: data.lat, lng: data.lon})">Ver no mapa >></a>
        </template>
      </Column> -->
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
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

export default {
  name: "PositionHistoryComponent",
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
    setCenter(center: any) {
      this.isModalVisible = false;
      this.$emit("setCenter", center);
    },
    closeModal() {
      this.isModalVisible = false;
      this.$emit("closeModal", false);
    },
    sendPositionPolyline(eq: any) {
      const positions = this.parseLocalizations(eq);
      const polylineOptions = {
        path: positions,
        strokeColor: this.getLineColor(eq.model.name),
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
      this.$emit("getPolylinePositions", polylineOptions);
      this.closeModal();
    },
    getLineColor(model: string) {
      switch(model) {
        case "Caminhão de carga": return "#0000FF";
        case "Harvester": return "#00FF00";
        case "Garra traçadora": return "#FF0000";
      }
    },
    parseLocalizations(value: any) {
      const mappedLocalizations = value.history.map((item: any) => {
        return {
          lat: item.lat,
          lng: item.lon
        }
      });
      return mappedLocalizations
    },
    parseDate(value: string) {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
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
.table-modal-position {
  height: 400px;
  width: 600px;
}
.btn-see-position {
  color: rgb(51, 202, 109);
}
.btn-see-position:hover {
  cursor: pointer;
  color: rgb(255, 255, 255);
}
.modal-positions-header {
  display: flex;
  justify-content: space-between;
}
.modal-positions-header button {
  color: white;
}
</style>


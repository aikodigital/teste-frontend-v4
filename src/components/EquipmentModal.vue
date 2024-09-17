<!-- src/components/EquipmentModal.vue -->
 <template>
   <div class="modal-overlay" v-if="equipment">
    <div :class="modalClass">
      <button class="close-button" @click="closeModal">✖</button>
      <h2 v-if="!showHistoryContent">Equipamento</h2>
      <h2 v-if="showHistoryContent">Histórico de Equipamento</h2>
      <div v-if="!showHistoryContent">
        <h3><strong>Código:</strong> {{equipment.name}}</h3>
        <h3><strong>Modelo:</strong> {{ equipment.nameModel }}</h3>
        <h3><strong>Valor total gerado:</strong>{{ totalGeneratedValue }}</h3>
        <button class="button" @click="showHistory">Ver Histórico</button>
      </div>
      
      <div v-if="showHistoryContent">
        
        <div class="table-container">
          <h2>{{ equipment.nameModel }}</h2>
        <table id="state" >
          <thead><th>Data/Hora</th><th>Estado</th></thead>
          <tbody v-for="(state, index) in paginatedStates" :key="state.equipmentStateId + '-' + index">
              <tr>
                <td>{{ state.date }}</td>
                <td :style="{ color: state.color }"> {{ state.name }}</td>
              </tr>
          </tbody>
        </table>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1"> &lt; </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"> &gt; </button>
        </div>
        <div>
          <button class="button" @click="goBack">Voltar</button>
        </div>
      </div>

    </div>
   </div>
 </template>
 
 <script>
import equipmentObjectService from '@/services/equipmentObjectService';
    
 export default {
    props: {
        equipment: {
            type: Object,
            required: true
        }
    }, 
    data() {
      return {
        showHistoryContent: false,
        states: [],
        statesShow:[],
        currentPage: 1,
        itemsPerPage: 5,
      };
    },
    computed: {
    modalClass() {
      return this.showHistoryContent ? 'modal modal-large' : 'modal'
    },
    paginatedStates() {
      if (!this.equipment || !this.equipment.states) {
        return []
      }
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.equipment.states.slice(start, end)
    },
    totalPages() {
      if (!this.equipment || !this.equipment.states) {
        return 1
    }
      return Math.ceil(this.equipment.states.length / this.itemsPerPage)
    },
    lastDate() {
    if (!this.equipment.states || this.equipment.states.length === 0) return null
    const dates = this.equipment.states.map(state => new Date(state.date))
    console.log(dates)
    return new Date(Math.max(...dates))
  },
    totalGeneratedValue() {
      if (!this.equipment.hourlyEarnings || this.equipment.hourlyEarnings.length === 0) return 0
      return this.equipment.hourlyEarnings.reduce((acc, earning) => acc + earning.value, 0)
    }, 
  },
    methods: {
      async showHistory() {
        this.showHistoryContent = true;
        const states = await equipmentObjectService.getHistoryStates(this.equipment.id)
        states.map( reg=> {
          const date = new Date(reg.date)
          const day = String(date.getDate()).padStart(2, '0')
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const year = date.getFullYear()
          if (!isNaN(date.getTime())) {
            reg.date = `${day}/${month}/${year} - ${hours}:${minutes}`
          } else {
            console.warn(`Data inválida: ${reg.date}`)
            reg.date = 'Data inválida'
          }
        })
        this.$set(this.equipment, 'states', states)
      },
      async showEquipment() {
        this.states = await equipmentObjectService.getHistoryStates(this.equipment.id)
        this.showHistoryContent = false;
      },
      closeModal() {
        this.$emit('close-modal')
      },
      goBack() {
      this.showHistoryContent = false;
    },
      nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    }
 }
 </script>
 
 <style>
 .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #fff;
    padding: 20px;
    max-width: 400px;
    width: 100%;
    max-height: 80hv;
    overflow-y: auto;
    z-index: 10;
    position: relative;
    display: flex;
  flex-direction: column;
  }
  .modal-large {
    max-width: 30rem;
    max-height: 90vh;
    overflow-y: auto;
  }

  .table-container {
    margin-bottom: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;
  }
  table th,
  table td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
  table thead th {
    position: sticky;
    top: 0;
    background-color: #f1f1f1;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .pagination button {
    padding: 5px 10px;
    font-size: 1rem;
  }
  
  .pagination span {
    font-size: 1rem;
  }

  .button {
    font-size: 1.2rem;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
  }
  .close-button {
    align-self: flex-end;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .close-button:hover {
    color: red;
  }

 </style>
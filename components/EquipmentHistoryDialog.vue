<template lang="pug">
v-card(class="history-modal" v-if="isVisible" max-width="400px")
        v-card-title
            v-row(align="center" justify="space-between")
                | Histórico de Estados - {{ equipment?.name }}
                v-btn.my-2(@click="closeDialog" rounded-xl variant="tonal" icon="mdi-close")
        v-card-text
            v-row.wrap
                v-col(cols="12")
                    v-alert(type="info" class="my-4")
                        | Produtividade: {{ productivity }}%
                        br
                        |Ganho Total: {{ formatCurrency(earnings) }}
                v-col(cols="6")
                    span.font-weight-bold Data: 
                v-col(cols="6")
                    span.font-weight-bold Estado:

            v-card.text-black.rounded-xl.pa-4.my-2(v-for="state in paginatedHistory" :key="state.id" color="grey-lighten-3" elevation="0" width="100%")
                v-row.wrap
                    v-col(cols="6")
                        span.text-body-1 {{ new Date(state.date).toLocaleString() }}
                    v-col(cols="6")
                        span.text-body-1(:style="`color: ${getState(state.equipmentStateId).color};`")
                            | {{ getState(state.equipmentStateId).name }}
        v-card-actions
            v-row(align="center" justify="center" width="100%")
                v-btn(@click="prevPage" :disabled="currentPage === 1" icon="mdi-chevron-left")
                | Página {{ currentPage }} de {{ totalPages }} ({{ history.length }} itens)
                v-btn(@click="nextPage" :disabled="currentPage === totalPages" icon="mdi-chevron-right")
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '../stores/main'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    equipment: {
        type: Object,
        required: false,
    },
})

const isVisible = computed(() => props.visible)

const emit = defineEmits(['update:visible'])

const closeDialog = () => {
    currentPage.value = 1
    emit('update:visible')
}

const store = useMainStore()

const history = computed(() => {
    if (props.equipment) {
        return store.getEquipmentHistory(props.equipment.id) || []
    }
    return []
})

const getState = (id) => {
    const state = store.getEquipmentStateDetails(id)
    return state || {name: 'Desconhecido', color: "#808080"}
}

const productivity = computed(() => {
    if (props.equipment) {
        return store.getEquipmentProductivity(props.equipment.id) || 0
    }
    return 0
})

const earnings = computed(() => {
    if (props.equipment) {
        return store.getEquipmentEarnings(props.equipment.id) || 0
    }
    return 0
})

const itemsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(history.value.length / itemsPerPage))

const paginatedHistory = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return history.value.slice(start, end)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
    currentPage.value += 1
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
    currentPage.value -= 1
    }
}

const formatCurrency = (item) => {
    const formatter = new Intl.NumberFormat('pt', {
        style: 'currency',
        currency: 'BRL'
    })
    return formatter.format(item).replaceAll('BRL', '')
}
</script>
<style scoped>
.history-modal {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background: white;
}
</style>
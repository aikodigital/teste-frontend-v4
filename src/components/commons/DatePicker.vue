<template>
  <div class="date-picker">
    <q-btn icon="event" round color="purple">
      <q-popup-proxy @before-show="proxyDateFunction" cover transition-show="scale" transition-hide="scale">
        <q-date v-model="proxyDate" @update:model-value="emitValue">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn label="OK" color="primary" flat v-close-popup />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>

    <q-badge class="badge" color="secondary">
      Data: {{ dateBrazil }}
    </q-badge>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { formatDate } from 'date-fns';

const proxyDate = ref<Date>(new Date());
const dateBrazil = computed(() => {
  return formatDateBrazil(proxyDate.value);
});

function proxyDateFunction() {
  proxyDate.value = formatDate(new Date(), 'yyyy/MM/dd');
}
function formatDateBrazil(date: Date): string {
  return formatDate(date, 'dd/MM/yyyy');
}

const emit = defineEmits<{
  (event: 'update:selectedValue', value: Date | undefined): void;
}>();

const emitValue = (value: Date | undefined) => {
  emit('update:selectedValue', value);
};
</script>

<style lang="scss" scoped>
.date-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.badge {
  font-size: .9rem;
  padding: 5px;
}
</style>

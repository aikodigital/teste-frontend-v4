<script lang="ts" setup>
import { generateRandomId } from '@/utils';
import { provide, ref, onMounted } from 'vue';

const props = defineProps<{
  id?: string
}>();

const id = props.id || generateRandomId();

const tabs = ref<Array<string>>([]);
const selectedTabId = ref<string | null>(null);

function selectTab(id: string | null) {
  selectedTabId.value = id;
}

provide('selectTab', selectTab);
provide('selectedTabId', selectedTabId);
provide('tabControllerId', id);

provide('register', (tabId: string) => tabs.value.push(tabId));

onMounted(() => {
  selectTab(tabs.value[0]);
});
</script>

<template>
  <div class="w-full flex flex-col">
    <div
      class="flex gap-2 p-2"
      data-testid="tab-controller-header"
    >
      <slot />
    </div>
    <div
      class="p-3 rounded w-full flex-1"
      :id="`tab-controller-${id}-body`"
      data-testid="tab-controller-body"
    >
    </div>
  </div>
</template>
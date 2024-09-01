<script lang="ts" setup>
import { useIsMounted } from '@/composables';
import { generateRandomId } from '@/utils';
import { inject, ref, Ref } from 'vue';

const props = defineProps<{
  title?: string,
  id?: string
}>();

const id = props.id || generateRandomId();

const selectTab = inject<(id: string) => void>('selectTab', () => { });
const selectedTabId = inject<Ref<string | null>>('selectedTabId', ref(null));
const register = inject<(tabId: string) => void>('register', () => { });
const tabControllerId = inject<string>('tabControllerId');

register(id);

defineExpose({
  id,
});

const isMounted = useIsMounted();
</script>

<template>
  <div>
    <button
      class="p-2 rounded"
      :class="{ 'bg-blue-300 text-gray-800': selectedTabId === id }"
      @click="selectTab(id)"
      data-testid="tab-title-button"
    >
      <slot name="title">
        <p class="font-semibold">
          {{ title }}
        </p>
      </slot>
    </button>

    <Teleport
      v-if="isMounted"
      :to="`#tab-controller-${tabControllerId}-body`"
    >
      <span
        v-show="selectedTabId === id"
        data-testid="tab-body"
      >
        <slot />
      </span>
    </Teleport>
  </div>
</template>
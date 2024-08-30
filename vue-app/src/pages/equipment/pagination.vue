<script setup lang="ts">
import {
  Button,
} from '@/components/ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import {  ref } from 'vue';

const page = ref(1)

const props = defineProps<{
  total: number,
  itemsPerPage: number,
  defaultPage?: number,
}>()

function updatePage(value: number) {
  page.value = value
}

defineExpose({
  updatePage,
})

</script>

<template>
  <Pagination 
    v-slot="{ page }"
    :page="page"
    :total="props.total" 
    :items-per-page="props.itemsPerPage" 
    :sibling-count="1"
    show-edges 
    :default-page="props.defaultPage ?? 1" 
    class="px-4">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1 justify-center">
      <PaginationPrev class="w-8 h-8 p-0 text-xs"/>
      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button @click="() => updatePage(item.value)" class="w-8 h-8 p-0 text-xs" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis class=" text-xs" v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext class="w-8 h-8 p-0 text-xs"/>
    </PaginationList>
  </Pagination>
</template>
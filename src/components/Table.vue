<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
import SortIcon from "@/components/icon/Sort.vue";
import type { IColumn } from "@/types/table";
interface Props {
  columns: IColumn[];
  rows: any[];
  totalPage: number;
  itemsPerPage: number;
  currentPage: number;
}
const props = defineProps<Props>();

const emits = defineEmits([
  "changePerPage",
  "changePage",
  "itemsPerPageChange",
  "handleSort",
]);
function changePage(p: any) {
  emits("changePage", p);
}
const handleItemsPerPageChange = (value: any) => {
  emits("itemsPerPageChange", value);
};
</script>
<style scoped>
.rowInactive {
  background-color: #ffe2e2;
}
</style>
<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="px-6 py-3 text-[12px] text-left text-[#6B7280] uppercase border-b border-gray-200 bg-gray-50"
          >
            <button
              type="button"
              class="flex items-center gap-1"
              @click.prevent="emits('handleSort', column.key)"
            >
              {{ column.label }}
              <span v-if="column.sort">
                <SortIcon />
              </span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="hover:bg-gray-50">
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-[#6B7280] text-[14px]"
          >
            <span v-if="!column.custom"> {{ row[column.key] }}</span>
            <template v-else>
              <slot :name="column.key" :row="row" />
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :totalItems="props.totalPage"
      :currentPage="props.currentPage"
      :itemsPerPage="props.itemsPerPage"
      @pageChange="(p: any) => changePage(p)"
      @items-per-page-change="handleItemsPerPageChange"
    />
  </div>
</template>

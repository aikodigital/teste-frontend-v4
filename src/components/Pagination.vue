<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1,
})

const emits = defineEmits(['pageChange'])

const paginationItems = computed(() => {
  const range = [];
  const pageBuffer = 2; // Número de páginas de buffer ao redor da página atual

  if (totalPages.value <= 10) {
    // Exibe todas as páginas se o número total de páginas for menor ou igual a 10
    for (let i = 1; i <= totalPages.value; i++) {
      range.push(i);
    }
  } else {
    // Exibe elipses se o número total de páginas for maior que 10
    const startPage = Math.max(1, props.currentPage - pageBuffer);
    const endPage = Math.min(totalPages.value, props.currentPage + pageBuffer);

    if (startPage > 1) {
      range.push(1);
      range.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPages.value) {
      range.push('...');
      range.push(totalPages.value);
    }
  }

  return range;
});

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const changePage = (page: any) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emits('pageChange', page);
  }
};
</script>

<template>
  <div class="flex justify-center space-x-2 my-5">
    <!-- Botão de página anterior -->
    <button v-if="currentPage > 1" :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
      class="px-2 py-1 sm:px-4 cursor-pointer bg-white sm:py-2 mt-2 text-gray-600 border border-gray-600 rounded-lg hover:bg-mediumslateblue-200 hover:border-mediumslateblue-200 focus:outline-none">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
        aria-hidden="true">
        <path fill-rule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Botões para páginas com elipses -->
    <button v-for="item in paginationItems" :key="item" @click.prevent="changePage(item)"
      class="px-2 py-1 sm:px-4 sm:py-2 mt-2  text-gray-600 border border-gray-600 rounded-lg hover:bg-mediumslateblue-200 hover:border-mediumslateblue-200 hover:text-white focus:outline-none"
      :class="{
      'px-3 py-1 border rounded': true,
      'bg-mediumslateblue-200 text-white border-0': item === currentPage,
      'bg-white hover:border-mediumslateblue-200': item !== currentPage,
    }">
      {{ item }}
    </button>

    <!-- Botão de próxima página -->
    <button v-if="currentPage !== totalPages" :disabled="currentPage === totalPages"
      @click.prevent="changePage(currentPage + 1)"
      class="px-2 py-1 sm:px-4 cursor-pointer bg-white  sm:py-2 mt-2 text-gray-600 border border-gray-600 rounded-lg hover:bg-mediumslateblue-200 hover:border-mediumslateblue-200 focus:outline-none">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
        aria-hidden="true">
        <path fill-rule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

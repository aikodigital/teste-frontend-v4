<template>
  <div class="pagination__controls">
    <button
      class="btn btn-primary"
      @click="$emit('prevPage')"
      :disabled="currentPage === 1"
    >
      <i class="bi bi-chevron-left"></i>
    </button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button
      class="btn btn-primary"
      @click="$emit('nextPage')"
      :disabled="currentPage === totalPages"
    >
      <i class="bi bi-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationControls",
  props: {
    currentPage: Number,
    totalPages: Number,
  },
};
</script>

<style scoped>
.pagination__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}
.pagination__controls button {
  background-color: #00c100;
  color: white;
  border: none;
}
.pagination__controls span {
  color: #002255;
  font-weight: 700;
}
</style>

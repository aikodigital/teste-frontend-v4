<template>
  <div v-if="isVisible" class="modal__overlay" @click="handleClickOutside">
    <div class="modal__component" @click.stop>
      <button class="close__button" @click="closeModal">X</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:isVisible", false);
    },
    handleClickOutside(event) {
      if (event.target.classList.contains("modal-overlay")) {
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal__component {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1001;
  width: 700px;
}

.close__button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>

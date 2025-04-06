<script setup lang="ts">
interface Props {
  size?: string
  borderWidth?: string
}
 const props = defineProps<Props>()
</script>

<template>
  <div
    class="spinner"
    :style="{ width: props.size, height: props.size }"
  >
    <div
      class="spinner-inner"
      :style="{ borderWidth: props.borderWidth }"
    />
  </div>
</template>

<style lang="scss">
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 20px auto;

  & > .spinner-inner {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid #f3f3f3;
    border-top: 4px solid rgba(var(--v-theme-primary), 0.8);
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}



</style>
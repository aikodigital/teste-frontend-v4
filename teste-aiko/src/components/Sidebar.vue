<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useEventListener } from "@vueuse/core";

const emit = defineEmits(["close"]);

const dialog = ref<HTMLDialogElement>();

onMounted(() => {
  dialog.value?.showModal();
});

onBeforeUnmount(() => {
  close();
});

function close() {
  dialog.value?.close();
}

useEventListener(dialog, "close", () => {
  emit("close");
});

const isFullscreen = ref(false);

</script>

<template>
  <dialog
    ref="dialog"
    class="dialog"
    :class="{
      'dialog--fullscreen': isFullscreen,
    }"
    data-testid="dialog"
  >
    <div class="dialog__body">
      <div class="flex justify-between w-100">
        <button
          class="p-2 text-black w-fit"
          data-testid="dialog-toggle-fullscreen"
          @click="() => isFullscreen = !isFullscreen"
        >
          <i
            class="fa-solid fa-lg"
            :class="{
              'fa-expand': !isFullscreen,
              'fa-compress': isFullscreen
            }"
          ></i>
        </button>

        <button
          class="p-2 text-black w-fit ml-auto"
          @click="close"
          data-testid="dialog-close"
        >
          <i class="fas fa-times fa-lg"></i>
        </button>
      </div>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
.dialog[open] {
  @apply opacity-100 translate-x-0;

  &.dialog--fullscreen {
    @apply w-full h-full;
  }

  &::backdrop {
    @apply opacity-20 bg-black;
  }
}

.dialog {
  @apply min-h-screen h-screen overflow-auto w-full max-w-[500px] m-0 ml-auto right-0 top-0 bottom-0 fixed opacity-0 translate-x-full bg-transparent;

  &.dialog--fullscreen {
    @apply top-0 bottom-0 left-0 right-0 min-h-full h-full w-full max-w-full overflow-hidden p-4 translate-x-0;
  }

  & .dialog__body {
    @apply flex flex-col gap-4 bg-white shadow-2xl w-full h-full p-4 overflow-auto rounded-lg;
  }

  transition: all 0.25s ease-in-out allow-discrete;
}

@starting-style {
  .dialog[open] {
    @apply opacity-0 translate-x-full;
  }
}
</style>
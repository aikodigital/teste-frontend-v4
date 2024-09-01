<script setup lang="ts">
import { useEventListener, useThrottleFn } from '@vueuse/core';
import { ref } from 'vue';

const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const popover = ref<HTMLElement>();
const popoverAnchor = ref<HTMLElement>();

useEventListener(popover, 'beforetoggle', () => {
  if (!popover.value || !popoverAnchor.value) {
    return;
  }

  updatePopoverPosition();
});

function updatePopoverPosition() {
  if (!popover.value || !popoverAnchor.value) {
    return null;
  }

  const anchorPosition = getAnchorRect();

  if (!anchorPosition) {
    return null;
  }

  popover.value.style.left = `${anchorPosition.left}px`;
  popover.value.style.top = `${anchorPosition.bottom}px`;
}

function getAnchorRect() {
  const rect = popoverAnchor.value?.getBoundingClientRect();

  if (!rect) {
    return null;
  }

  return rect;
}

useEventListener(window, 'resize', useThrottleFn(updatePopoverPosition));
useEventListener(window, 'scroll', updatePopoverPosition);

</script>

<template>
  <div>
    <button
      :popovertarget="randomId"
      ref="popoverAnchor"
    >
      <slot />
    </button>

    <div
      popover
      class="my-2 mr-2 ml-0 drop-shadow-md rounded p-2"
      ref="popover"
      :id="randomId"
    >
      <slot name="popover"> </slot>
    </div>
  </div>

</template>
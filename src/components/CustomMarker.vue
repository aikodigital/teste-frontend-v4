<!-- CustomMarker.vue -->
<script lang="ts">
import { defineComponent, PropType, watch } from "vue";

export default defineComponent({
  name: "CustomMarker",
  props: {
    position: {
      type: Array as unknown as PropType<[number, number]>, // position as a tuple [number, number]
      required: true,
    },
    content: {
      type: String as PropType<string>,
      default: (): string => "Custom Marker",
    },
  },
  setup(props, { emit }) {
    // emit event when position or content change
    watch(
      () => props.position,
      (newPosition) => {
        emit("update-marker", {
          position: newPosition,
          content: props.content,
        });
      },
      { immediate: true }
    );

    watch(
      () => props.content,
      (newContent) => {
        emit("update-marker", {
          position: props.position,
          content: newContent,
        });
      }
    );

    return {};
  },
});
</script>

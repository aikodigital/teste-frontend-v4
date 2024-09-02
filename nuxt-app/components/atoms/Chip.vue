<template>
  <v-chip class="ma-0" size="x-small" :color="color" label variant="elevated">
    <b style="color: #fff">{{ textContent }}</b>
  </v-chip>
</template>

<script setup lang="ts">
interface Props {
  textContent?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  textContent: () => 'NOT_FOUND',
  color: () => '#ccc',
});

const { textContent, color } = props;
</script>

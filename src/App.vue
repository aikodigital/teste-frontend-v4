<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.set(false)
</script>

<template>
  <RouterView />
</template>

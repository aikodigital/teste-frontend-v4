<script setup lang="ts">
interface Card {
  title: string | number
  imgUrl?: string
  description?: string | number
  subDescription?: string | number
}

const props = defineProps<Card>()
</script>

<template>
  <q-card flat bordered class="base-card">
    <q-card-section class="card-content">
      <q-img class="card-image q-ml-lg q-mb-md" :src="props.imgUrl" width="200px" no-native-menu>
      </q-img>

      <div class="q-mt-sm text-h6 card-title">{{ props.title }}</div>
      <q-list>
        <q-item>
          <q-item-section>{{ props.description }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>{{ props.subDescription }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.base-card {
  width: 280px;
  max-width: 280px;
  border-radius: 12px;
}

.card-image {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.card-content {
  background: #fff;
  padding: 16px;
}

.card-title {
  color: #333;
}

q-item {
  color: #555;
  font-size: 14px;
}
</style>

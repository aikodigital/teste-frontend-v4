<script setup lang="ts"></script>

<template>
  <section
    style="
      display: flex;
      align-items: start;
      justify-content: start;
      margin-top: 12px;
      width: 280px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    "
    class="flex"
  >
    <section style="display: flex; align-items: center">
      <section style="display: flex; align-items: center">
        <i
          :style="{
            color: '#2ecc71',
          }"
          class="material-icons mr-2"
        >
          circle
        </i>
        <span class="mt-1 mr-1" :style="{ fontSize: '14px' }">
          {{ 'Operando' }}
        </span>
      </section>
      <section style="display: flex; align-items: center; margin-left: 10px">
        <i
          :style="{
            color: '#f1c40f',
          }"
          class="material-icons mr-2"
        >
          circle
        </i>
        <span class="mt-1 mr-1" :style="{ fontSize: '14px' }">
          {{ 'Parado' }}
        </span>
      </section>
      <section style="display: flex; align-items: center; margin-left: 10px">
        <i
          :style="{
            color: '#e74c3c',
          }"
          class="material-icons"
        >
          circle
        </i>
        <span :style="{ fontSize: '14px' }">
          {{ 'Manutenção' }}
        </span>
      </section>
    </section>
  </section>
</template>

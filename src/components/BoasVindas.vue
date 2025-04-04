<template>
  <section>
    <div>
      <Logo />
      <p>
        O <span>Tree Metrics</span> é a plataforma centralizada para acompanhamento de equipamentos
        em campo, desenvolvida para fornecer visibilidade completa sobre as operações florestais.
        Para iniciar sua análise, selecione um item no mapa abaixo.
      </p>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 40px 0;
  color: rgba(var(--van-dyke), 1);
  text-align: center;
}

section > div {
  margin: 0 auto;
  padding: 10px;
  max-width: 980px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

p {
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 24px;
}

span {
  font-weight: 700;
}
</style>

<script setup lang="ts">
import Logo from './icons/Logo.vue'
</script>

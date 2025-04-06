<script setup lang="ts">
  const items = [
    {
      title: 'My Linkedin',
      icon: 'mdi-linkedin',
      href: 'https://www.linkedin.com/in/victor-almeida-304b05205/',
    },
  ]
</script>

<template>
  <v-footer
    height="30"
    app
    class="full-width-footer"
  >
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="24"
      />
    </a>
    <p class="text-caption text-disabled text-primary">
      Meu Linkedin
    </p>
    <div
      class="text-caption text-primary font-weight-bold"
      style="position: absolute; right: 16px;"
    >
      <span>Aiko Desafio Técnico</span>
    </div>
  </v-footer>
</template>

<style scoped lang="scss">
  .social-link :deep(.v-icon) {
    color: rgba(var(--v-theme-primary), 0.8);
    text-decoration: none;
    transition: .2s ease-in-out;

    &:hover {
      color: rgba(25, 118, 210, 1);
    }
  }
  
  .full-width-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 0 16px;
    height: 30px;
  }
</style>

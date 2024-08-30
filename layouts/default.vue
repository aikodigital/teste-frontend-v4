<template>
  <div id="layout-container">
    <AppHeader />
    <div class="page-container">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
#layout-container {
  background-color: rgb(200, 225, 200);
  user-select: none;

  .page-container {
    padding: 24px;
  }
}
</style>

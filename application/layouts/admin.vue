<template>
  <div class="h-screen w-screen pt-28 pb-20">
    <div class="action-bar">
      <LogoApp />
    </div>
    <div class="h-full w-full">
      <slot />
    </div>
    <div class="footer">
      <p>Powered by</p>
      <NuxtImg src="/aiko.png" class="w-16 h-auto" />
    </div>
  </div>
</template>

<style scoped>
.action-bar {
  @apply
    fixed
    top-0
    left-0 
    w-full
    flex
    justify-center
    p-4
    bg-gradient-to-r from-emerald-200 to-indigo-200
}

.footer {
  @apply 
    fixed
    bottom-0
    left-0 
    w-full
    flex
    flex-col
    items-center
    justify-center
    p-5
    text-sm
    font-light
    text-indigo-950
    bg-gradient-to-r from-indigo-400 to-emerald-400
}

</style>
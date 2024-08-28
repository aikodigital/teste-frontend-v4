<template>
  <div class="group inline-flex cursor-pointer border-2 border-red">
    <div class="logo-icon circuitry">
      <PhosphorIconCircuitry
        weight="thin"
      />
    </div>
    <div class="logo-icon tree">
      <PhosphorIconTree
        weight="thin"
      />
    </div>
  </div>
</template>

<style scoped>
.logo-icon {
  @apply
    text-5xl
    p-2
    bg-transparent
    transition-all
    duration-300
    border-2
}

.circuitry {
  @apply
    rounded-tl-lg
    border-r-0
    border-amber-800 
    text-amber-800 
    group-hover:bg-emerald-800 
    group-hover:text-emerald-100
    group-hover:border-emerald-800
    group-hover:rounded-tl-none
    group-hover:rounded-bl-lg
    group-hover:translate-x-1

}

.tree {
  @apply
    rounded-br-lg
    border-l-0
    border-emerald-800 
    text-emerald-800 
    group-hover:bg-amber-800 
    group-hover:text-amber-100
    group-hover:border-amber-800
    group-hover:rounded-br-none
    group-hover:rounded-tr-lg
    group-hover:-translate-x-1
}
</style>
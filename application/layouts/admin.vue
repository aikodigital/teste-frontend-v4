<template>
  <div class="h-screen w-screen pt-16 pb-20">
    <div class="border-b-2 border-emerald-500 fixed top-0 left-0  w-full flex items-center justify-center p-5">
      Logo
    </div>
    <div class="h-full w-full">
      <slot />
    </div>
    <div class="border-t-2 border-emerald-500 fixed bottom-0 left-0  w-full flex items-center justify-center p-5">
      <PhosphorIconMapPinArea />
    </div>
  </div>
</template>

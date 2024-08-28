<template>
  <header>
    <div class="flex items-center px-4 py-2 mb-8 border-b row bg-zinc-900 border-zinc-700 cursor-pointer" 
      @click="$router.push({name: 'home'})">
      <img src="@/assets/img/dodo-logo.png" alt="doodo" width="50" />
      <span class="text-xl font-bold text-zinc-200">Dodô</span>
      <span class="text-xl font-bold text-green-700">Agro</span>
      <img src="@/assets/img/aiko.png" alt="aiko" width="50" class="ml-4"/>
    </div>
  </header>
</template>

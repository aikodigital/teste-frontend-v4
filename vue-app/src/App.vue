<template>
  <main class="w-screen h-screen bg-zinc-800">
    <RouterView />
  </main>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
main {
  background-image: url("@/assets/img/background.png");
}
* {
  font-family: 'Montserrat', sans-serif;
}
</style>

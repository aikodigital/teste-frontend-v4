<template>
  <div class="home">
    <img src="../../img/aiko.png" alt="aiko" />
    <img src="https://aiko.digital/wp-content/uploads/2024/08/Group-65-1.png" alt="aiko2" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media only screen and (max-width: 499px) {
  .home {
    flex-direction: column;

    img {
      width: 90%;
    }
  }
}
</style>


<script setup lang="ts">

import Historico from '~/components/cards/Historico.vue';
import Mapa from '~/components/cards/Mapa.vue';
import Cabecalho from '~/components/header/Cabecalho.vue';


</script>

<template>
 <div class="flex flex-col w-full">
            <div class=" flex justify-center items-center fixed z-40 w-full">
                <Cabecalho />
            </div>
            <div class="flex flex-col overflow-hidden z-0 ">
                <div class="flex justify-center items-center ">
                    <Mapa />
                </div>
                <div  class="flex justify-center items-center">
                    <Historico/>
                </div>
            </div>
        
    </div>
</template>

<style lang="scss" scoped>

</style>
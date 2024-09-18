<script setup lang="ts">
import {useHistoricoStore} from '~/stores/stateHistoricoStore';

const useHist = useHistoricoStore();

</script>

<template>
    <div class="flex flex-col mt-10 p-2">
            <div class="flex bg-[#FF6105] items-center justify-center w-24 h-8">
                <p class="font-HankenGrotesk text-sm text-white">Histórico</p>
            </div>
            <div class="flex items-center justify-center overflow-x-auto overflow-y-auto">
                <table  class="w-96 font-HankenGrotesk text-xs text-center text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                           
                            <th scope="col" class="px-2 py-2">
                                Nome
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Estado
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Data
                            </th>
                            <th scope="col" class="px-2 py-2">
                               Latitude
                            </th>
                            <th scope="col" class="px-2 py-2">
                               Longitude
                            </th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(nome, index) in useHist.estadoNome" :key="index" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
                    
                           
                            <td class="">
                                {{ useHist.equipName }}
                            </td>
                            <td class="">
                                {{ nome}}
                            </td>
                            <td class="">
                                <!-- useHist.estadoData[index] acessa o elemento no mesmo índice de estadoData, garantindo que a data relacionada ao nome do estado seja exibida na mesma linha.-->
                           {{  useHist.estadoData[index] }}
                            </td>
                            <td class="">
                               {{ useHist.historicoLat[index] }}
                            </td>
                            <td class="">
                               {{ useHist.historicoLong[index] }}
                            </td>
                            
                        </tr>
             
                    </tbody>
                </table>
            </div>


    </div>
</template>

<style lang="scss" scoped>

</style>
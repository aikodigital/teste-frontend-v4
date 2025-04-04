<template>
  <div class="Filtro">
    <div class="Container">
      <div class="Campo">
        <label>Nome do equipamento</label>
        <input @input="onInputNomeEquipamento" autocomplete="off" type="text" />
      </div>
      <div class="Campo">
        <label>Modelo</label>
        <v-select
          v-model="modeloSelecionado"
          @update:modelValue="onInputModelo"
          @clear="onClearModelo"
          :options="modelos"
        ></v-select>
      </div>
      <div class="Campo">
        <label>Último status</label>
        <v-select
          v-model="statusSelecionado"
          @update:modelValue="onInputStatus"
          @clear="onClearStatus"
          :options="status"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Filtro {
  padding: 10px;
  padding-bottom: 20px;
  width: 100%;
  border: solid 2px rgba(var(--cinereous), 0.5);
  border-bottom: none;
  border-radius: 8px 8px 0px 0px;
  background-color: rgba(var(--off-white), 1);
}

.Container {
  display: flex;
  gap: 5px;
}

.Campo {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
}

label {
  font-size: 14px;
  font-family: 'Roboto Condensed';
  line-height: 20px;
  color: rgba(var(--van-dyke), 1);
}

input {
  padding-left: 5px;
  width: 100%;
  height: 35px;
  outline: none;
  background-color: transparent;
  border-radius: 4px;
  border: solid 1px rgba(var(--cinereous), 0.2);
  color: rgba(var(--van-dyke), 1);
}

.Campo > div {
  width: 100%;
  border-radius: 4px;
}

@media (max-width: 980px) {
  .Container {
    flex-direction: column;
  }
}
</style>

<script setup lang="ts">
import { useEquipamentoStore } from '@/stores/equipamento'
import { ref } from 'vue'

const equipamentoStore = useEquipamentoStore()

const modeloSelecionado = ref(null)
const modelos = ref(equipamentoStore.listarModelos())

const statusSelecionado = ref(null)
const status = ref(equipamentoStore.listarStatus())

const onInputNomeEquipamento = (event: Event) => {
  const nomeEquipamento = (event.target as HTMLInputElement).value
  equipamentoStore.filtrarPorNome(nomeEquipamento)
}

const onInputModelo = (modelo: any) => {
  equipamentoStore.filtrarPorModelo(modelo)
}

const onInputStatus = (status: any) => {
  equipamentoStore.filtrarPorUltimoStatus(status)
}

const onClearModelo = () => {
  equipamentoStore.filtrarPorModelo('')
}

const onClearStatus = () => {
  equipamentoStore.filtrarPorUltimoStatus('')
}
</script>

<template>
  <div data-value="{{ valor }}">
    {{ texto }}
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      lista: Array<[]>([]),
    };
  },
  props: {
    texto: {
      type: String,
      default: "",
    },
    valor: {
      type: String,
      default: "",
    },
  },
  methods: {
    async Lista() {
      try {
        const response = await fetch('/data/equipment.json');
        const dados = await response.json();
        dados.value = dados;
        console.log(dados.value);
        console.log("dados passados?")
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
  },
  mounted() {
    this.Lista();
  },
};
</script>

<style lang="scss">
li {
  width: 100%;
  background-color: #c0c0c0;
  color: #000;
}
</style>

<template>
  <nav>
    <div class="nav-item">
      <p class="text">Equipamentos:</p>

      <div class="lista">
        <div class="arrow"></div>
        <SelecionarEquipamento :items="listEquip" />
      </div>
    </div>

    <div class="nav-item">
      <p class="text">Modelos:</p>

      <div class="lista">
        <div class="arrow"></div>
        <SelecionarModelos :items="listModel" />
      </div>
    </div>

    <div class="nav-item">
      <p class="text">Estados:</p>

      <div class="lista">
        <div class="arrow"></div>
        <Selecionar />
      </div>
    </div>

    <div class="nav-item">
      <p class="text">Historico:</p>
    </div>
  </nav>
</template>

<script lang="ts">
interface Equipament {
 id: string 
 name: string
 equipmentModelId: string
}

interface Model {
 id: string
 name: string
 hourlyEarnings: {
  equipmentStateId: string
  value: number
 }[]
}

interface State {
 id: string
 name: string
 color: string
}

export default {
 data() {
  return {
   listEquip: [] as Equipament[],
   listModel: [] as Model[],
   listState: [] as State[],
  }
 },
  methods: {
    async listEquipaments() {
      try {
        const response = await fetch("/data/equipment.json");
        const dados = await response.json();
        this.listEquip = dados;
        console.log(this.listEquip);
        console.log("dados passados? 22");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },
    async listModels() {
      try {
        const response = await fetch("/data/equipmentModel.json");
        const dados = await response.json();
        this.listModel = dados;
        console.log(this.listModel);
        console.log("dados passados? 22");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },
    async listStates() {
      try {
        const response = await fetch("/data/equipmentState.json");
        const dados = await response.json();
        this.listState = dados;
        console.log(this.listState);
        console.log("dados passados? 22");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },

    eventLista() {
     document.querySelectorAll(".lista").forEach((item) => {
      item.addEventListener("click", () => {
       item.classList.toggle("active");
       
       let panel: HTMLElement | null = item.querySelector("ul");
       if (panel?.style.maxHeight) {
        panel.style.maxHeight = null;
       } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
       }
      })
     })
    }
  },
  mounted() {
    this.listEquipaments();
    this.listModels();
    this.listStates();
    this.eventLista();
  },
};
</script>

<style lang="scss">
nav {
  background-color: #bfbfbf;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;
  height: 100vh;
  z-index: 2;
  gap: 0.75rem;
  padding: 0 0.75rem;

  .nav-item {
   display: flex;
   flex-basis: 0;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: relative;
   width: 100%;
   height: 100%;
   gap: 0.75rem;

   .text {
    font-family: "Roboto", sans-serif;
    color: #000;
   }

   .lista {
    position: relative;
    background-color: #fff;
    width: 100%;
    min-height: 2.5rem;
    border-radius: 10px;
    z-index: 2;
    cursor: pointer;

    &.active {
     ul {
      li {
       &:hover,
       &:focus {
        background-color: #808080;
       }
      }
     }

     .arrow {
      transform: rotate(90deg);
     }
    }

    .arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 10px solid #404040;
      top: 1rem;
      right: 10px;
      transition: transform 0.6s linear;
    }

    ul {
     position: relative;
     width: 100%;
     top: 1.5rem;
     z-index: 2;
     list-style: none;
     padding-left: 0;
     background-color: #fff;
     max-height: 0;
     padding: 0;
     overflow: hidden;
     transition: max-height 0.6s linear;

     li {
      font-family: "Roboto", sans-serif;
      color: #000;
      padding: 0.5rem 1rem;
      cursor: pointer;
     }
    }
   }
  }
}
</style>

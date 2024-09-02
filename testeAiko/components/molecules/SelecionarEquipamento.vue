<template>
 <div>
  <ul>
   <li v-for="item in items" :key="item.id">
    <Item :texto="item.name" :valor="item.equipmentModelId" />
   </li>
  </ul>
 </div>
</template>

<script lang="ts">

interface Equipament {
 id: string 
 name: string
 equipmentModelId: string
}

export default {
 props: {
  items: {
   type: Array,
   default: []as Equipament[]
  }
 } 
}

</script>

<style lang="scss">
 ul {
  list-style: none;
  background-color: #808080;
 }
</style>
<template>
 <div>
  <ul>
   <li v-for="item in items" :key="item.id">
    <Item :texto="item.name" :valor="item.color" />
   </li>
  </ul>
 </div>
</template>

<script lang="ts">

interface State {
 id: string
 name: string
 color: string
}

export default {
 props: {
  items: {
   type: Array,
   default: []as State[]
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
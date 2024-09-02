emplate>
 <button>
  {{ text }} 
 </button>
</template>

<script lang="ts">
export default {
 props: {
  text: {
   type: String,
   default: ""
  }
 },
 
}
</script>
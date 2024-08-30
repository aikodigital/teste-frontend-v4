<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute} from "vue-router";
import IconMenu from '@/components/icon/Menu.vue'
import IconClose from '@/components/icon/Close.vue'
import IconLogout from '@/components/icon/Logout.vue'
const router = useRouter()
const showMenu = ref(false);
const mobileMenu = ref(false);
const showItemsMenu = computed(() => {
  return mobileMenu.value ? showMenu.value : true;
});

function handleResize() {
  if (window.innerWidth < 1024) {
    mobileMenu.value = true;
  } else {
    mobileMenu.value = false;
    showMenu.value = false;
  }
}

function handleNavigator(nameRoute: string) {
  router.push(`${nameRoute}`)
}

onMounted(() => {
  if (typeof window !== "undefined") {
    handleResize();
    window.addEventListener("resize", handleResize);
  }
});
onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<template>
  <div
    class="border-b rounded-b-[32px] border-[#D7D7DD] p-4 relative mb-6"
  >
    <div class="flex justify-between max-w-screen-2xl mx-auto px-3">
      <button class="max-w-[100px]" @click="handleNavigator('/')"><img src="/aiko.png" /></button>
      <ul
        class="flex bg-white items-center gap-3 z-[500]"
        :class="{
          'fixed z-50 left-0 py-10 shadow-lg top-0': showMenu,
          'w-full flex-col': mobileMenu,
        }"
      >
        <div v-if="showMenu" class="w-[30px] h-[30px] absolute top-5 right-5">
          <button @click="showMenu = false">
            <IconClose color="#6B7280" />
          </button>
        </div>
        <li v-if="showItemsMenu"><button @click="router.push('/home')">Home</button></li>
        <div
          class="flex gap-3"
          :class="{
            'flex-col': mobileMenu && showItemsMenu,
            'ml-auto': !showItemsMenu,
          }"
        >

          <button
            :variant="mobileMenu && !showItemsMenu ? 'outlined' : 'contained'"
            @click="handleNavigator('/login')"
            ><IconLogout /></button
          >
          <button
            v-if="mobileMenu && !showItemsMenu"
            size="none"
            @click="showMenu = true"
            class="px-1"
            ><IconMenu /></button>
        </div>
      </ul>
    </div>
  </div>
</template>

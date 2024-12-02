<template>
    <nav class="bg-blue-600 text-white shadow-md p-4 flex items-center justify-between fixed w-full">
        <div class="flex items-center space-x-2 gap-4">
            <a href="/">
                <img src="../../assets/aiko.png" alt="Icon" class="w-20" />
            </a>
            <span class="text-base lg:text-2xl font-semibold">Rastreamento de Máquinas</span>
        </div>

        <div class="relative flex gap-4 lg:mr-8">
            <button v-tooltip.bottom="'Menu'" @click="toggleMenu" @bluer="closeMenu()"
                class="gray-700 focus:outline-none">
                <img src="../../assets/icons/menu.svg" class="h-8 w-8" />
            </button>
        </div>

        <Drawer style="width: 20rem;" :visible="isMenuOpen" position="left" header="Menu" :dismissable="true"
            :showCloseIcon="true" @update:visible="isMenuOpen = $event">
            <template #header>
                <div class="flex items-center gap-2">
                    <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                    <span class="font-bold text-xl">Informações das máquinas</span>
                </div>
            </template>
            <template #container="{ closeCallback }">
                <div class="flex flex-col h-full">
                    <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                        <span class="inline-flex items-center gap-2">
                            <img src="../../assets/aiko.png" class="w-24 flex gap-10" />
                        </span>
                        <span>
                            <img src="../../assets/icons/x.svg" @click="closeCallback"
                                class="w-10 rounded-full hover:bg-gray-200 cursor-pointer" />
                        </span>
                    </div>
                    <div class="overflow-y-auto">
                        <ul class="list-none p-4 m-0">
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li v-for="option in options" :key="option.path" @click="setActiveOption(option.path)"
                                    class="mb-1 hover:bg-gray-100 hover:rounded-md">
                                    <a v-ripple
                                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                                        :href="option.path">
                                        {{ option.name }}
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </template>
        </Drawer>
    </nav>
</template>

<script>
import DrawerDefault from '../Drawer/DrawerDefault.vue';

export default {
    name: "NavbarComponent",
    components: {
        DrawerDefault
    },
    data() {
        return {
            isMenuOpen: false,
            activeOption: false,
            options: [
                { name: "Mapa", path: "/" },
                { name: "Máquinas", path: "/machines" }
            ]
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        setActiveOption(path) {
            this.activeOption = path;
            this.menuOpen = false;
        },
    },
};
</script>
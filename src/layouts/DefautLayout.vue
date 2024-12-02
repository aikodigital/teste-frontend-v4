<template>
    <div>
        <NavbarComponent />
        <div class="pt-16">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavbarComponent from '../components/Navbar/NavbarComponent.vue';


export default {
    components: {
        NavbarComponent,
    },
};
</script>
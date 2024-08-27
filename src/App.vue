<template>
  <div class="container-fluid">
    <AppNavbar />
    <div class="container-fluid p-0">
      <div class="row">
        <div class="col-md-12 p-0">
          <AppMap />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppNavbar from "./components/Navbar.vue";
import AppMap from "./components/VueMap.vue";
import AppFooter from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    AppNavbar,
    AppMap,
    AppFooter,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Public Sans", sans-serif;
}

p {
  font-family: "Public Sans", sans-serif;
  font-weight: 300;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul > li {
  font-family: "Public Sans", sans-serif;
  margin: 10px 0;
}

span {
  font-family: "Public Sans", sans-serif;
}
</style>

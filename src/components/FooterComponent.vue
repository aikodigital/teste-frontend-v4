<template>
  <v-footer class="pa-0 mb-n2">
    <v-row
      no-gutters
      class="footer w-100 ma-0 px-0 py-2 v-col-12"
      justify-sm="space-between"
      align="center"
    >
      <v-col
        class="d-flex justify-center justify-sm-start ml-md-4"
        cols="12"
        sm="5"
      >
        <v-btn
          v-for="icon in icons"
          :key="icon.link"
          rounded="sm"
          class="no-hover-underline social-media-bg"
          variant="text"
          :icon="icon.icon"
          :href="icon.link"
          target="_blank"
        >
        </v-btn>
      </v-col>

      <v-divider
        inset
        class="ml-9 d-flex d-sm-none d-none d-md-none"
      ></v-divider>

      <v-col cols="12" sm="3" lg="2">
        <div class="footer-title">
          <v-icon class="pr-2" icon="mdi-copyright" size="x-small" />
          <span
            >{{ new Date().getFullYear() }} - <strong>Bruna Dias</strong></span
          >
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
const icons = [
  { icon: "mdi-email", link: `mailto:brunadias_30@hotmail.com` },
  { icon: "mdi-github", link: "https://github.com/brunadias3" },
  { icon: "mdi-linkedin", link: "https://www.linkedin.com/in/brunadias3/" },
];
</script>

<style>
.footer {
  background-color: #4e4e4e;
  color: white;
  margin-top: 12px;
  position: static;
  bottom: 0;
}
.footer-title {
  display: flex;
  align-items: baseline;
  justify-content: center;
}
.social-media-bg:hover {
  text-decoration: none;
  background-color: hsl(199.9deg 100% 37% / 20%) !important;
}
</style>
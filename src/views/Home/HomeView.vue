<template>
  <div class="home container py-4">
    <h1 class="text-center mb-4">{{ $t("home.welcomeTitle") }}</h1>
    <p class="text-center mb-5">{{ $t("home.description") }}</p>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <h5 class="card-title">{{ $t("home.mapTitle") }}</h5>
            <p class="card-text">{{ $t("home.mapDescription") }}</p>
            <router-link to="/map" class="btn btn-primary">
              {{ $t("home.goToMap") }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <h5 class="card-title">{{ $t("home.reportTitle") }}</h5>
            <p class="card-text">{{ $t("home.reportDescription") }}</p>
            <router-link to="/report" class="btn btn-primary">
              {{ $t("home.goToReport") }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <h5 class="card-title">{{ $t("home.chartTitle") }}</h5>
            <p class="card-text">{{ $t("home.chartDescription") }}</p>
            <router-link to="/chart" class="btn btn-primary">
              {{ $t("home.goToChart") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home {
  max-width: 1200px;
  margin: auto;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.95rem;
  color: #555;
}
</style>

<template>
  <div>
    <h1>Titulo</h1>

    <div class="fixed top-0 left-0 w-screen h-screen">
      <VMap :zoom="16" :center="{ lat: -22.1290931, lng: -51.3980106 }">
        <VMapGoogleTileLayer />
        <VMapMarker :latlng="{ lat: -22.1290931, lng: -51.3980106 }">
          <VMapPinIcon placeholder-color="#000" background-color="#000000">
            <PhosphorIconMapPinSimple class="text-rose-100" weight="thin" />
          </VMapPinIcon>
        </VMapMarker>
        <VMapZoomControl />
      </VMap>
    </div>
  </div>
</template>

<template>
  <svg class="circle-svg" height="200" width="200">
    <circle cx="100" cy="100" r="50"></circle>
  </svg>
</template>

<style>
  :root {
  --radius: 50;
  --PI: 3.14159265358979;
  --circumference: calc(var(--PI) * var(--radius) * 2px)
}

.circle-svg circle {
  stroke: red;
  stroke-width: 4;
  fill: transparent;
  transform-origin: center;
  stroke-dasharray: var(--circumference);
  animation: spinner 2s ease-out infinite;
}

@keyframes spinner {
  from {
    stroke-dashoffset: var(--circumference);
    stroke: red;
    transform: rotateZ(0deg)
  }
  to {
    stroke-dashoffset: calc(var(--circumference) * -1);
    stroke: green;
    transform: rotateZ(720deg)
  }
}
</style>
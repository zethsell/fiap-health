<script setup lang="ts">
import ContainerFluid from '~/components/layout-components/container-fluid.vue'
import HeaderBar from '~/components/bars/header-bar.vue'
</script>
<template>
  <header-bar />
  <container-fluid class=" tw-flex-col tw-justify-center tw-relative tw-overflow-auto tw-p-3">
    <main>
      <slot />
    </main>
    <footer>

    </footer>
  </container-fluid>
</template>

<script setup lang="ts">

type Props = {
  hidden: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['toggle-bar'])
</script>

<template>
  <nav class=" top-bar">
    <div class="tw-inline-flex tw-items-center tw-h-full">
      <v-icon :icon="props.hidden ? 'mdi:mdi-chevron-up' : 'mdi:mdi-chevron-down'"
              class="tw-mr-3 tw-ml-1 tw-cursor-pointer"
              @click="emit('toggle-bar')"/>
      <span class="tw-text-[14.5px]">REJSE - DEV</span>
    </div>
    <div class="h-full tw-items-center tw-inline-flex">
      <span class="tw-mr-10">Cambio(16/10)</span>
      <div class="h-full tw-items-center tw-inline-flex">
        <span>Turismo: CAD 4,00 • USD 5,00</span>
        <svg-icon-calculator class="!tw-w-6 !tw-h-6 mx-2" filled fill="white"/>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.top-bar {
  @import "src/assets/scss/default-colors.scss";

  background-color: $defaultPurple;
  color: white;
  font-weight: bold;
  font-size: 12px;
  width: 100%;
  height: 32px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

</style>
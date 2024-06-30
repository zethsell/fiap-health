<script setup lang="ts">

type Props = {
  label: string

}

const props = defineProps<Props>()
</script>

<template>
  <v-list-item class="!tw-bg-[#951b81] !tw-text-white !tw-w-full ">
    <v-list-item-title>
          <span
              class="tw-w-full tw-inline-flex tw-justify-center tw-uppercase tw-text-[15px]  tw-font-bold !tw-select-none">
            {{ $t(`menu.${label.slice(0, -1)}.title`) }}
          </span>
    </v-list-item-title>
  </v-list-item>
</template>

<style scoped lang="scss">

</style>
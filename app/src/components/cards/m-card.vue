<script setup lang="ts">

interface Props {
  title: string
  logo?: string
  bottomActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  logo: "/images/logo.webp",
  bottomActions: false
})

</script>

<template>
  <v-card>
    <v-card-title class="bg-component">
      <div class="tw-justify-between tw-inline-flex tw-w-full tw-items-center tw-uppercase tw-text-[16px]">
        {{ props.title }}
        <div class="tw-inline-flex tw-items-center tw-gap-4">
          <slot name="topActions"/>
        </div>
      </div>
    </v-card-title>

    <v-card-item>
      <slot name="content"/>
    </v-card-item>

    <slot/>

    <v-card-actions v-if="bottomActions" class="tw-inline-flex tw-justify-center">
      <slot name="bottomActions"/>
    </v-card-actions>

  </v-card>
</template>

<style scoped lang="scss">
@import "src/assets/scss/default-colors.scss";

.bg-component {
  background-color: $defaultPurple;
  color: white;
  font-weight: bold;
}

</style>
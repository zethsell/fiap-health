<script setup lang="ts">

interface Props {
  title: string
  logo?: string
}

const props = withDefaults(defineProps<Props>(), {
  logo: '/images/logo.jpg',
})

</script>

<template>
  <v-card width="350">
    <v-card-title class="bg-component">
      {{ props.title }}
    </v-card-title>

    <v-no-ssr>
      <div class="tw-px-10 ">
        <v-img :src="props.logo" />
      </div>
    </v-no-ssr>

    <v-card-item>
      <slot name="content" />
    </v-card-item>

    <slot />
    <v-card-actions class="tw-inline-flex tw-justify-center tw-w-full tw-mb-3">
      <slot name="actions" />
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
<script setup lang="ts">

type Props = {
  label: string
  next?: boolean
  previous?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  next: false,
  previous: false
})

</script>

<template>
  <div>
    <v-divider class="border-opacity-100"></v-divider>
    <v-list-item class="hover:tw-bg-[#c9c9c9]">
      <v-list-item-title>
        <v-icon icon="mdi:mdi-menu-left" v-if="props.previous"/>
        {{ props.label }}
        <v-icon icon="mdi:mdi-menu-right" v-if="props.next"/>
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<style scoped lang="scss">

</style>
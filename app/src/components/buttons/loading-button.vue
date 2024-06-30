<script setup lang="ts">
interface Props {
  loading?: boolean
  label: string
  type?: 'submit' | 'button'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  type: 'button'
})

</script>

<template>
  <v-btn
      variant="elevated"
      class="bg-component"
      :loading="props.loading ? 'white' : props.loading"
      :type="props.type"
  >
    <template #loader>
      <v-progress-circular size="20" :indeterminate="true"></v-progress-circular>
    </template>
    {{ props.label }}
  </v-btn>
</template>

<style scoped lang="scss">
@import "src/assets/scss/default-colors.scss";

.bg-component {
  background-color: $defaultPurple;
  color: white;
  font-weight: bold;
}
</style>
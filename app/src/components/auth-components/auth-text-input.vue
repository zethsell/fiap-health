<script setup lang="ts">

type ValidationRule = ((value: any) => boolean | string)

interface Props {
  rules?: readonly ValidationRule[] | undefined
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  rules: undefined
})

</script>
<template>
  <v-text-field
      class="tw-mb-3"
      color="#951b81"
      variant="underlined"
      :label="props.label"
      :rules="rules as any"
      hide-details="auto"
  >
  </v-text-field>
</template>

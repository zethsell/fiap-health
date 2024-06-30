<script setup lang="ts">

type ValidationRule = ((value: any) => boolean | string)

interface Props {
  rules?: readonly ValidationRule[] | undefined
  label: string
  readonly?: boolean
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  rules: undefined,
  readonly: false,
  type: "text"
})

</script>
<template>
  <v-text-field
      class="tw-mb-3"
      color="#951b81"
      variant="underlined"
      :label="props.label"
      :rules="props.rules as any"
      hide-details="auto"
      :readonly="props.readonly"
      :type="props.type"
  >
  </v-text-field>
</template>

<script setup lang="ts">

type ValidationRule = ((value: any) => boolean | string)

interface Props {
  rules?: readonly ValidationRule[] | undefined
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  rules: undefined
})

const showPass = ref(false)

function showPassword(): void {
  showPass.value = !showPass.value
}

function getType(): string {
  return showPass.value ? 'text' : 'password'
}

function getIcon(): string {
  return showPass.value ? 'mdi:mdi-eye-off-outline' : 'mdi:mdi-eye-outline'
}

</script>
<template>
  <v-text-field
      class="tw-mb-3"
      color="#951b81"
      variant="underlined"
      :label="props.label"
      :rules="rules as any"
      hide-details="auto"
      :type="getType()"
      :append-inner-icon="getIcon()"
      :on-click:append-inner="showPassword"
  >
  </v-text-field>
</template>

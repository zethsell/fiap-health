<script lang="ts" setup>
type Props = {
  icon: string
  label: string
}

const props = defineProps<Props>()
</script>

<template>
  <th class="text-left tw-cursor-pointer">
    <span>
      {{ props.label }}
      <v-icon size="16" class="tw-pb-1" :icon="props.icon ?? ''"/>
    </span>
  </th>
</template>

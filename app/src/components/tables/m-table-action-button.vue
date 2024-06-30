<script setup lang="ts">
type Props = {
  icon: string
}

const props = defineProps<Props>()
</script>

<template>
  <v-icon size="24" class="tw-cursor-pointer tw-text-[#b9b9b9] hover:tw-text-[#535455]" :icon="props.icon"/>
</template>

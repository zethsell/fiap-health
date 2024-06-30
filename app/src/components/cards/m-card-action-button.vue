<script setup lang="ts">
type Props = {
  icon: string
  tip?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <v-icon size="22" class="tw-cursor-pointer tw-text-white" :icon="props.icon"/>
    <v-tooltip activator="parent" v-if="tip" location="bottom">{{ tip }}</v-tooltip>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  selected: boolean
}

const props = withDefaults(defineProps<Props>(), {selected: false})
</script>


<template>
  <div
      class="tw-border-y-4 !tw-border-transparent tw-h-full tw-flex tw-flex-col tw-justify-center"
      :class="{'!tw-border-b-[#951b81]': props.selected}"
  >
    <slot/>
  </div>
</template>
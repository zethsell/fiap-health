<script setup lang="ts">

import SubBar from '~/components/bars/sub-bar.vue'

const hideSubBar = ref<boolean>(false)

function toggleHideSubBar() {
  hideSubBar.value = !hideSubBar.value
}

</script>
<template>
  <sub-bar :hide="hideSubBar" />
</template>


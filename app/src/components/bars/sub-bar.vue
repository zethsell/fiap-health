<script setup lang="ts">

import { greetings, logout } from '~/helpers'
import LoadingButton from '~/components/buttons/loading-button.vue'

type Props = {
  hide: boolean
}

const fill = ref<string[]>([])
const props = defineProps<Props>()

onMounted(() => {
  setFill()
})

function setFill(menu?: string) {
  const route = useRoute()
  const param = `${route.path.split('/').at(1)}/`
  fill.value = [param]
  if (menu) fill.value.push(menu)
}


</script>

<template>
  <Transition>
    <nav class=" sub-bar" v-show="!props.hide">
      <div class="tw-inline-flex tw-items-center tw-h-full">


      </div>
      <div class="tw-gap-2 tw-inline-flex tw-items-center tw-h-full tw-text-[#666677]">
        <v-no-ssr>
          <strong class="tw-text-[13px]">{{ greetings() }}</strong>
        </v-no-ssr>
        <div
          class="tw-inline-flex tw-flex-nowrap tw-overflow-hidden tw-items-center tw-justify-center tw-h-[54px] tw-w-[102px] tw-relative ">
          <svg-super-mask class=" !tw-w-24 !tw-h-24 mx-2 tw-absolute tw-z-0" filled />
          <img src="~/assets/images/icon_foto_perfil_vazio.png" style="height: 50px;width: 50px;padding-bottom: 1px;"
               alt="">
        </div>
        <loading-button label="logout" @click="logout()" />
      </div>
    </nav>
  </Transition>
</template>

<style scoped lang="scss">


.sub-bar {
  background-color: white;
  width: 100%;
  height: 54px;
  box-shadow: 2px 1px 1px 1px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  justify-content: space-between;
  padding: 0 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
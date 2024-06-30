<script setup lang="ts">

import MenuIconWrapper from "~/components/bars/menu-icon-wrapper.vue";
import MenuListItem from "~/components/bars/menu-list-item.vue";
import MenuListItemTitle from "~/components/bars/menu-list-item-title.vue";
import en from '~/locales/en.json'
import {entriesToObject} from "~/helpers/entries-to-object.ts";
import {useI18n} from "vue-i18n";
import {menuContent} from "~/helpers";

type Props = {
  fill: string[]
  context: string
}

type MenuItem = {
  title: string
  previous?: boolean
  next?: boolean
}

type MenuJson = keyof typeof en.menu

const props = withDefaults(defineProps<Props>(), {fill: [] as any})
const emit = defineEmits(['selected'])
const menuList = ref({})
const i18n = useI18n()

onMounted(() => {
  setMenuMainList()
})


function setMenuMainList() {
  const menu = menuContent(i18n).menu[props.context.slice(0, -1) as MenuJson]
  menuList.value = entriesToObject(Object.entries(menu).filter(([k, v]) => k !== 'title'))
  menuList.value = Object.values(menuList.value).map((item: any) => {
    if (typeof item !== 'string') {
      item['next'] = true
    }
    return item
  })
}

function setMenuSubList(menuItem: string) {
  const menu = menuContent(i18n).menu[props.context.slice(0, -1) as MenuJson]
  const filteredSubMenu = Object.values(menu).find((item: any) => item.title === menuItem)!
  const filteredItem = entriesToObject(Object.entries(filteredSubMenu).filter(([k, v]) => !['title', 'next'].includes(k)))
  menuList.value = Object.assign({}, {back: {title: i18n.t('back'), previous: menuItem}}, filteredItem)
}

async function redirect(menuItem: string | MenuItem, parentItem?: string) {
  console.table(useRouter().options.routes)

  if (typeof menuItem === 'string') {
    let menu = menuContent(i18n).menu[props.context.slice(0, -1) as MenuJson]
    if (parentItem) {
      const key = Object.entries(menu).find(([k, v]) => v.title === parentItem)!.at(0)
      menu = menu[key as keyof typeof menu]
    }
    const path = Object.entries(menu).find(([k, v]) => v === menuItem)!.at(0)
    console.log(path)
    await navigateTo({name: `${props.context.slice(0, -1)}-${path.toLowerCase()}`})
    return
  }

  if (menuItem.previous) {
    setMenuMainList()
    return
  }

  setMenuSubList(menuItem.title)
}

function onOver() {
  setMenuMainList()
  emit('selected', props.context)
}

</script>

<template>
  <v-menu
      open-on-hover
      transition="scale-transition"
      close-delay="0"
      open-delay="0"
      :close-on-content-click="false"
      :fill="fill.includes(context)"
      @mouseleave="emit('selected')"
      @mouseover="emit('selected', props.context)"
      class="tw-cursor-pointer"
  >
    <template v-slot:activator="{ props }">
      <menu-icon-wrapper
          :selected="fill.includes(context)"
          v-bind="props"
          @mouseover="onOver()"
          class="tw-cursor-pointer"
      >
        <slot/>
      </menu-icon-wrapper>
    </template>

    <v-list class="!tw-py-0">
      <menu-list-item-title :label="context"/>
      <menu-list-item
          v-for="(item, index) in menuList" :key="index"
          :label="item?.title ?? item"
          :previous="!!item.previous"
          :next="!!item.next"
          @click="redirect(item, menuList['back']?.previous ?? null)"
      />
    </v-list>
  </v-menu>
</template>

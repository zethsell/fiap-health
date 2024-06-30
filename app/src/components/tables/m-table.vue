<script setup lang="ts">
import MTableActionButton from "~/components/tables/m-table-action-button.vue";
import MTableActionHeader from "~/components/tables/m-table-action-header.vue";
import MTableColumnHeader from "~/components/tables/m-table-column-header.vue";
import type {TableColumn} from "~/helpers";

type Sortable = {
  [key: string]: string
}

type Props = {
  edit?: (item: number | string) => void
  show?: (item: number | string) => void
  destroy?: (item: number | string) => void
  clone?: (item: number | string) => void
  editPermissions?: (item: number | string) => void
  check?: (item: number | string, mark: boolean) => void
  columns: TableColumn[]
  rows: any[]
  actions?: boolean
  tableStyle?: any
}

const sortable = ref<Sortable>({})
const page = ref(1)
const perPage = ref(5)
const itemsPerPage = ref([5, 10, 25, 50, 100])
const props = withDefaults(defineProps<Props>(), {
  actions: true
})
const tempRows = ref<any[]>([])
const {rows, actions} = toRefs(props)

function setOrder(column: string) {
  if (!Object.keys(sortable.value).includes(column)) {
    sortable.value = {}
  }

  if (!sortable.value[column]) {
    sortable.value[column] = 'ASC'
    return
  }

  if (sortable.value[column] === 'ASC') {
    sortable.value[column] = 'DESC'
    return
  }
  sortable.value[column] = ''
}

function sortTable(column: string) {
  setOrder(column)
  paginate()
  tempRows.value = tempRows.value.sort((a: any, b: any) => {
        const index = column as any;
        if (typeof a[index] === 'string' && typeof b[index] === 'string') {
          return sortable.value[column] === 'ASC'
              ? a[index]!.toString().localeCompare(b[index]!.toString())
              : b[index]!.toString().localeCompare(a[index]!.toString());
        }
        if (typeof a[index] === 'number' && typeof b[index] === 'number') {
          return sortable.value[column] === 'ASC'
              ? Number(a[index]!) - Number(b[index]!)
              : Number(b[index]!) - Number(a[index]!);
        }
        return 0;
      }
  );
}

function paginate() {
  if (page.value || perPage.value) {
    let index = page.value
    if (page.value === 2) index = perPage.value + 1
    if (page.value > 2) index = ((page.value - 1) * perPage.value) + 1
    let size = page.value === 1 ? perPage.value : (perPage.value * (page.value));
    tempRows.value = rows.value.slice(index - 1, size)
  }
}

function getOrderIcon(order: string) {
  if (order === 'ASC') return 'mdi:mdi-arrow-up'
  if (order === 'DESC') return 'mdi:mdi-arrow-down'
  return ''
}

function getPageSizeOptions() {
  const objLength = Object.values(rows.value).length;
  let localSize = itemsPerPage.value.filter(size => size < objLength);
  if (localSize.at(-1) !== objLength) localSize.push(objLength);
  return localSize;
}


const getLength = computed(() => {
  const objLength = Object.values(rows.value).length
  const pages = Math.round(Object.values(rows.value).length / perPage.value)
  return (objLength % perPage.value) === 0 ? pages : pages + 1
})

watch(
    () => rows.value,
    () => {
      tempRows.value = rows.value

      if (Object.keys(sortable.value).length === 0) {
        sortable.value['id'] = ''
        sortTable('id')
      }

    }
)

onMounted(() => {
  sortTable('id')
})

</script>
<template>
  <div class="table-wrapper">
    <v-table fixed-header class="table" :style="props.tableStyle">
      <thead>
      <tr>
        <m-table-column-header
            v-for="(column, index) in props.columns" :key="index"
            :icon="getOrderIcon(sortable[column.value])"
            :label="column.label"
            @click="sortTable(column.value)"
        />
        <m-table-action-header v-if="actions"/>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in tempRows" :key="row.id">
        <td v-for="(column, index) in props.columns" :key="index">{{ row[column.field] }}</td>
        <td v-if="actions">
          <div class="tw-inline-flex tw-gap-3.5 tw-items-center">
            <m-table-action-button v-if="props.editPermissions" @click="props.editPermissions(row)" icon="mdi:mdi-key"/>
            <m-table-action-button v-if="props.clone" @click="props.clone(row)" icon="mdi:mdi-note-multiple-outline"/>
            <m-table-action-button v-if="props.show" @click="props.show(row)" icon="mdi:mdi-eye"/>
            <m-table-action-button v-if="props.edit" @click="props.edit(row)" icon="mdi:mdi-pencil"/>
            <m-table-action-button v-if="props.destroy" @click="props.destroy(row)" icon="mdi:mdi-delete"/>
            <m-table-action-button v-if="props.check" @click="props.check(row, !row.checked)"
                                   :icon="row.checked ? 'mdi:mdi-checkbox-outline': 'mdi:mdi-checkbox-blank-outline'"/>
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-divider class="border-opacity-100"></v-divider>
    <div class="tw-justify-center tw-items-center tw-inline-flex tw-w-full tw-mt-2">
      <v-pagination
          @update:model-value="(v) =>{ page = v ;  paginate()}"
          :model-value="page"
          :length="getLength"
          rounded="circle"
      ></v-pagination>
      <div class="tw-inline-flex tw-items-center">
        <span class=" tw-mr-2.5">Items por página:</span>
        <v-combobox
            variant="outlined"
            @update:model-value="(v) =>{ perPage = v ; page = 1; paginate()}"
            :model-value="perPage"
            hide-details
            density="comfortable"
            :items="getPageSizeOptions()"
        ></v-combobox>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-wrapper {
  overflow: hidden !important;
}

.table {
  max-height: calc(100vh - 250px);
  overflow: scroll;
}
</style>

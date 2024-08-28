<script setup lang="ts">
interface TableHeader<T> {
  key: keyof T
  label: string
  applyColor?: boolean
}

interface TableProps<T> {
  title: string
  headers: TableHeader<T>[]
  rows: T[]
}

const props = defineProps<TableProps<any>>()
const emit = defineEmits(['click'])

function onClickRow(rowKey: string): void {
  emit('click', rowKey)
}

function cellStyle(color?: string): string {
  const colorStyle = color ? `color: ${color}` : ''

  return `font-weight: bold; ${colorStyle}`
}
</script>

<template>
  <div id="table-container">
    <div class="table-title">{{ props.title }}</div>
    <table>
      <thead>
        <tr>
          <th v-for="header in props.headers" :key="header.key">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in props.rows"
          :key="row.key"
          @click="onClickRow(row.key)"
        >
          <td
            v-for="header in props.headers"
            :key="header.key"
            :style="header.applyColor ? cellStyle(row.color) : ''"
          >
            {{ row[header.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#table-container {  
  background-color: var(--container-color);

  .table-title {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 4px;

    tr {
      border-top: 1px solid var(--border-color);
    }

    thead {
      color: var(--primary-color);
    }

    tbody tr {
      font-size: 14px;
      cursor: pointer;
      height: 36px;

      &:hover {
        background-color: var(--border-color);
      }
    }

    td, th {
      padding: 8px 16px;
      text-wrap: nowrap;
      text-align: start;
      min-width: 80px;
    }
  }
}
</style>

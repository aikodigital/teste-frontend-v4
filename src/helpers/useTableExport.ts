import { exportFile, useQuasar, type QTableColumn } from 'quasar'
const $q = useQuasar()

export const exportTable = <T>(columns: QTableColumn[], rows: T[]) => {
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : (row as Record<string, any>)[col.field === void 0 ? col.name : col.field],
              col.format,
              row as string
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  const status = exportFile('table-export.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: 'Não foi possivel fazer o download do arquivo...',
      color: 'negative',
      icon: 'warning'
    })
  }
}

const wrapCsvValue = (
  val: string,
  formatFn?: (val: string, row: string | undefined) => void,
  row?: string
) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

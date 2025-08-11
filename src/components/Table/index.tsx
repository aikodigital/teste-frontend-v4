import type React from "react";
import { Table, TableBody, Caption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./Table";

interface DataTableColumn<T> {
  header: string,
  accessorKey: keyof T,
  cell?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[],
  columns: DataTableColumn<T>[],
  caption?: string,
  footer?: React.ReactNode,
  className?: string
}

function DataTable<T>({ data, columns, caption, footer, className }: DataTableProps<T>) {
  return (
    <Table className={className}>
      {caption && <Caption>{caption}</Caption>}
      <TableHeader>
        <TableRow isHeader>
          {columns.map((column) => (
            <TableHead key={column.header as string}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-8">
              <span className="text-gray-500">Nenhum dado encontrado</span>
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column.accessorKey as string}`}>
                  {column.cell ? column.cell(row) : (row[column.accessorKey] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
      {footer && <TableFooter>{footer}</TableFooter>}
    </Table>
  )
}

export { DataTable };
export type { DataTableColumn, DataTableProps };
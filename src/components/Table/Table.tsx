import { ReactNode } from "react";
import clsx from "clsx";

interface TableComponentsProps {
    children: ReactNode,
    className?: string
}

interface TableRowProps extends TableComponentsProps {
    isHeader?: boolean
}

interface TableCellProps extends TableComponentsProps {
    colSpan?: number
}

function Table({ children, className }: TableComponentsProps) {
    return (
        <div
            className={clsx(`
                w-full overflow-hidden
                border border-zinc-600 rounded-2xl
            `, className)}
        >
            <div className="w-full overflow-x-auto">
                <table className="w-full caption-bottom text-sm">
                    {children}
                </table>
            </div>
        </div>
    );
}

function Caption({ children, className }: TableComponentsProps) {
    return (
        <caption
            className={clsx(
                "mt-4 mb-2 px-4 text-sm text-gray-500",
                className
            )}
        >
            {children}
        </caption>
    );
}

export function TableHeader({ children, className }: TableComponentsProps) {
    return (
        <thead className={className}>
            {children}
        </thead>
    );
}

export function TableBody({ children, className }: TableComponentsProps) {
    return (
        <tbody className={className}>
            {children}
        </tbody>
    );
}

export function TableFooter({ children, className }: TableComponentsProps) {
    return (
        <tfoot
            className={clsx("border-t font-medium", className)}
        >
            {children}
        </tfoot>
    );
}

export function TableRow({ children, className, isHeader = false }: TableRowProps) {
    return (
        <tr className={clsx(
            !isHeader ? "border-b border-zinc-600 hover:bg-zinc-500/20 transition duration-200" : "",
            className
        )}>
            {children}
        </tr>
    )
}

export function TableHead({ children, className }: TableComponentsProps) {
    return (
        <th
            className={clsx(
                `
                align-middle
                h-12 px-4
                border-b-2 border-zinc-600
                bg-zinc-300 dark:bg-zinc-800
                text-left font-medium text-zinc-800 dark:text-zinc-300
                `,
                className
            )}
        >
            {children}
        </th>
    )
}

export function TableCell({ children, className, colSpan }: TableCellProps) {
    return (
        <td className={clsx("p-4 align-middle", className)} colSpan={colSpan}>
            {children}
        </td>
    )
}

export { Table, Caption };
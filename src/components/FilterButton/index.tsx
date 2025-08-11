import { ReactNode } from "react";
import clsx from "clsx";

interface FilterButtonProps {
    onClick: () => void,
    isSelected: boolean,
    children: ReactNode
}

function FilterButton(props: FilterButtonProps) {
    return (
        <button
            className={clsx(
                `
                p-2
                text-zinc-200 text-xs md:text-sm
                border rounded-full
                hover:opacity-50
                transition duration-200
                `,
                props.isSelected ? "bg-blue-800/50 border-blue-800" : "bg-transparent border-zinc-300 dark:border-zinc-700"
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export { FilterButton };
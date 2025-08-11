import clsx from "clsx";

interface TagProps {
    children?: React.ReactNode;
    className?: string;
    color?: string;
}

function Tag({ children, className, color="#" }: TagProps) {
    return (
        <span
            className={clsx(
                "px-2 py-1 rounded-full text-xs text-zinc-800/70 bg-slate-500",
                className
            )}
            style={{
                backgroundColor: color
            }}
        >
            {children}
        </span>
    );
}

export { Tag };
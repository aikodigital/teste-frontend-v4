import { ReactNode } from "react";
import { NavLink } from "react-router";
import clsx from "clsx";

interface NavItemProps {
    to: string;
    children?: ReactNode;
}

export default function NavItem(props: NavItemProps) {
    return (
        <NavLink
            to={props.to}
            className={({ isActive }) => clsx(`
                flex flex-col items-center justify-center gap-1
                text-xs
                p-2
                rounded-lg
                transition duration-200
            `,
                isActive ? "bg-blue-900 hover:bg-blue-700" : "hover:bg-zinc-200 dark:hover:bg-zinc-900",
            )}
        >
            {props.children}
        </NavLink>
    );
}
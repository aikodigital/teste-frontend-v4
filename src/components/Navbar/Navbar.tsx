import { ReactNode } from "react";

export default function Navbar({ children }: { children?: ReactNode }) {
    return (
        <nav className="
            flex justify-between md:justify-start md:flex-col md:items-stretch gap-2
            p-4
        ">
            {children}
        </nav>
    );
}
import { ReactNode } from "react";

interface HeadingProps {
    children: ReactNode;
}

function H1(props: HeadingProps) {
    return <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{props.children}</h1>;
}

function H2(props: HeadingProps) {
    return <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{props.children}</h2>;
}

function H3(props: HeadingProps) {
    return <h3 className="text-base md:text-lg lg:text-xl font-bold">{props.children}</h3>;
}

export { H1, H2, H3 };
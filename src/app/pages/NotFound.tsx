import { H1, H2 } from "@/components/Heading";

export default function NotFoundPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-4">
            <H1>404</H1>
            <H2>Página não encontrada</H2>
        </div>
    );
}
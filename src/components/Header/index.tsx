function Header() {
    return (
        <header className="p-3 flex items-stretch gap-2">
            <img src="/aiko.png" alt="Logo da aiko" className="h-8 md:h-10 lg:h-12" />
            <div className="border-r border-r-zinc-800" />
            <h1 className="md:text-lg font-bold flex items-center">Rastreador de equipamentos</h1>
        </header>
    );
}

export { Header };
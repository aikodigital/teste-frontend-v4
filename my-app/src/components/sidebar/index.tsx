import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import {
  Home,
  LineChart,
  LogOutIcon,
  Package,
  PanelBottom,
  Settings2,
} from "lucide-react";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@radix-ui/react-tooltip";

export function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col ">
        <nav className="flex flex-col items-center gap-6 px-2 py-5">
          <TooltipProvider>
            {/* Ícone do Dashboard Avatar */}
            <Link
              href="#"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-800 text-white rounded-full border border-white"
            >
              <Package className="h-4 w-4 stroke-current" />
              <span className="sr-only">Dashboard Avatar</span>
            </Link>

            {/* Ícone com texto hover para Inicio */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white">
                <span className="p-2">Inicio</span>
              </TooltipContent>
            </Tooltip>

            {/* Ícone com texto hover para Histórico */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/history"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white">
                <span className="p-2">Histórico</span>
              </TooltipContent>
            </Tooltip>

            {/* Ícone com texto hover para Configurações */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Settings2 className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white">
                <span className="p-2">Configurações</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        {/* Navegação inferior com ícone de logout */}
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span className="sr-only">Sair</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white">
                <span className="p-2">Sair</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Menu inferior para dispositivos móveis */}
      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 ">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir / Fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-x bg-white">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex h-10 w-10 bg-gray-800 rounded-full text-lg items-center justify-center border border-white md:text-base gap-2"
                >
                  <Package className="w-5 h-5 text-white stroke-current" />
                  <span className="sr-only"> Logo do projeto </span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:bg-gray-700 hover:text-white"
                >
                  <Home className="w-5 h-5 transition-all" />
                  Inicio
                </Link>

                <Link
                  href="/history"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:bg-gray-700 hover:text-white"
                >
                  <LineChart className="w-5 h-5 transition-all" />
                  Histórico
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:bg-gray-700 hover:text-white"
                >
                  <Settings2 className="w-5 h-5 transition-all" />
                  Configurações
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2>Menu</h2>
        </header>
      </div>
    </div>
  );
}

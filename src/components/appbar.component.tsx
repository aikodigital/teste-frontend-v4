import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import { Input } from "./ui/input";
import { LogOutIcon } from "lucide-react";

export function AppBarComponent() {
  const [searchIsOpened, setSearchIsOpened] = useState<boolean>(false);
  return (
    <div className="w-full">
      <Menubar className="rounded-none">
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Sair{" "}
              <MenubarShortcut>
                <LogOutIcon size={14} />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Filtrar</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Nenhum</MenubarCheckboxItem>
            <MenubarLabel className="text-xs">Estado</MenubarLabel>
            <MenubarCheckboxItem>Operando</MenubarCheckboxItem>
            <MenubarCheckboxItem>Parado</MenubarCheckboxItem>
            <MenubarCheckboxItem>Manutenção</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel className="text-xs">Modelo</MenubarLabel>
            <MenubarCheckboxItem>Caminhão de carga</MenubarCheckboxItem>
            <MenubarCheckboxItem>Harvester</MenubarCheckboxItem>
            <MenubarCheckboxItem>Garra traçadora</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => setSearchIsOpened(true)}>
            Pesquisar
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      <Dialog
        open={searchIsOpened}
        onOpenChange={() => setSearchIsOpened(!searchIsOpened)}
      >
        <DialogContent className="w-1/2 max-w-1/2">
          <DialogHeader>
            <DialogTitle>Pesquise</DialogTitle>
          </DialogHeader>
          <Input placeholder="Digite aqui" />
          {/* <span className="my-10 flex items-center justify-center text-sm text-neutral-500">
            Nenhum resultado
          </span> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

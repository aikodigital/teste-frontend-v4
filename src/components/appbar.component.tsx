import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { Input } from "./ui/input";
import { LogOutIcon } from "lucide-react";
import { MenubarGroup } from "@radix-ui/react-menubar";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";

export function AppBarComponent() {
  const [searchIsOpened, setSearchIsOpened] = useState<boolean>(false);
  const { selectedState, setSelectedState, selectedModel, setSelectedModel } =
    useEquipmentMapStore();

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
            <MenubarCheckboxItem
              checked={selectedModel == undefined && selectedState == undefined}
              onCheckedChange={() => {
                setSelectedState(undefined);
                setSelectedModel(undefined);
              }}
            >
              Nenhum
            </MenubarCheckboxItem>
            <MenubarLabel className="text-xs">Estado</MenubarLabel>
            <MenubarGroup>
              <MenubarCheckboxItem
                checked={selectedState == "Operando"}
                onCheckedChange={() => {
                  setSelectedState("Operando");
                }}
              >
                Operando
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={selectedState == "Parado"}
                onCheckedChange={() => {
                  setSelectedState("Parado");
                }}
              >
                Parado
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={selectedState == "Manutenção"}
                onCheckedChange={() => {
                  setSelectedState("Manutenção");
                }}
              >
                Manutenção
              </MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarLabel className="text-xs">Modelo</MenubarLabel>
            <MenubarGroup>
              <MenubarCheckboxItem
                checked={selectedModel == "Caminhão de carga"}
                onCheckedChange={() => {
                  setSelectedModel("Caminhão de carga");
                }}
              >
                Caminhão de carga
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={selectedModel == "Harvester"}
                onCheckedChange={() => {
                  setSelectedModel("Harvester");
                }}
              >
                Harvester
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={selectedModel == "Garra traçadora"}
                onCheckedChange={() => {
                  setSelectedModel("Garra traçadora");
                }}
              >
                Garra traçadora
              </MenubarCheckboxItem>
            </MenubarGroup>
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

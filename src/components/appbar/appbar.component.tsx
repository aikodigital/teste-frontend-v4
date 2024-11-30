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
} from "../ui/menubar";
import { LogOutIcon } from "lucide-react";
import { MenubarGroup } from "@radix-ui/react-menubar";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";
import { useEquipmentStore } from "@/stores/equipment.store";

export function AppBarComponent() {
  const { setSearching } = useEquipmentStore();
  const { selectedState, setSelectedState, selectedModel, setSelectedModel } =
    useEquipmentMapStore();

  return (
    <div className="w-full">
      <Menubar className={`rounded-none h-7`}>
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
          <MenubarTrigger onClick={() => setSearching(true)}>
            Pesquisar
          </MenubarTrigger>
        </MenubarMenu>
        {/* <MenubarMenu> IMPLEMENTAR DEPOIS
          <MenubarTrigger>Tema</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarCheckboxItem
                checked={!isDarkTheme}
                onCheckedChange={() => {
                  toggleTheme(false);
                }}
              >
                Claro
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={isDarkTheme}
                onCheckedChange={() => {
                  toggleTheme(true);
                }}
              >
                Escuro
              </MenubarCheckboxItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu> */}
      </Menubar>
    </div>
  );
}

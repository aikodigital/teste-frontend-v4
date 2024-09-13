"use client";
import ResponsiveAppBar from "@/components/topbar";
import ListEquipamentos from "@/components/views/listEquipamentos";
import { MainContainer } from "@/styles/equipamento";

export default function Equipamentos() {
  return (
    <MainContainer>
      <ResponsiveAppBar />
      <ListEquipamentos />
    </MainContainer>
  );
}

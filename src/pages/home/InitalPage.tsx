import React, { useEffect, useState } from "react";
import "./App.css";
import { IEquipment } from "../../models/Equipment";
import EquipmentTable from "../../components/equipments/EquipmentsTable";
import { Container, StyledTitle } from "./InitialPage";
import ResponsiveImageLogo from "../../components/ResponsiveImageLogo/ResponsiveImageLogo";

const InitialPage = () => {
  const [equipments, setEquipments] = useState<IEquipment[]>([]);

  useEffect(() => {
    getEquipments();
  }, []);

  const getEquipments = async () => {
    try {
      const resp = await fetch("data/equipment.json");
      const data: IEquipment[] = await resp.json();
      setEquipments(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="App">
      <div>
        <ResponsiveImageLogo />
        <StyledTitle variant="h2">Meus Equipamentos</StyledTitle>

        <EquipmentTable equipments={equipments} />
      </div>
    </Container>
  );
};

export default InitialPage;

import React, { useEffect, useState } from "react";
import "./App.css";
import { IEquipment } from "../../models/Equipment";
import EquipmentTable from "../../components/equipments/EquipmentsTable";
import { EquipmentStateContextProvider } from "../../context/EquipmentStateContext";
import { Container, StyledTitle } from "./InitialPage";
import ResponsiveImageLogo from "../../components/ResponsiveImageLogo/ResponsiveImageLogo";
import { Typography, useTheme } from "@mui/material";

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
  const theme = useTheme();

  return (
    <EquipmentStateContextProvider>
      <Container className="App">
        <div>
          <ResponsiveImageLogo />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: theme.spacing(2),
            }}
          >
            Meus Equipamentos
          </Typography>

          <EquipmentTable equipments={equipments} />
        </div>
      </Container>
    </EquipmentStateContextProvider>
  );
};

export default InitialPage;

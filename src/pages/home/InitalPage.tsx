import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { IEquipment } from "../../models/Equipment";
import EquipmentTable from "../../components/equipments/EquipmentsTable";
import { EquipmentStateContextProvider } from "../../context/EquipmentStateContext";
import { Container } from "./InitialPage";
import ResponsiveImageLogo from "../../components/ResponsiveImageLogo/ResponsiveImageLogo";
import { Typography, useTheme, Button } from "@mui/material";
import "./App.css";


const InitialPage = () => {
  const [equipments, setEquipments] = useState<IEquipment[]>([]);
  const theme = useTheme();
  const navigate = useNavigate();


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


  const goToAllEquipments = () => {
    navigate('/map')
  }

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
          <div style={{padding: 20}}>
            <Button onClick={goToAllEquipments} variant="contained">Verificar todos os equipamentos</Button>
          </div>

        </div>
      </Container>
    </EquipmentStateContextProvider>
  );
};

export default InitialPage;

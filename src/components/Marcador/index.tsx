import { Marker, Popup } from "react-leaflet";

import { Icon, LatLngTuple } from "leaflet";
import { EquipmentData } from "../../types";

import { ReadMore } from "@mui/icons-material";
import { Box, Chip, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { ModelTypesMapping } from "../../constants";
import { addStateInfoToEquipmentData } from "../../utils";
import ListaDeEstados from "../ListaDeEstados";

export type MarcadorProps = {
  equipment: EquipmentData;
};

function Marcador({ equipment }: MarcadorProps) {
  const [openStateList, setOpenStateList] = useState(false);

  const handleStateList = (newOpen: boolean) => () => {
    setOpenStateList(newOpen);
  };

  const position: LatLngTuple = [
    equipment.positions[0].lat,
    equipment.positions[0].lon,
  ];

  const completeStateList = addStateInfoToEquipmentData(equipment);

  console.log(equipment.equipmentName);
  const iconUrl = useMemo(() => {
    switch (equipment.name) {
      case ModelTypesMapping.COLHEITADEIRA:
        return "src/assets/img/colheitadeira.png";

      case ModelTypesMapping.GARRA:
        return "src/assets/img/garra-tracadora.png";

      default:
        return "src/assets/img/caminhao.png";
    }
  }, [equipment]);

  const customIcon = new Icon({
    iconUrl,
    iconSize: [35, 35],
  });
  return (
    <>
      <Marker position={position} icon={customIcon}>
        <Popup>
          <Stack spacing={0} gap={0}>
            <p>Nome: {equipment.equipmentName}</p>
            <p>Posicao mais recente: {position}</p>
            <p>Tipo: {equipment.name}</p>
            <Box>
              <Chip
                variant="filled"
                onClick={handleStateList(true)}
                label={completeStateList[completeStateList.length - 1]?.name}
                style={{
                  backgroundColor:
                    completeStateList[completeStateList.length - 1]?.color,
                }}
                icon={<ReadMore color="inherit" />}
                title="Clique para ver o historico de status"
              />
            </Box>
          </Stack>
        </Popup>
      </Marker>
      <ListaDeEstados
        open={openStateList}
        stateList={completeStateList}
        handleStateList={handleStateList}
      />
    </>
  );
}

export default Marcador;

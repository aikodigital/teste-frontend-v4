import React, { useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { EquipmentState } from "../types/sharedTypes";

const LegendContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(2),
  zIndex: 1000,
  maxWidth: "300px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}));

const LegendHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  cursor: "pointer",
}));

const ColorIcon = styled("span")<{ color: string }>(({ color }) => ({
  display: "inline-block",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: color,
  marginRight: "10px",
}));

const EquipmentIcon = styled("img")({
  width: "24px",
  height: "24px",
  marginRight: "10px",
});

interface MapLegendProps {
  equipmentStates: EquipmentState[];
  equipmentTypes: Array<{
    name: string;
    icon: string;
  }>;
}

const MapLegend: React.FC<MapLegendProps> = ({
  equipmentStates,
  equipmentTypes,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <LegendContainer sx={{ borderRadius: 5 }}>
      <LegendHeader onClick={toggleExpanded}>
        <Typography variant="subtitle1">Legenda</Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </LegendHeader>
      <Collapse in={expanded}>
        <List dense>
          <ListItem>
            <Typography variant="subtitle2">
              Estados dos Equipamentos
            </Typography>
          </ListItem>
          {equipmentStates.map((state) => (
            <ListItem key={state.id}>
              <ListItemIcon>
                <ColorIcon color={state.color} />
              </ListItemIcon>
              <ListItemText primary={state.name} />
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <Typography variant="subtitle2">Tipos de Equipamentos</Typography>
          </ListItem>
          {equipmentTypes.map((type) => (
            <ListItem key={type.name}>
              <ListItemIcon>
                <EquipmentIcon src={type.icon} alt={type.name} />
              </ListItemIcon>
              <ListItemText primary={type.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </LegendContainer>
  );
};

export default MapLegend;

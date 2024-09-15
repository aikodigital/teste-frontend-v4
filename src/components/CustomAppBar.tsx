import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";

import geoEquipLogo from "../assets/geoEquipLogo.png";

// eslint-disable-next-line no-empty-pattern
const StyledAppBar = styled(AppBar)(({}) => ({
  backgroundColor: "#49754b",
}));

const LogoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
});

const Logo = styled("img")({
  height: "50px",
  marginRight: "10px",
});

interface CustomAppBarProps {
  userName: string;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ userName }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 0 }}>
          {userName}
        </Typography>
        <LogoContainer>
          <Logo src={geoEquipLogo} alt="GeoEquip Logo" />
          <Typography variant="h6" component="div">
            GeoEquip
          </Typography>
        </LogoContainer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default CustomAppBar;

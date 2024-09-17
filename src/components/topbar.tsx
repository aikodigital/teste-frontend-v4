import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter, usePathname } from "next/navigation";
import { montserrat } from "@/app/fonts/fonts";
import { useEffect } from "react";
import Image from "next/image";

const pages = ["Principal", "Equipamentos"] as const;

type Page = (typeof pages)[number];

const routeMap: Record<Page, string> = {
  Principal: "/",
  Equipamentos: "/equipamentos",
};

export default function ResponsiveAppBar() {
  const router = useRouter();
  const pathname = usePathname();

  const initialPage =
    (Object.keys(routeMap).find(
      (key) => routeMap[key as Page] === pathname
    ) as Page) || "Principal";

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [selectedPage, setSelectedPage] = React.useState<Page>(initialPage);

  useEffect(() => {
    const currentPage = Object.keys(routeMap).find(
      (key) => routeMap[key as Page] === pathname
    ) as Page;

    if (currentPage) {
      setSelectedPage(currentPage);
    }
  }, [pathname]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handlePageChange = (page: Page) => {
    setSelectedPage(page);
    router.push(routeMap[page]);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Image
              src="/img/aiko.png"
              alt="Logo da Empresa"
              width={70}
              height={40}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
              disableScrollLock
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageChange(page)}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: montserrat.style.fontFamily,
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Image
              src="/img/aiko.png"
              alt="Logo da Empresa"
              width={60}
              height={30}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{
                  my: 2,
                  mx: 1,
                  color: selectedPage === page ? "white" : "#1D4692",
                  backgroundColor:
                    selectedPage === page ? "#1D4692" : "transparent",
                  display: "block",
                  fontFamily: montserrat.style.fontFamily,
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#11D524",
                    color: "#1D4692",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

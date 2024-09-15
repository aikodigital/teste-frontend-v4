import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

const APP_BAR_HEIGHT = 64;
const DRAWER_WIDTH = 240;
const DRAWER_MINI_WIDTH = 56;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open: boolean;
}>(({ theme, open }) => ({
  width: open ? DRAWER_WIDTH : DRAWER_MINI_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...theme.mixins.openedMixin(theme),
    "& .MuiDrawer-paper": theme.mixins.openedMixin(theme),
  }),
  ...(!open && {
    ...theme.mixins.closedMixin(theme),
    "& .MuiDrawer-paper": theme.mixins.closedMixin(theme),
  }),
  "& .MuiDrawer-paper": {
    width: open ? DRAWER_WIDTH : DRAWER_MINI_WIDTH,
    height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
    top: `${APP_BAR_HEIGHT}px`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface SideMenuProps {
  equipmentTypes: string[];
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: { [key: string]: boolean }) => void;
  initialFilters: { [key: string]: boolean };
}

const SideMenu: React.FC<SideMenuProps> = ({
  equipmentTypes,
  onSearch,
  onFilterChange,
  initialFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({
    active: true,
    inactive: true,
    ...equipmentTypes.reduce((acc, type) => ({ ...acc, [type]: true }), {}),
  });

  useEffect(() => {
    if (initialFilters && Object.keys(initialFilters).length > 0) {
      setFilters((prevFilters) => ({ ...prevFilters, ...initialFilters }));
    }
  }, [initialFilters]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.checked,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem>
          <Tooltip title="Pesquisar" placement="right" arrow>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
          </Tooltip>
          {open && (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Pesquisar equipamento"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          )}
        </ListItem>
        <ListItem>
          <Tooltip title="Filtros" placement="right" arrow>
            <ListItemIcon>
              <FilterListIcon />
            </ListItemIcon>
          </Tooltip>
          {open && <ListItemText primary="Filtros" />}
        </ListItem>
        {open && (
          <ListItem>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.active ?? true}
                    onChange={handleFilterChange}
                    name="active"
                  />
                }
                label="Ativos"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.inactive ?? true}
                    onChange={handleFilterChange}
                    name="inactive"
                  />
                }
                label="Inativos"
              />
              {equipmentTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={filters[type] ?? true}
                      onChange={handleFilterChange}
                      name={type}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
          </ListItem>
        )}
      </List>
    </StyledDrawer>
  );
};

export default SideMenu;

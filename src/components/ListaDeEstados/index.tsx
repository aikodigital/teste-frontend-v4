import { Drawer, List, ListItem, ListItemText } from "@mui/material";

export type ListaDeEstadosProps = {
  open: boolean;
  stateList: Array<{
    id?: string;
    name?: string;
    color?: string;
    date: string;
    equipmentStateId: string;
  }>;
  handleStateList: (newOpen: boolean) => () => void;
};

const ListaDeEstados = ({
  open,
  stateList,
  handleStateList,
}: ListaDeEstadosProps) => {
  return (
    <>
      <Drawer open={open} onClose={handleStateList(false)}>
        {stateList
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((state) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "#121212", mr: 16 }}
            >
              <ListItem>
                <ListItemText
                  primary={state?.name}
                  secondary={new Date(state?.date).toLocaleString()}
                  color="white"
                />
              </ListItem>
            </List>
          ))}
      </Drawer>
    </>
  );
};

export default ListaDeEstados;

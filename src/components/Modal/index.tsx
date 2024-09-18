import Button from "@mui/material/Button";
// import { Dropdown } from "../Dropdown";
import { Filter } from "../../types/index";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  setFilters: (value: Filter) => void;
};

export const Modal = ({ onClose, isOpen, setFilters }: Props) => {
  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();

    const formData = new FormData(event.currentTarget);
    const equipamento = formData.get("equipamento") as string;

    setFilters({
      name: equipamento,
    } as Filter);
  };

  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            minWidth={400}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="equipamento"
              label="Nome ou Modelo"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="info" variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="info" type="submit" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

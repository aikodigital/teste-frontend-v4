import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Modal } from "../../../components/Modal";
import { Filter } from "../../../types/index";
import { Box, Fab } from "@mui/material";

type Props = {
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  names: string[];
};

export const Filters = ({ setFilters }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        border="none"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1000}
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <Fab
          onClick={() => {
            setIsOpen(true);
            setFilters({ name: undefined });
          }}
          color="primary"
          aria-label="add"
        >
          <SearchIcon />
        </Fab>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setFilters={setFilters}
      />
    </>
  );
};

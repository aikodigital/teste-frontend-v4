import { Autocomplete, TextField } from "@mui/material";

interface SearchMachineProps {
  option: { id: string; name: string }[];
  onSelect?: (value: string) => void;
}

export const SearchMachine = ({ option, onSelect }: SearchMachineProps) => {
  const handleChange = (event: any, value: any) => {
    if (value && onSelect) {
      onSelect(value.id);
    } else if (onSelect) {
      onSelect("");
    }
  };

  console.log("Options in SearchMachine:", option);

  return (
    <Autocomplete
      disablePortal
      options={option}
      getOptionLabel={(option) => option.name}
      sx={{ width: 600, margin: "20px 0 0 0" }}
      renderInput={(params) => <TextField {...params} label="Máquinas que deseja buscar" />}
      onChange={handleChange} 
    />
  );
};

export default SearchMachine;
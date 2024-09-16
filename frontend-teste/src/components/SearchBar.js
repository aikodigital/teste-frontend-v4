import React from 'react';
import { TextField } from '@mui/material';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Pesquisar Equipamento"
      onChange={(e) => onSearch(e.target.value)}
      className="search-bar"
      fullWidth
    />
  );
};

export default SearchBar;
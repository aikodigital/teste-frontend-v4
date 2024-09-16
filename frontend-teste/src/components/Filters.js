// Filters.js
import React from "react";
import { Select, MenuItem, TextField } from "@mui/material";

const Filters = ({ states, models, filterValues, onFilterChange }) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <Select
          value={filterValues.state}
          onChange={(e) => onFilterChange("state", e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="">Todos os Estados</MenuItem>
          {states.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={filterValues.model}
          onChange={(e) => onFilterChange("model", e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="">Todos os Modelos</MenuItem>
          {models.map((model) => (
            <MenuItem key={model.id} value={model.id}>
              {model.name}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Filtros de data */}
      <div className="date-filters">
        <TextField
          value={filterValues.startDate}
          label="Data Inicial"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => onFilterChange("startDate", e.target.value)}
          fullWidth
        />
        <TextField
          value={filterValues.endDate}
          label="Data Final"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => onFilterChange("endDate", e.target.value)}
          fullWidth
        />
      </div>
    </div>
  );
};

export default Filters;

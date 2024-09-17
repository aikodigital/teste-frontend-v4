import { createSlice } from "@reduxjs/toolkit";
import { LatLngExpression } from "leaflet";

const initialState = "";

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeSearch: (_state, { payload }) => payload,
        resetSearch: () => initialState,
    }
  });

  export const { changeSearch, resetSearch } = searchSlice.actions;
  
  export default searchSlice.reducer;
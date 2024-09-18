import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/search';
import fleetSlice from './reducers/fleet';
import mapEquipmentsSlice from './reducers/mapEquipments';
import detailedEquipmentSlice from './reducers/detailedEquipment';
import { useDispatch } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit'
import detailedEquipment from './reducers/detailedEquipment';

const store = configureStore({
    reducer: {
        search: searchSlice,
        fleet: fleetSlice,
        mapEquipments: mapEquipmentsSlice,
        detailedEquipment: detailedEquipmentSlice,

    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>

export default store;
import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/search';
import fleetSlice from './reducers/fleet';
import { useDispatch } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        search: searchSlice,
        fleet: fleetSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>

export default store;
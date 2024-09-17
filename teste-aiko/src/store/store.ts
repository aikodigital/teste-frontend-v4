import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/search';
import trucksSlice from './reducers/trucks';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        search: searchSlice,
        trucks: trucksSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
import { configureStore } from "@reduxjs/toolkit";
import equipmentsReducer from './reducers/equipments'

const store = configureStore({
    reducer: {
        equipments: equipmentsReducer
    }
})


export default store
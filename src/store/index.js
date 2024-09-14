import { configureStore } from "@reduxjs/toolkit";
import testReducer from './reducers/test'
import equipmentsReducer from './reducers/equipments'

const store = configureStore({
    reducer: {
        test: testReducer,
        equipments: equipmentsReducer,
    }
})


export default store
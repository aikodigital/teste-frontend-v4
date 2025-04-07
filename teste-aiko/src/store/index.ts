import { configureStore } from '@reduxjs/toolkit'
import stateLegendReducer from './stateLegendSlice'
import equipmentListReducer from './equipmentListSlice'
import equipmentModelReducer from './equipmentModelSlice'

export const store = configureStore({
  reducer: {
    stateLegend: stateLegendReducer,
    equipmentList: equipmentListReducer,
    equipmentModel: equipmentModelReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

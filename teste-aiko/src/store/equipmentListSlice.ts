import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EquipmentInfo } from '@/types/equipment'

type EquipmentListState = {
  data: Record<string, EquipmentInfo>
  loading: boolean
  error: string | null
}

const initialState: EquipmentListState = {
  data: {},
  loading: false,
  error: null
}

export const fetchEquipmentList = createAsyncThunk(
  'equipmentList/fetchEquipmentList',
  async () => {
    const response = await fetch('/data/equipment.json')
    return (await response.json()) as EquipmentInfo[]
  }
)

const equipmentListSlice = createSlice({
  name: 'equipmentList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEquipmentList.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEquipmentList.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.reduce((acc, eq) => {
          acc[eq.id] = eq
          return acc
        }, {} as Record<string, EquipmentInfo>)
      })
      .addCase(fetchEquipmentList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao carregar dados'
      })
  }
})

export default equipmentListSlice.reducer

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { EquipmentModel } from '@/types/equipment'

type EquipmentModelState = {
  data: Record<string, EquipmentModel>
  loading: boolean
  error: string | null
}

const initialState: EquipmentModelState = {
  data: {},
  loading: false,
  error: null
}

export const fetchEquipmentModel = createAsyncThunk<
  Record<string, EquipmentModel>,
  void,
  { rejectValue: string }
>('equipmentModel/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('/data/equipmentModel.json')

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)

    const json: EquipmentModel[] = await res.json()

    const modelMap = json.reduce((acc, model) => {
      acc[model.id] = model
      return acc
    }, {} as Record<string, EquipmentModel>)

    return modelMap
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Erro desconhecido')
  }
})

const equipmentModelSlice = createSlice({
  name: 'equipmentModel',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEquipmentModel.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchEquipmentModel.fulfilled,
        (state, action: PayloadAction<Record<string, EquipmentModel>>) => {
          state.loading = false
          state.data = action.payload
        }
      )
      .addCase(fetchEquipmentModel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Erro ao carregar modelos'
      })
  }
})

export default equipmentModelSlice.reducer

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { StateDefinition, StateLegend } from '@/types/equipment'

type State = {
  data: StateLegend
  loading: boolean
  error: string | null
}

const initialState: State = {
  data: {},
  loading: false,
  error: null
}

export const fetchStateLegend = createAsyncThunk<
  StateLegend,
  void,
  { rejectValue: string }
>('stateLegend/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('/data/equipmentState.json')

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`)
    }

    const json: StateDefinition[] = await res.json()

    const legend = json.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {} as StateLegend)

    return legend
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Erro desconhecido')
  }
})

const stateLegendSlice = createSlice({
  name: 'stateLegend',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStateLegend.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchStateLegend.fulfilled,
        (state, action: PayloadAction<StateLegend>) => {
          state.data = action.payload
          state.loading = false
        }
      )
      .addCase(fetchStateLegend.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Erro ao carregar legenda de estados'
      })
  }
})

export default stateLegendSlice.reducer

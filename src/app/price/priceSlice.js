import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as actions from './actions'

const namespace = 'price'

export const getCoinPrice = createAsyncThunk(`${namespace}/getCoinPrice`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${objData.coin}/metrics`)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const DEFAULT = { status: null, data: null, error: null }

const priceSlice = createSlice({
  name: 'price',
  initialState: {
    price: { ...DEFAULT, data: 0 },
  },
  reducers: {

  },
  extraReducers: {
    [getCoinPrice.pending]: actions.getCoinPricePending,
    [getCoinPrice.fulfilled]: actions.getCoinPriceFulfilled,
    [getCoinPrice.rejected]: actions.getCoinPriceRejected,
  }
})


export default priceSlice.reducer

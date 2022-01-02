import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../constants/httpStatus';
import axios from './axios'

const namespace = 'algorand'

export const createAlgorandWallet = createAsyncThunk(`${namespace}/createAlgorandWallet`, async (objData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/algorand/v1/wallet/', objData)
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  })

const algorandSlice = createSlice({
  name: 'algorand',
  initialState: {
    status: null,
    id: null,
    address: null,
    phrase: null,
    algoStatus: null,
    user: null,
    error: null,
  },
//   reducers: {
    
//   },
  extraReducers: { 
    [createAlgorandWallet.pending](state) {
      state.status = HTTP_STATUS.PENDING
    },
    [createAlgorandWallet.fulfilled](state, { payload }) {
      state.status = HTTP_STATUS.FULFILLED
      state.id = payload.id
      state.address = payload.address
      state.phrase = payload.phrase
      state.algoStatus = payload.status
      state.user = payload.user
      state.error = null
    },
    [createAlgorandWallet.rejected](state, { payload }) {
      state.status =  HTTP_STATUS.REJECTED
      state.error = payload
    }
  }
})

// export const {  } = algorandSlice.actions

export default algorandSlice.reducer

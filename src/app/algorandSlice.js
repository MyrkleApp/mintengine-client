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

export const confirmAlgorandPassphrase = createAsyncThunk(`${namespace}/confirmAlgorandPassphrase`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/confirm_passphrase/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const algorandSlice = createSlice({
  name: 'algorand',
  initialState: {
    createStatus: null,
    id: null,
    address: null,
    phrase: null,
    algoStatus: null,
    user: null,
    error: null,
    confirmStatus: null,
    confirmData: null,
    confirmError: null,
  },
//   reducers: {
    
//   },
  extraReducers: { 
    /**
     * create algo wallet
     */
    [createAlgorandWallet.pending](state) {
      state.createStatus = HTTP_STATUS.PENDING
    },
    [createAlgorandWallet.fulfilled](state, { payload }) {
      state.createStatus = HTTP_STATUS.FULFILLED
      state.id = payload.id
      state.address = payload.address
      state.phrase = payload.phrase
      state.algoStatus = payload.status
      state.user = payload.user
      state.error = null
    },
    [createAlgorandWallet.rejected](state, { payload }) {
      state.createStatus =  HTTP_STATUS.REJECTED
      state.error = payload
    },
    /**
     * confirm algo passphrase
     */
    [confirmAlgorandPassphrase.pending](state) {
      state.confirmStatus = HTTP_STATUS.PENDING
    },
    [confirmAlgorandPassphrase.fulfilled](state, { payload }) {
      state.confirmStatus = HTTP_STATUS.FULFILLED
      state.confirmData = payload
    },
    [confirmAlgorandPassphrase.rejected](state, { payload }) {
      state.confirmStatus =  HTTP_STATUS.REJECTED
      state.confirmError = payload
    }
  }
})

// export const {  } = algorandSlice.actions

export default algorandSlice.reducer

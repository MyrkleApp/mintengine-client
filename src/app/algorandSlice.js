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
    const { data } = await axios.put(`/algorand/v1/wallet/${objData.id}/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const algorandSlice = createSlice({
  name: 'algorand',
  initialState: {
    createWallet: { status: null, error: null },
    id: null,
    address: null,
    passphrase: "",
    // walletStatus: null,
    user: null,
    confirmWallet: { status: null, success: null, error: "" },
  },
  reducers: {
    incorrectPassphraseError(state, action) {
      if (action.payload.status === 'create') {
        state.confirmWallet.error = action.payload.error
      } else if (action.payload.status === 'import') {
        state.confirmWallet.error = action.payload.error
      }
    }
  },
  extraReducers: { 
    /**
     * create algo wallet
     */
    [createAlgorandWallet.pending](state) {
      state.createWallet.status = HTTP_STATUS.PENDING
    },
    [createAlgorandWallet.fulfilled](state, { payload }) {
      state.createWallet.status = HTTP_STATUS.FULFILLED
      state.id = payload.id
      state.address = payload.address
      state.passphrase = payload.passphrase
      // state.walletStatus = payload.status
      state.user = payload.user
      state.createWallet.error = null
      localStorage.setItem('algophrase', JSON.stringify(payload.passphrase))
    },
    [createAlgorandWallet.rejected](state, { payload }) {
      state.createWallet.status =  HTTP_STATUS.REJECTED
      state.createWallet.error = payload
    },
    /**
     * confirm algo passphrase
     */
    [confirmAlgorandPassphrase.pending](state) {
      state.confirmWallet.status = HTTP_STATUS.PENDING
    },
    [confirmAlgorandPassphrase.fulfilled](state, { payload }) {
      state.confirmWallet.status = HTTP_STATUS.FULFILLED
      state.confirmWallet.success = payload
    },
    [confirmAlgorandPassphrase.rejected](state, { payload }) {
      state.confirmWallet.status =  HTTP_STATUS.REJECTED
      state.confirmWallet.error = payload.error
    }
  }
})

export const { incorrectPassphraseError } = algorandSlice.actions

export default algorandSlice.reducer

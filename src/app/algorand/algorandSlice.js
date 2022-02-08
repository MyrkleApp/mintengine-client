import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CREATE, IMPORT } from '../../constants/walletStatus';
import axios from '../axios'
import { 
  createAlgorandWalletPending,
  createAlgorandWalletFulfilled,
  createAlgorandWalletRejected,
  getActiveAlgorandWalletFulfilled, 
  getActiveAlgorandWalletPending, 
  getActiveAlgorandWalletRejected, 
  confirmAlgorandPassphraseRejected,
  confirmAlgorandPassphraseFulfilled,
  confirmAlgorandPassphrasePending
} from './actions';

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

export const getActiveAlgorandWallet = createAsyncThunk(`${namespace}/getActiveAlgorandWallet`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/algorand/v1/active_wallet/`, objData)
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
    activeWallet: { value: null, status: null }
  },
  reducers: {
    incorrectPassphraseError(state, action) {
      if (action.payload.status === CREATE) {
        state.confirmWallet.error = action.payload.error
      } else if (action.payload.status === IMPORT) {
        state.confirmWallet.error = action.payload.error
      }
    }
  },
  extraReducers: { 
    [createAlgorandWallet.pending]: createAlgorandWalletPending,
    [createAlgorandWallet.fulfilled]: createAlgorandWalletFulfilled,
    [createAlgorandWallet.rejected]: createAlgorandWalletRejected,
    
    [confirmAlgorandPassphrase.pending]: confirmAlgorandPassphrasePending,
    [confirmAlgorandPassphrase.fulfilled]: confirmAlgorandPassphraseFulfilled,
    [confirmAlgorandPassphrase.rejected]: confirmAlgorandPassphraseRejected,
    
    [getActiveAlgorandWallet.pending]: getActiveAlgorandWalletPending,
    [getActiveAlgorandWallet.fulfilled]: getActiveAlgorandWalletFulfilled,
    [getActiveAlgorandWallet.rejected]: getActiveAlgorandWalletRejected,
  }
})

export const { incorrectPassphraseError } = algorandSlice.actions

export default algorandSlice.reducer

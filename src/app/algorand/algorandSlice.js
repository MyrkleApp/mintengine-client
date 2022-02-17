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
  confirmAlgorandPassphrasePending,
  createAlgorandClawbackPending,
  createAlgorandClawbackRejected,
  createAlgorandClawbackFulfilled,
  createAlgorandCommonNftPending,
  createAlgorandCommonNftFulfilled,
  createAlgorandCommonNftRejected,
  createAlgorandTokenPending,
  createAlgorandTokenFulfilled,
  createAlgorandTokenRejected,
  createCustomAlgorandTokenPending,
  createCustomAlgorandTokenFulfilled,
  createCustomAlgorandTokenRejected,
  destroyAlgorandPending,
  destroyAlgorandFulfilled,
  destroyAlgorandRejected,
  createAlgorandFractionalNftPending,
  createAlgorandFractionalNftFulfilled,
  createAlgorandFractionalNftRejected,
  freezeAlgorandPending,
  freezeAlgorandFulfilled,
  freezeAlgorandRejected,
  modifyAlgorandPending,
  modifyAlgorandFulfilled,
  modifyAlgorandRejected,
  algorandOptInPending,
  algorandOptInFulfilled,
  algorandOptInRejected,
  algorandOptOutPending,
  algorandOptOutFulfilled,
  algorandOptOutRejected,
  getAlgorandSendListPending,
  getAlgorandSendListFulfilled,
  getAlgorandSendListRejected,
  sendAlgorandPending,
  sendAlgorandFulfilled,
  sendAlgorandRejected,
  swapAlgorandPending,
  swapAlgorandFulfilled,
  swapAlgorandRejected,
  unfreezeAlgorandPending,
  unfreezeAlgorandFulfilled,
  unfreezeAlgorandRejected,
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
    const { data } = await axios.get(`/algorand/v1/active_wallet/`)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandClawback = createAsyncThunk(`${namespace}/createAlgorandClawback`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/clawback/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandCommonNft = createAsyncThunk(`${namespace}/createAlgorandCommonNft`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/common_nft/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandToken = createAsyncThunk(`${namespace}/createAlgorandToken`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/create_asset/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createCustomAlgorandToken = createAsyncThunk(`${namespace}/createCustomAlgorandToken`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/custom_asset/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const destroyAlgorand = createAsyncThunk(`${namespace}/destroyAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/destroy/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandFractionalNft = createAsyncThunk(`${namespace}/createAlgorandFractionalNft`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/fractional_nft/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const freezeAlgorand = createAsyncThunk(`${namespace}/freezeAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/freeze/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const modifyAlgorand = createAsyncThunk(`${namespace}/modifyAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/modify/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const algorandOptIn = createAsyncThunk(`${namespace}/algorandOptIn`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/optin/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const algorandOptOut = createAsyncThunk(`${namespace}/algorandOptOut`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/optout/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAlgorandSendList = createAsyncThunk(`${namespace}/getAlgorandSendList`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/algorand/v1/send/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const sendAlgorand = createAsyncThunk(`${namespace}/sendAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/send/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const swapAlgorand = createAsyncThunk(`${namespace}/swapAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/swap/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const unfreezeAlgorand = createAsyncThunk(`${namespace}/unfreezeAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/unfreeze/', objData)
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
    user: null,
    confirmWallet: { status: null, success: null, error: "" },
    activeWallet: { status: null, data: null, error: null },
    clawback: { status: null, data: null, error: null },
    commonNft: { status: null, data: null, error: null },
    token: { status: null, data: null, error: null },
    customToken: { status: null, data: null, error: null },
    destroy: { status: null, data: null, error: null },
    fractionalNft: { status: null, data: null, error: null },
    freeze: { status: null, data: null, error: null },
    modify: { status: null, data: null, error: null },
    optIn: { status: null, data: null, error: null },
    optOut: { status: null, data: null, error: null },
    sendList: { status: null, data: null, error: null },
    send: { status: null, data: null, error: null },
    swap: { status: null, data: null, error: null },
    unfreeze: { status: null, data: null, error: null },

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

    [createAlgorandClawback.pending]: createAlgorandClawbackPending,
    [createAlgorandClawback.fulfilled]: createAlgorandClawbackFulfilled,
    [createAlgorandClawback.rejected]: createAlgorandClawbackRejected,

    [createAlgorandCommonNft.pending]: createAlgorandCommonNftPending,
    [createAlgorandCommonNft.fulfilled]: createAlgorandCommonNftFulfilled,
    [createAlgorandCommonNft.rejected]: createAlgorandCommonNftRejected,

    [createAlgorandToken.pending]: createAlgorandTokenPending,
    [createAlgorandToken.fulfilled]: createAlgorandTokenFulfilled,
    [createAlgorandToken.rejected]: createAlgorandTokenRejected,

    [createCustomAlgorandToken.pending]: createCustomAlgorandTokenPending,
    [createCustomAlgorandToken.fulfilled]: createCustomAlgorandTokenFulfilled,
    [createCustomAlgorandToken.rejected]: createCustomAlgorandTokenRejected,

    [destroyAlgorand.pending]: destroyAlgorandPending,
    [destroyAlgorand.fulfilled]: destroyAlgorandFulfilled,
    [destroyAlgorand.rejected]: destroyAlgorandRejected,

    [createAlgorandFractionalNft.pending]: createAlgorandFractionalNftPending,
    [createAlgorandFractionalNft.fulfilled]: createAlgorandFractionalNftFulfilled,
    [createAlgorandFractionalNft.rejected]: createAlgorandFractionalNftRejected,

    [freezeAlgorand.pending]: freezeAlgorandPending,
    [freezeAlgorand.fulfilled]: freezeAlgorandFulfilled,
    [freezeAlgorand.rejected]: freezeAlgorandRejected,

    [modifyAlgorand.pending]: modifyAlgorandPending,
    [modifyAlgorand.fulfilled]: modifyAlgorandFulfilled,
    [modifyAlgorand.rejected]: modifyAlgorandRejected,

    [algorandOptIn.pending]: algorandOptInPending,
    [algorandOptIn.fulfilled]: algorandOptInFulfilled,
    [algorandOptIn.rejected]: algorandOptInRejected,

    [algorandOptOut.pending]: algorandOptOutPending,
    [algorandOptOut.fulfilled]: algorandOptOutFulfilled,
    [algorandOptOut.rejected]: algorandOptOutRejected,

    [getAlgorandSendList.pending]: getAlgorandSendListPending,
    [getAlgorandSendList.fulfilled]: getAlgorandSendListFulfilled,
    [getAlgorandSendList.rejected]: getAlgorandSendListRejected,

    [sendAlgorand.pending]: sendAlgorandPending,
    [sendAlgorand.fulfilled]: sendAlgorandFulfilled,
    [sendAlgorand.rejected]: sendAlgorandRejected,

    [swapAlgorand.pending]: swapAlgorandPending,
    [swapAlgorand.fulfilled]: swapAlgorandFulfilled,
    [swapAlgorand.rejected]: swapAlgorandRejected,

    [unfreezeAlgorand.pending]: unfreezeAlgorandPending,
    [unfreezeAlgorand.fulfilled]: unfreezeAlgorandFulfilled,
    [unfreezeAlgorand.rejected]: unfreezeAlgorandRejected,
  }
})

export const { incorrectPassphraseError } = algorandSlice.actions

export default algorandSlice.reducer

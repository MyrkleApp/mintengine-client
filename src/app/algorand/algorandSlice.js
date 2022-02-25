import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CREATE, IMPORT } from '../../constants/walletStatus';
import axios from '../axios'
import * as actions from './actions';

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

export const getAllAlgorandWallets = createAsyncThunk(`${namespace}/getAllAlgorandWallets`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/algorand/v1/wallet/')
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

export const getAlgorandHoldings = createAsyncThunk(`${namespace}/getAlgorandHoldings`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/algorand/v1/holdings/`)
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
    const { data } = await axios.get('/algorand/v1/send/')
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

export const createAlgorandUniqueNft = createAsyncThunk(`${namespace}/createAlgorandUniqueNft`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/unique_nft/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandWeb3Ticket = createAsyncThunk(`${namespace}/createAlgorandWeb3Ticket`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/we3ticket/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const DEFAULT = { status: null, data: null, error: null }

const algorandSlice = createSlice({
  name: 'algorand',
  initialState: {
    createWallet: { status: null, error: null },
    id: null,
    address: null,
    passphrase: "",
    user: null,
    confirmWallet: { status: null, success: null, error: "" },
    activeWallet: DEFAULT,
    allWallets: DEFAULT,
    clawback: DEFAULT,
    commonNft: DEFAULT,
    token: DEFAULT,
    customToken: DEFAULT,
    destroy: DEFAULT,
    fractionalNft: DEFAULT,
    freeze: DEFAULT,
    holdings: DEFAULT,
    modify: DEFAULT,
    optIn: DEFAULT,
    optOut: DEFAULT,
    sendList: DEFAULT,
    send: DEFAULT,
    swap: DEFAULT,
    unfreeze: DEFAULT,
    uniqueNft: DEFAULT,
    web3Ticket: DEFAULT,

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
    [createAlgorandWallet.pending]: actions.createAlgorandWalletPending,
    [createAlgorandWallet.fulfilled]: actions.createAlgorandWalletFulfilled,
    [createAlgorandWallet.rejected]: actions.createAlgorandWalletRejected,
    
    [confirmAlgorandPassphrase.pending]: actions.confirmAlgorandPassphrasePending,
    [confirmAlgorandPassphrase.fulfilled]: actions.confirmAlgorandPassphraseFulfilled,
    [confirmAlgorandPassphrase.rejected]: actions.confirmAlgorandPassphraseRejected,
    
    [getActiveAlgorandWallet.pending]: actions.getActiveAlgorandWalletPending,
    [getActiveAlgorandWallet.fulfilled]: actions.getActiveAlgorandWalletFulfilled,
    [getActiveAlgorandWallet.rejected]: actions.getActiveAlgorandWalletRejected,

    [getAllAlgorandWallets.pending]: actions.getAllAlgorandWalletsPending,
    [getAllAlgorandWallets.fulfilled]: actions.getAllAlgorandWalletsFulfilled,
    [getAllAlgorandWallets.rejected]: actions.getAllAlgorandWalletsRejected,

    [createAlgorandClawback.pending]: actions.createAlgorandClawbackPending,
    [createAlgorandClawback.fulfilled]: actions.createAlgorandClawbackFulfilled,
    [createAlgorandClawback.rejected]: actions.createAlgorandClawbackRejected,

    [createAlgorandCommonNft.pending]: actions.createAlgorandCommonNftPending,
    [createAlgorandCommonNft.fulfilled]: actions.createAlgorandCommonNftFulfilled,
    [createAlgorandCommonNft.rejected]: actions.createAlgorandCommonNftRejected,

    [createAlgorandToken.pending]: actions.createAlgorandTokenPending,
    [createAlgorandToken.fulfilled]: actions.createAlgorandTokenFulfilled,
    [createAlgorandToken.rejected]: actions.createAlgorandTokenRejected,

    [createCustomAlgorandToken.pending]: actions.createCustomAlgorandTokenPending,
    [createCustomAlgorandToken.fulfilled]: actions.createCustomAlgorandTokenFulfilled,
    [createCustomAlgorandToken.rejected]: actions.createCustomAlgorandTokenRejected,

    [destroyAlgorand.pending]: actions.destroyAlgorandPending,
    [destroyAlgorand.fulfilled]: actions.destroyAlgorandFulfilled,
    [destroyAlgorand.rejected]: actions.destroyAlgorandRejected,

    [createAlgorandFractionalNft.pending]: actions.createAlgorandFractionalNftPending,
    [createAlgorandFractionalNft.fulfilled]: actions.createAlgorandFractionalNftFulfilled,
    [createAlgorandFractionalNft.rejected]: actions.createAlgorandFractionalNftRejected,

    [freezeAlgorand.pending]: actions.freezeAlgorandPending,
    [freezeAlgorand.fulfilled]: actions.freezeAlgorandFulfilled,
    [freezeAlgorand.rejected]: actions.freezeAlgorandRejected,

    [getAlgorandHoldings.pending]: actions.getAlgorandHoldingsPending,
    [getAlgorandHoldings.fulfilled]: actions.getAlgorandHoldingsFulfilled,
    [getAlgorandHoldings.rejected]: actions.getAlgorandHoldingsRejected,

    [modifyAlgorand.pending]: actions.modifyAlgorandPending,
    [modifyAlgorand.fulfilled]: actions.modifyAlgorandFulfilled,
    [modifyAlgorand.rejected]: actions.modifyAlgorandRejected,

    [algorandOptIn.pending]: actions.algorandOptInPending,
    [algorandOptIn.fulfilled]: actions.algorandOptInFulfilled,
    [algorandOptIn.rejected]: actions.algorandOptInRejected,

    [algorandOptOut.pending]: actions.algorandOptOutPending,
    [algorandOptOut.fulfilled]: actions.algorandOptOutFulfilled,
    [algorandOptOut.rejected]: actions.algorandOptOutRejected,

    [getAlgorandSendList.pending]: actions.getAlgorandSendListPending,
    [getAlgorandSendList.fulfilled]: actions.getAlgorandSendListFulfilled,
    [getAlgorandSendList.rejected]: actions.getAlgorandSendListRejected,

    [sendAlgorand.pending]: actions.sendAlgorandPending,
    [sendAlgorand.fulfilled]: actions.sendAlgorandFulfilled,
    [sendAlgorand.rejected]: actions.sendAlgorandRejected,

    [swapAlgorand.pending]: actions.swapAlgorandPending,
    [swapAlgorand.fulfilled]: actions.swapAlgorandFulfilled,
    [swapAlgorand.rejected]: actions.swapAlgorandRejected,

    [unfreezeAlgorand.pending]: actions.unfreezeAlgorandPending,
    [unfreezeAlgorand.fulfilled]: actions.unfreezeAlgorandFulfilled,
    [unfreezeAlgorand.rejected]: actions.unfreezeAlgorandRejected,

    [createAlgorandUniqueNft.pending]: actions.createAlgorandUniqueNftPending,
    [createAlgorandUniqueNft.fulfilled]: actions.createAlgorandUniqueNftFulfilled,
    [createAlgorandUniqueNft.rejected]: actions.createAlgorandUniqueNftRejected,

    [createAlgorandWeb3Ticket.pending]: actions.createAlgorandWeb3TicketPending,
    [createAlgorandWeb3Ticket.fulfilled]: actions.createAlgorandWeb3TicketFulfilled,
    [createAlgorandWeb3Ticket.rejected]: actions.createAlgorandWeb3TicketRejected,
  }
})

export const { incorrectPassphraseError } = algorandSlice.actions

export default algorandSlice.reducer

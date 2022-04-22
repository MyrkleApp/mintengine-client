import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ALGORAND, ALGORAND_MAIN_NET, ALGORAND_TEST_NET, RIPPLE } from '../../constants/network'
import axios from '../axios'
import * as actions from './actions';

const namespace = "network"

export const setNet = createAsyncThunk(`${namespace}/setNet`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/set_net/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const DEFAULT = { status: null, data: null, error: null }

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    network: ALGORAND,
    networkType: ALGORAND_TEST_NET,
    setNet: DEFAULT
  },
  reducers: {
    toggleNetwork(state) {
        if (state.network === ALGORAND) {
            state.network = RIPPLE
        } else if (state.network === RIPPLE) {
            state.network = ALGORAND
        }
    },
    toggleNetworkType(state) {
      if (state.networkType === ALGORAND_TEST_NET) {
          state.networkType = ALGORAND_MAIN_NET
      } else if (state.networkType === ALGORAND_MAIN_NET) {
          state.networkType = ALGORAND_TEST_NET
      }
    }
  },
  extraReducers: {
    [setNet.pending]: actions.setNetPending,
    [setNet.fulfilled]: actions.setNetFulfilled,
    [setNet.rejected]: actions.setNetRejected
  }
})

export const { toggleNetwork, toggleNetworkType } = networkSlice.actions

export default networkSlice.reducer

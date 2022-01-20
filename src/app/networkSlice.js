import { createSlice } from '@reduxjs/toolkit'
import { ALGORAND, RIPPLE } from '../constants/network'

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    network: ALGORAND
  },
  reducers: {
    toggleNetwork(state) {
        if (state.network === ALGORAND) {
            state.network = RIPPLE
        } else if (state.network === RIPPLE) {
            state.network = ALGORAND
        }
    }
  },
})

export const { toggleNetwork } = networkSlice.actions

export default networkSlice.reducer

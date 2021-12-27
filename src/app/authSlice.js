import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    selectedWallet: null,
  },
  reducers: {
    setSelectedWallet(state, action) {
        state.selectedWallet = action.payload
    }
  },
})

export const { setSelectedWallet } = authSlice.actions

export default authSlice.reducer

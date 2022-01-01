import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from './axios'

const namespace = 'auth'

export const registerUser = createAsyncThunk(`${namespace}/registerUser`, async (user) => {
  try {
    const { data } = await axios.post('/accounts/register/', user)
    return data;
  } catch (err) {
    console.log(err)
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { status: null, userDetails: null }
  },
  reducers: {
    // setSelectedWallet(state, action) {
    //     state.selectedWallet = action.payload
    // },
  },
  extraReducers: {
    [registerUser.pending](state) {
      state.user.status = 'pending'
    },
    [registerUser.fulfilled](state, { payload }) {
      state.user.status = 'fulfilled'
      state.user.userDetails = payload
    },
    [registerUser.rejected](state, { error }) {
      state.user.userDetails = 'rejected'
    },
  }
})

export const { setSelectedWallet } = authSlice.actions

export default authSlice.reducer

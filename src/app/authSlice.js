import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../constants/httpStatus'
import axios from './axios'

const namespace = 'auth'

export const registerUser = createAsyncThunk(`${namespace}/registerUser`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/accounts/register/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const loginUser = createAsyncThunk(`${namespace}/loginUser`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/accounts/login/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    register: { status: null, error: "" },
    login: { status: null, error: "" },
    token: null,
  },
  reducers: {
    // setSelectedWallet(state, action) {
    //     state.selectedWallet = action.payload
    // },
  },
  extraReducers: {
    /**
     * register
     */
    [registerUser.pending](state) {
      state.register.status = HTTP_STATUS.PENDING
    },
    [registerUser.fulfilled](state, { payload }) {
      state.register.status = HTTP_STATUS.FULFILLED
      state.token = payload.key
      localStorage.setItem('mint-engine', JSON.stringify(payload.key))
    },
    [registerUser.rejected](state, { payload }) {
      state.register.status = HTTP_STATUS.REJECTED
      state.register.error = payload.error[0]
    },
    /**
     * login
     */
    [loginUser.pending](state) {
      state.login.status = HTTP_STATUS.PENDING
    },
    [loginUser.fulfilled](state, { payload }) {
      state.login.status = HTTP_STATUS.FULFILLED
      state.token = payload.key
      localStorage.setItem('mint-engine', JSON.stringify(payload.key))
    },
    [loginUser.rejected](state, { payload }) {
      state.login.status = HTTP_STATUS.REJECTED
      state.login.error = payload

    },
  }
})

export const { setSelectedWallet } = authSlice.actions

export default authSlice.reducer

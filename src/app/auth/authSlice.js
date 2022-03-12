import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'
import * as actions from './actions'

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

export const getUser = createAsyncThunk(`${namespace}/getUser`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/accounts/user/')
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const verifyPassword = createAsyncThunk(`${namespace}/verifyPassword`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/accounts/verify_password/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const changePassword = createAsyncThunk(`${namespace}/changePassword`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/accounts/password/change/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const DEFAULT = { status: null, data: null, error: null }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    register: { status: null, error: "" },
    login: { status: null, error: "" },
    token: null,
    isLoggedIn: false,
    verifyPassword: DEFAULT,
    changePassword: DEFAULT,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.isLoggedIn = false
      localStorage.removeItem('mint-engine')
    },
  },
  extraReducers: {
    [registerUser.pending]: actions.registerUserPending,
    [registerUser.fulfilled]: actions.registerUserFulfilled,
    [registerUser.rejected]: actions.registerUserRejected,
    
    [loginUser.pending]: actions.loginUserPending,
    [loginUser.fulfilled]: actions.loginUserFulfilled,
    [loginUser.rejected]: actions.loginUserRejected,

    [getUser.fulfilled]: actions.getUserFulfilled,

    [verifyPassword.pending]: actions.verifyPasswordPending,
    [verifyPassword.fulfilled]: actions.verifyPasswordFulfilled,
    [verifyPassword.rejected]: actions.verifyPasswordRejected,

    [changePassword.pending]: actions.changePasswordPending,
    [changePassword.fulfilled]: actions.changePasswordFulfilled,
    [changePassword.rejected]: actions.changePasswordRejected,
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer

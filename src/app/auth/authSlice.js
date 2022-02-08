import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'
import { 
  loginUserFulfilled, 
  loginUserPending, 
  loginUserRejected, 
  registerUserFulfilled, 
  registerUserPending, 
  registerUserRejected 
} from './actions'

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
    logout(state) {
      state.token = null;
      localStorage.removeItem('mint-engine')
    },
  },
  extraReducers: {
    [registerUser.pending]: registerUserPending,
    [registerUser.fulfilled]: registerUserFulfilled,
    [registerUser.rejected]: registerUserRejected,
    
    [loginUser.pending]: loginUserPending,
    [loginUser.fulfilled]: loginUserFulfilled,
    [loginUser.rejected]: loginUserRejected,
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer

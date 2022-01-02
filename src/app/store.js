import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import backdropReducer from './backdropSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    backdrop: backdropReducer
  },
})

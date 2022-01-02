import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import backdropReducer from './backdropSlice'
import algorandReducer from './algorandSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    backdrop: backdropReducer,
    algorand: algorandReducer
  },
})

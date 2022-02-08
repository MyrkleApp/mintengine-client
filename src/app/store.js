import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import backdropReducer from './backdrop/backdropSlice'
import algorandReducer from './algorand/algorandSlice'
import networkReducer from './network/networkSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    backdrop: backdropReducer,
    algorand: algorandReducer,
    network: networkReducer
  },
})

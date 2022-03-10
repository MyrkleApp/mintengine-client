import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import backdropReducer from './backdrop/backdropSlice'
import algorandReducer from './algorand/algorandSlice'
import networkReducer from './network/networkSlice'
import deviceFingerprintReducer from './deviceFingerprint/deviceFingerprintSlice'
import priceReducer from './price/priceSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    backdrop: backdropReducer,
    algorand: algorandReducer,
    network: networkReducer,
    deviceFingerprint: deviceFingerprintReducer,
    price: priceReducer,
  },
})

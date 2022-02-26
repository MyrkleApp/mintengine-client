import { createSlice } from '@reduxjs/toolkit'

const deviceFingerprintSlice = createSlice({
    name: 'deviceFingerprint',
    initialState: {
        deviceFingerprint: ''
    },
    reducers: {
        setDeviceFingerprint(state, action) {
            state.deviceFingerprint = action.payload
        }
    },
})

export const { setDeviceFingerprint } = deviceFingerprintSlice.actions

export default deviceFingerprintSlice.reducer
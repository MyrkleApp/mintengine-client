import { createSlice } from '@reduxjs/toolkit'

const backdropSlice = createSlice({
  name: 'backdrop',
  initialState: {
    open: false,
  },
  reducers: {
    toggleBackdrop(state) {
        state.open = !state.open;
    }
  },
})

export const { toggleBackdrop } = backdropSlice.actions

export default backdropSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: 0
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { incrementByAmount } = authSlice.actions

export default authSlice.reducer

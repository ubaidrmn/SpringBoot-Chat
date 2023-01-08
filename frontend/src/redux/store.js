import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'

export default configureStore({
  reducer: {
    auth: authSlice
  }
})

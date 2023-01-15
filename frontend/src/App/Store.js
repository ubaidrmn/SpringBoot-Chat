import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from '../Features/Authentication/AuthenticationSlice'
import AppSlice from './AppSlice'

export default configureStore({
  reducer: {
    auth: AuthenticationSlice,
    app: AppSlice,
  }
})

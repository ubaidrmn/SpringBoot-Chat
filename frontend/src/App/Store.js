import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from '../Features/Authentication/AuthenticationSlice'
import FriendsSlice from '../Features/Friends/FriendsSlice'
import InboxSlice from '../Features/Inbox/InboxSlice'
import AppSlice from './AppSlice'

export default configureStore({
  reducer: {
    auth: AuthenticationSlice,
    app: AppSlice,
    inbox: InboxSlice,
    friends: FriendsSlice
  }
})

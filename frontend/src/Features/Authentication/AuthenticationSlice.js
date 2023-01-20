import { createSlice } from '@reduxjs/toolkit'

const AuthenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    userData: {
      name: null,
      email: null,
      picture: null,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData.name = action.payload.name;
      state.userData.email = action.payload.email;
      state.userData.picture = action.payload.picture;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = true;
    },
    setLoggedOut: (state, action) => {
      state.loggedIn = false;
      state.userData = {name: null, email: null, picture: null}
    }
  }
})

export const { setUserData, setLoggedIn, setLoggedOut } = AuthenticationSlice.actions

export default AuthenticationSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const AuthenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    jwt: null,
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
    },
    setJwt: (state, action) => {
      state.jwt = action.payload.jwt;
    }
  }
})

export const { setUserData, setLoggedIn, setLoggedOut, setJwt } = AuthenticationSlice.actions

export default AuthenticationSlice.reducer

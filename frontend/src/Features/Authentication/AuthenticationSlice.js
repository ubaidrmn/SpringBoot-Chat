import { createSlice } from '@reduxjs/toolkit'

const AuthenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    userdata: {
      name: null,
      email: null,
      picture: null,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userdata.name = action.payload.name;
      state.userdata.email = action.payload.email;
      state.userdata.picture = action.payload.picture;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = true;
    },
    setLoggedOut: (state, action) => {
      state.loggedIn = false;
      state.userdata = {name: null, email: null, picture: null}
    }
  }
})

export const { setUserData, setLoggedIn, setLoggedOut } = AuthenticationSlice.actions

export default AuthenticationSlice.reducer

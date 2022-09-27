import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      token: null,
   },
   reducers: {
      setCredentials: (state, action) => {
         const { user, accessToken } = action.payload
         state.user = user
         state.accessToken = accessToken
      },
      logOut: (state, action) => {
         state.user = null
         state.accessToken = null
      },
   },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.Token

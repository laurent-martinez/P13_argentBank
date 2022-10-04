import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isLoading: false,
   isAuth: false,
   error: '',
   token: '',
}

const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {
      loginPending: (state) => {
         state.isLoading = true
      },
      loginSuccess: (state, { payload }) => {
         state.isLoading = false
         state.isAuth = true
      },
      getToken: (state, { payload }) => {
         state.token = payload
      },
      loginFail: (state, { payload }) => {
         state.isLoading = false
         state.error = payload
      },
      logout: (state, { payload }) => {
         state.token = ''
         state.isAuth = true
      },
   },
})

const { reducer, actions } = loginSlice

export const { loginPending, loginSuccess, loginFail, logout, getToken } =
   actions

export default reducer

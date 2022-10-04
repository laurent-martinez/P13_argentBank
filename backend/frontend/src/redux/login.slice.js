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
   },
})

const { reducer, actions } = loginSlice

export const { loginPending, loginSuccess, loginFail, getToken } = actions

export default reducer

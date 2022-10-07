import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isLoading: false,
   isAuth: false,
   error: '',
   token: '',
   remember: false,
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
      setRemember: (state) => {
         state.remember = true
      },
      loginFail: (state, { payload }) => {
         state.isLoading = false
         state.error = payload
      },
      logout: (state, { payload }) => {
         state.token = ''
         state.isAuth = false
      },
   },
})

const { reducer, actions } = loginSlice

export const {
   loginPending,
   loginSuccess,
   loginFail,
   logout,
   getToken,
   setRemember,
} = actions

export default reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isLoading: false,
   userData: {},
   error: '',
   token: '',
}

const userDataSlice = createSlice({
   name: 'userInfo',
   initialState,
   reducers: {
      userDataPending: (state) => {
         state.isLoading = true
      },
      userDataSuccess: (state, { payload }) => {
         state.isLoading = false
         state.userData = payload.body.token
         state.error = ''
      },
      userDataFail: (state, { payload }) => {
         state.isLoading = false
         state.error = payload
      },
   },
})

const { reducer, actions } = userDataSlice

export const { userDataPending, userDataSuccess, userDataFail } = actions

export default reducer

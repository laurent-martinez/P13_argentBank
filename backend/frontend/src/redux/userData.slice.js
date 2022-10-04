import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isLoading: false,
   userData: {
      firstName: '',
      lastName: '',
   },
   error: '',
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
         state.userData = {
            firstName: payload.body.firstName,
            lastName: payload.body,
         }
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

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isLoading: false,
   firstName: '',
   lastName: '',
   error: '',
}

const userDataSlice = createSlice({
   name: 'userInfo',
   initialState,
   reducers: {
      userDataPending: (state) => {
         state.isLoading = true
      },
      userFirstName: (state, { payload }) => {
         state.isLoading = false
         state.firstName = payload
         state.error = ''
      },
      userLastName: (state, { payload }) => {
         state.isLoading = false
         state.lastName = payload
         state.error = ''
      },
      userDataFail: (state, { payload }) => {
         state.isLoading = false
         state.error = payload
      },
      userLogout: (state, { payload }) => {
         state.firstName = ''
         state.lastName = ''
         state.error = ''
      },
   },
})

const { reducer, actions } = userDataSlice

export const {
   userDataPending,
   userFirstName,
   userLastName,
   userDataFail,
   userLogout,
} = actions

export default reducer

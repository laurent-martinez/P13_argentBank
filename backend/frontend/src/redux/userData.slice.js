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
         state.firstName = payload.firstName
         state.error = ''
      },
      userLastName: (state, { payload }) => {
         state.isLoading = false
         state.lastName = payload.lastName
         state.error = ''
      },
      userDataFail: (state, { payload }) => {
         state.isLoading = false
         state.error = payload
      },
   },
})

const { reducer, actions } = userDataSlice

export const { userDataPending, userFirstName, userLastName, userDataFail } =
   actions

export default reducer

import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: { value: { userName: '', password: '' } },
   reducers: {
      logout: (state) => {
         state.value.userName = ''
         state.value.password = ''
      },
      login: (state, action) => {
         state.value = action.payload
      },
   },
})
export const { logout, login } = authSlice.actions
export default authSlice.reducer

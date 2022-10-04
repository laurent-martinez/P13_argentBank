import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userData.slice'
import loginReducer from './login.slice'

const store = configureStore({
   reducer: {
      login: loginReducer,
      user: useReducer,
   },
})

export default store

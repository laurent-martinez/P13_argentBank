import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Components/Login/login.slice'

const store = configureStore({
   reducer: {
      login: loginReducer,
   },
})

export default store

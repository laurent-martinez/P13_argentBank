import { configureStore } from '@reduxjs/toolkit'
import {
   persistStore,
   persistCombineReducers,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './userData.slice'
import loginReducer from './login.slice'

const persistConfig = {
   key: 'auth',
   version: 1,
   storage,
}

const persistedReducer = persistCombineReducers(persistConfig, {
   login: loginReducer,
   user: userReducer,
})

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})

let persistor = persistStore(store)
export { persistor }
export default store

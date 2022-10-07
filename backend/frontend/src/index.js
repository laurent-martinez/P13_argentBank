import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store, { persistor } from './redux/store'
import App from './App.js'

import './styles/index.scss'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <App />
         </PersistGate>
      </Provider>
   </React.StrictMode>
)

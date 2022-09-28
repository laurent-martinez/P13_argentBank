import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.js'

import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/*" element={<App />} />
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
)

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Components/PrivateRoutes'
import Error from './Pages/Error'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import SignIn from './Pages/SignIn'
import Transactions from './Pages/Transactions'
import './styles/index.scss'

const ReactRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            {/* private routes */}
            <Route element={<PrivateRoutes />}>
               <Route path="/profile" element={<ProfilePage />} />
               <Route path="/transactions" element={<Transactions />} />
            </Route>

            {/* catch all other routes */}
            <Route path="*" element={<Error />} />
         </Routes>
      </BrowserRouter>
   )
}

export default ReactRouter

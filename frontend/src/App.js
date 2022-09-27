import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import RequireAuth from './Components/RequireAuth'
import Error from './Pages/Error'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import SignIn from './Pages/SignIn'
import Unauthorized from './Pages/Unauthorized'
import './styles/index.scss'

// all the routes for the app using react-router v6

// const roles = {
//    user: 2001,
//    admin: 1982,
// }
const ReactRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* private routes */}
            <Route element={<RequireAuth />}>
               <Route path="/profile" element={<ProfilePage />} />
            </Route>
            {/* catch all other routes */}
            <Route path="*" element={<Error />} />
         </Route>
      </Routes>
   )
}

export default ReactRouter

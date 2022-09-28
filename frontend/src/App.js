import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Error from './Pages/Error'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import SignIn from './Pages/SignIn'
import Unauthorized from './Pages/Unauthorized'
import './styles/index.scss'

const ReactRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* private routes */}

            <Route path="/profile" element={<ProfilePage />} />

            {/* catch all other routes */}
            <Route path="*" element={<Error />} />
         </Route>
      </Routes>
   )
}

export default ReactRouter

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Footer from '../../Components/Footer'
import Login from '../../Components/Login'
import Nav from '../../Components/Nav'

import './signin.scss'

const SignIn = () => {
   const { isAuth } = useSelector((state) => state.login)
   return !isAuth ? (
      <>
         <Nav />
         <main className="main bg-dark">
            <Login />
         </main>
         <Footer />
      </>
   ) : (
      <Navigate to="/" />
   )
}

export default SignIn

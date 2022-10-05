import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/login.slice'
import { userFirstName } from '../../redux/userData.slice'
import './nav.scss'

const Nav = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const storageFirstName = localStorage.getItem('firstName')
   useEffect(() => {
      if (storageFirstName) {
         dispatch(userFirstName(storageFirstName))
      }
   }, [dispatch, storageFirstName])

   const { firstName } = useSelector((state) => state.user)

   const handleLogout = () => {
      dispatch(logout())
      localStorage.removeItem('token')
      sessionStorage.removeItem('accessToken')
      navigate('/')
   }
   console.log(firstName)
   // const { token } = useSelector((state) => state.login)
   const token =
      localStorage.getItem('token') || sessionStorage.getItem('accessToken')

   return (
      <nav className="main-nav">
         <Link className="main-nav-logo" to="/">
            <img
               className="main-nav-logo-image"
               src="/img/argentBankLogo.png"
               alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
         </Link>
         <div>
            {token ? (
               <>
                  <Link className="main-nav-item" to="/profile">
                     <i className="fa fa-user-circle"></i>
                     {firstName}
                  </Link>
                  <Link className="main-nav-item" to="/" onClick={handleLogout}>
                     <i className="fa fa-sign-out"></i>
                     Sign Out
                  </Link>
               </>
            ) : (
               <Link className="main-nav-item" to="/signin">
                  <i className="fa fa-user-circle"></i>
                  Sign In
               </Link>
            )}
         </div>
      </nav>
   )
}

export default Nav

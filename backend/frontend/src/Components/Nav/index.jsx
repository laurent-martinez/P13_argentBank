import { useSelector, useDispatch } from 'react-redux'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './nav.scss'

const Nav = () => {
   const { isAuth } = useSelector((state) => state.login)
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
            {isAuth ? (
               <>
                  <Link className="main-nav-item" to="/signin">
                     <i className="fa fa-user-circle"></i>
                     Sign In
                  </Link>
                  <Link className="main-nav-item" to="/">
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

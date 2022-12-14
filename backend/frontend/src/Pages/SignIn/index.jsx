import Footer from '../../Components/Footer'
import Login from '../../Components/Login'
import Nav from '../../Components/Nav'
import './signin.scss'

/**
 * sign in page
 * @component
 * @returns {JSX.Element}
 */
const SignIn = () => {
   return (
      <>
         <Nav />
         <main className="main bg-dark">
            <Login />
         </main>
         <Footer />
      </>
   )
}

export default SignIn

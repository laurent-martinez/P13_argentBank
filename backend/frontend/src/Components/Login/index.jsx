import { useRef, useState, useEffect } from 'react'
import {
   loginPending,
   loginSuccess,
   loginFail,
   getToken,
} from '../../redux/login.slice'
import { FcOk } from 'react-icons/fc'
import { FaUserCircle, FaInfoCircle, FaSpinner } from 'react-icons/fa'
import './signinForm.scss'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../api/userApi'
import { useSelector, useDispatch } from 'react-redux'

const userRegex =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const pswdRegex = /^[a-zA-Z0-9]{5,23}$/

const Login = () => {
   const [remember, setRemember] = useState(false)
   const userRef = useRef()
   const errRef = useRef()
   const navigate = useNavigate()

   const dispatch = useDispatch()
   const [email, setEmail] = useState('')
   const [validEmail, setValidEmail] = useState(false)
   const [emailFocus, setEmailFocus] = useState(false)
   const { isLoading, isAuth, error } = useSelector((state) => state.login)
   const [password, setPassword] = useState('')
   const [validPswd, setValidPswd] = useState(false)
   const [pswdFocus, setPswdFocus] = useState(false)
   const [err, setErr] = useState('error detected')

   useEffect(() => {
      userRef.current.focus()
   }, [])

   useEffect(() => {
      const result = userRegex.test(email)
      const result2 = pswdRegex.test(password)
      setValidEmail(result)
      setValidPswd(result2)
      setErr('')
   }, [email, password])

   const handleOnChange = (e) => {
      const { name, value } = e.target
      switch (name) {
         case 'email':
            setEmail(value)
            break
         case 'password':
            setPassword(value)
            break
         default:
            break
      }
   }
   const handleRemember = (e) => {
      e.currentTarget.checked ? setRemember(true) : setRemember(false)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      dispatch(loginPending())
      try {
         const isAuth = await userLogin({ email, password }, remember)
         if (isAuth.status === 'error') {
            return dispatch(loginFail())
         }
         console.log('res', isAuth)

         dispatch(loginSuccess())
         navigate('/profile')
      } catch (err) {
         if (!err?.response) {
            setErr('No response from server')
         } else if (err.response?.status === 400) {
            setErr('Utilisateur inconnu')
         } else {
            dispatch(loginFail(error.message))
         }
      }
   }

   return (
      <section className="sign-in-content">
         <p
            ref={errRef}
            className={err ? 'errmsg' : 'offScreen'}
            aria-live="assertive"
         >
            {err}
         </p>
         <i className="fa fa-user-circle login_logo"></i>
         <h1>Sign In</h1>
         <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
               <label htmlFor="email">
                  Username {emailFocus && email && validEmail && <FcOk />}{' '}
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  ref={userRef}
                  required
                  value={email}
                  autoComplete="off"
                  onChange={handleOnChange}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
               />
               <p
                  className={
                     emailFocus && email && !validEmail
                        ? 'instructions'
                        : 'offScreen'
                  }
               >
                  <FaInfoCircle /> Invalid email
               </p>
            </div>
            <div className="input-wrapper">
               <label htmlFor="password">
                  Password {pswdFocus && password && validPswd && <FcOk />}{' '}
               </label>

               <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={handleOnChange}
                  onFocus={() => setPswdFocus(true)}
                  onBlur={() => setPswdFocus(false)}
               />
               <p
                  className={
                     pswdFocus && password && !validPswd
                        ? 'instructions'
                        : 'offScreen'
                  }
               >
                  <FaInfoCircle /> Invalid password.
                  <br /> alpha-numeric & must be between 5 and 23 characters.
               </p>
            </div>
            <div className="input-remember">
               <input
                  type="checkbox"
                  id="remember-me"
                  onClick={handleRemember}
               />
               <label htmlFor="remember-me">Remember me</label>
            </div>

            <button
               className="sign-in-button"
               disabled={!validEmail || !validPswd ? true : false}
            >
               Sign In
            </button>
            {isLoading && validEmail && validPswd && (
               <FaSpinner className="rotate" />
            )}
         </form>
      </section>
   )
}

export default Login

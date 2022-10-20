import { useRef, useState, useEffect } from 'react'
import {
   loginPending,
   loginSuccess,
   loginFail,
   getToken,
   setRemember,
   getEmail,
} from '../../redux/login.slice'
import { FcOk } from 'react-icons/fc'
import { FaInfoCircle, FaSpinner } from 'react-icons/fa'
import './signinForm.scss'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../api/userApi'
import { useSelector, useDispatch } from 'react-redux'

// regex
/**
 * regex for the validity of the user's email
 * @variable userRegex
 */
const userRegex =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/**
 * regex for the validity of the user's password
 * @variable pswdRegex
 */

const pswdRegex = /^[a-zA-Z0-9]{5,23}$/

/**
 * functionnal components for the login form
 * @component
 * @returns {JSX.Element}
 */
const Login = () => {
   /**
    * importing values from the store, in the login reducer
    */
   const { remember, userEmail, isLoading, error } = useSelector(
      (state) => state.login
   )
   // define the ref
   const userRef = useRef()
   const errRef = useRef()
   // defining the navigate hook
   const navigate = useNavigate()
   // defining the dispatch hooks for redux toolkit
   const dispatch = useDispatch()
   // defining the states of variables not in the redux store
   let [email, setEmail] = useState('')
   const [validEmail, setValidEmail] = useState(false)
   const [emailFocus, setEmailFocus] = useState(false)
   const [pswdFocus, setPswdFocus] = useState(false)
   const [password, setPassword] = useState('')
   const [validPswd, setValidPswd] = useState(false)
   // focus on first input when page load
   useEffect(() => {
      userRef.current.focus()
   }, [])
   // testing form input for regex validation
   useEffect(() => {
      const result = userRegex.test(email)
      const resultPrime = userRegex.test(userEmail)
      const result2 = pswdRegex.test(password)
      setValidEmail(result || resultPrime)
      setValidPswd(result2)
      dispatch(loginFail(''))
   }, [email, password, userEmail, dispatch])

   // listening form inputs to define values on change
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
   // function who change the remember state
   const handleRemember = (e) => {
      e.currentTarget.checked
         ? dispatch(setRemember(true))
         : dispatch(setRemember(false))
   }
   /**
    * function who deal the submit form
    * @function
    * @param {object} e
    */
   const handleSubmit = async (e) => {
      // avoiding to refresh page when submit
      e.preventDefault()
      // function is loading
      dispatch(loginPending())
      try {
         // passing parameters to userLogin function who call the api
         const isAuth = await userLogin({ email, password }, remember)
         // once api is fetched correctly dispatch login success reducer
         dispatch(loginSuccess())
         // get the token from api response & dispatching it through getToken reducer
         dispatch(getToken(isAuth.body.token))
         // check if remember is true or false & dispatching the email value to userEmail
         remember ? dispatch(getEmail(email)) : dispatch(getEmail(''))
         // go to profile if everything is ok
         navigate('/profile')
      } catch (er) {
         // different error message
         if (!er?.response) {
            dispatch(loginFail('No response from server'))
         } else if (er.response?.status === 400) {
            dispatch(loginFail('Utilisateur inconnu'))
         } else {
            dispatch(loginFail(error.message))
         }
      }
   }
   // if email is empty giving userEmail if userEmail exist
   email = email || userEmail

   // allow to erase userEmail for login with another account
   const handleErase = (e) => {
      e.currentTarget.checked
         ? dispatch(getEmail(''))
         : dispatch(getEmail(email))
      // avoid pre-check of the box
      e.currentTarget.checked = false
   }

   return (
      <section className="sign-in-content">
         <p
            ref={errRef}
            className={error ? 'errmsg' : 'offScreen'}
            aria-live="assertive"
         >
            {error}
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
                  autoComplete="off"
                  placeholder={userEmail}
                  value={email || userEmail}
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
            {userEmail ? (
               <div className="input-remember">
                  <input
                     type="checkbox"
                     id="remember-me"
                     onClick={handleErase}
                  />
                  <label htmlFor="remember-me">
                     Log with different account
                  </label>
               </div>
            ) : (
               <div className="input-remember">
                  <input
                     type="checkbox"
                     id="remember-me"
                     onClick={handleRemember}
                  />
                  <label htmlFor="remember-me">Remember me</label>
               </div>
            )}

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

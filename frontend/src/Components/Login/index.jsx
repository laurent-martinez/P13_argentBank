import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { FcOk } from 'react-icons/fc'
import { FaUserCircle, FaInfoCircle } from 'react-icons/fa'
import './signinForm.scss'
import { useNavigate } from 'react-router-dom'

const userRegex =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const pswdRegex = /^[a-zA-Z0-9]{5,23}$/

const BASE_URL = 'http://localhost:3001/api/v1/user/'
const Login = () => {
   const userRef = useRef()
   const errRef = useRef()
   const navigate = useNavigate()
   const [userName, setUserName] = useState('')
   const [validName, setValidName] = useState(false)
   const [userNameFocus, setUserNameFocus] = useState(false)

   const [password, setPassword] = useState('')
   const [validPswd, setValidPswd] = useState(false)
   const [pswdFocus, setPswdFocus] = useState(false)

   const [err, setErr] = useState('error detected')

   useEffect(() => {
      userRef.current.focus()
   }, [])

   useEffect(() => {
      const result = userRegex.test(userName)
      setValidName(result)
   }, [userName])

   useEffect(() => {
      const result2 = pswdRegex.test(password)
      setValidPswd(result2)
   }, [password])

   useEffect(() => {
      setErr('')
   }, [userName, password])

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const response = await axios.post(
            BASE_URL + 'login',
            { email: userName, password },
            {
               headers: { 'Content-Type': 'application/json' },
            }
         )
         console.log(response.data)
         if (response.data.status === 200) {
            navigate('/profile')
         }
      } catch (err) {
         if (!err?.response) {
            setErr('No response from server')
         } else if (err.response?.status === 400) {
            setErr('Utilisateur inconnu')
         } else {
            setErr('error')
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
         <FaUserCircle className="userIcon" />
         <h1>Sign In</h1>
         <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
               <label htmlFor="username">
                  Username {userNameFocus && userName && validName && <FcOk />}{' '}
               </label>
               <input
                  type="email"
                  id="username"
                  ref={userRef}
                  required
                  value={userName}
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  onFocus={() => setUserNameFocus(true)}
                  onBlur={() => setUserNameFocus(false)}
               />
               <p
                  className={
                     userNameFocus && userName && !validName
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  <br /> alpha-numeric && must be between 5 and 23 characters.
               </p>
            </div>
            <div className="input-remember">
               <input type="checkbox" id="remember-me" />
               <label htmlFor="remember-me">Remember me</label>
            </div>

            <button
               className="sign-in-button"
               disabled={!validName || !validPswd ? true : false}
            >
               Sign In
            </button>
         </form>
      </section>
   )
}

export default Login

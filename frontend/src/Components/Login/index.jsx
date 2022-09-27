import { useRef, useState, useEffect } from 'react'
import './signinForm.scss'
// import axios from '../../Api/axios'
import useAuth from '../../Hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'

const LOGIN_URL = 'http://localhost:3001/api/v1/user/login'

const Login = () => {
   // const { setAuth } = useAuth()
   // const navigate = useNavigate()
   // const location = useLocation()
   // const from = location.state?.from?.pathname || '/'
   const userRef = useRef()
   const errRef = useRef()
   const [userName, setUserName] = useState('')
   const [password, setPassword] = useState('')
   const [err, setErr] = useState('error detected')

   useEffect(() => {
      userRef.current.focus()
   }, [])

   useEffect(() => {
      setErr('')
   }, [userName, password])

   // const handleSubmit = async (e) => {
   //    e.preventDefault()
   //    // navigate('/profile')
   //    try {
   //       const response = await axios.post(
   //          LOGIN_URL,
   //          JSON.stringify(
   //             { email: userName, password },
   //             {
   //                headers: { 'Content-Type': 'application/json' },
   //                withCredentials: true,
   //             }
   //          )
   //       )
   //       console.log(JSON.stringify(response?.data))
   //       // const validateToken = response?.data?.validateToken
   //       // const roles = response?.data?.roles
   //       setAuth({ userName, password })
   //       setUserName('')
   //       setPassword('')
   //       navigate(from, { replace: true })
   //    } catch (err) {
   //       if (!err?.response) {
   //          setErr('No server response')
   //       } else if (err.response?.status === 400) {
   //          setErr('Missing username or password')
   //       } else if (err.response?.status === 401) {
   //          setErr('Unauthorized')
   //       } else {
   //          setErr('Login failed')
   //       }
   //       errRef.current.focus()
   //    }
   // }

   return (
      <section className="sign-in-content">
         <p
            ref={errRef}
            className={err ? 'errmsg' : 'offScreen'}
            aria-live="assertive"
         >
            {err}
         </p>
         <i className="fa fa-user-circle sign-in-icon"></i>
         <h1>Sign In</h1>
         <form>
            <div className="input-wrapper">
               <label htmlFor="username">Username</label>
               <input
                  type="text"
                  id="username"
                  ref={userRef}
                  required
                  value={userName}
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
               />
            </div>
            <div className="input-wrapper">
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className="input-remember">
               <input type="checkbox" id="remember-me" />
               <label htmlFor="remember-me">Remember me</label>
            </div>

            <button className="sign-in-button">Sign In</button>
         </form>
      </section>
   )
}

export default Login

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userFirstName, userLastName } from '../redux/userData.slice'

export const userLogin = (loginData, remember) => {
   const LOGIN_URL = 'login'
   return new Promise(async (resolve, reject) => {
      try {
         const response = await axios.post(
            process.env.REACT_APP_BASE_URL + LOGIN_URL,
            loginData
         )

         resolve(response.data)

         if (response.data.status === 200) {
            remember
               ? localStorage.setItem('token', response.data.body.token)
               : sessionStorage.setItem('accessToken', response.data.body.token)
         }
      } catch (error) {
         reject(error)
      }
   })
}

const PROFILE_URL = 'profile'

export const useInfos = () => {
   return new Promise(async (resolve, reject) => {
      try {
         const accessToken =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('token')

         if (!accessToken) {
            reject('Token not found!')
         }
         const response = await axios.post(
            process.env.REACT_APP_BASE_URL + PROFILE_URL,
            {},
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer${accessToken}`,
               },
            }
         )
         console.log('user data', response.data.body.firstName)
         resolve(response.data)

         console.log('test test', resolve.body.firstName)
      } catch (err) {
         reject(err)
      }
   })
}

export const userUpdateProfile = (newUserNames) => {
   console.log(newUserNames)
   return new Promise(async (resolve, reject) => {
      try {
         const accessToken =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('token')

         const res = await axios.put(
            process.env.REACT_APP_BASE_URL + PROFILE_URL,
            newUserNames,
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer${accessToken}`,
               },
            }
         )

         resolve(res.data)
         console.log(resolve)
      } catch (error) {
         console.log('error userUpDate')
         console.log(error)
         reject(error)
      }
   })
}

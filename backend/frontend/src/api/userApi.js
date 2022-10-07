import axios from 'axios'
import { useSelector } from 'react-redux'

export const userLogin = (loginData, remember) => {
   const LOGIN_URL = 'login'
   return new Promise(async (resolve, reject) => {
      try {
         const response = await axios.post(
            process.env.REACT_APP_BASE_URL + LOGIN_URL,
            loginData
         )

         resolve(response.data)

         // if (response.data.status === 200) {
         //    remember
         //       ? localStorage.setItem('token', response.data.body.token)
         //       : sessionStorage.setItem('accessToken', response.data.body.token)
         // }
      } catch (error) {
         reject(error)
      }
   })
}

const PROFILE_URL = 'profile'

export const useInfos = (token) => {
   return new Promise(async (resolve, reject) => {
      try {
         // const accessToken =
         //    sessionStorage.getItem('accessToken') ||
         //    localStorage.getItem('token')

         const response = await axios.post(
            process.env.REACT_APP_BASE_URL + PROFILE_URL,
            {},
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
            }
         )

         resolve(response.data)
      } catch (err) {
         reject(err)
      }
   })
}

export const userUpdateProfile = (userFirstLastName, token) => {
   return new Promise(async (resolve, reject) => {
      try {
         // const accessToken =
         //    sessionStorage.getItem('accessToken') ||
         //    localStorage.getItem('token')

         const res = await axios.put(
            process.env.REACT_APP_BASE_URL + PROFILE_URL,
            userFirstLastName,
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer${token}`,
               },
            }
         )

         resolve(res.data)
      } catch (error) {
         console.log('error userUpDate')
         console.log(error)
         reject(error)
      }
   })
}

import axios from 'axios'

/**
 * function who call the api for log in & collect response data from the promise
 *@function
 * @param {object} data
 * @returns {object}
 */
export const userLogin = (data) => {
   console.log(data)
   const LOGIN_URL = 'login'
   return new Promise(async (resolve, reject) => {
      try {
         const response = await axios.post(
            process.env.REACT_APP_BASE_URL + LOGIN_URL,
            data
         )
         resolve(response.data)
         console.log(response.data)
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

/**
 * api call to collect user info
 * @function
 * @param {string} token
 * @returns {object}
 */
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

/**
 * api call to change firstName & lastName to database
 * @function
 * @param {string} userFirstLastName
 * @param {string} token
 * @returns {object}
 */
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

import axios from 'axios'

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

export const userInfos = () => {
   const PROFILE_URL = 'profile'
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
         console.log(response.data)
         resolve(response.data)
      } catch (err) {
         reject(err)
      }
   })
}

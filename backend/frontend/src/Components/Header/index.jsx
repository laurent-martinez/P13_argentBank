import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdateProfile } from '../../api/userApi'
import {
   userDataFail,
   userDataPending,
   userFirstName,
   userLastName,
} from '../../redux/userData.slice'

import './Header.scss'

const Header = () => {
   const dispatch = useDispatch()
   const { firstName, lastName } = useSelector((state) => state.user)
   const [editButton, setEditButton] = useState(false)
   const isLocalStorage = localStorage.getItem('token') === null
   console.log('true or false', isLocalStorage)

   const storageFirstName = isLocalStorage
      ? null
      : localStorage.setItem('firstName', firstName)

   const storageLastName = isLocalStorage
      ? null
      : localStorage.setItem('lastName', lastName)

   useEffect(() => {
      if (storageFirstName && storageLastName) {
         dispatch(userFirstName(storageFirstName))
         dispatch(userLastName(storageLastName))
      }
   }, [dispatch, storageFirstName, storageLastName])

   const handleEditButton = (e) => {
      e.preventDefault()
      setEditButton((cur) => !cur)
   }
   const [userFirstLastName, setUserFirstLastName] = useState({
      firstName: '',
      lastName: '',
   })

   function handleChange({ currentTarget }) {
      const { value, name } = currentTarget
      setUserFirstLastName({
         ...userFirstLastName,
         [name]: value,
      })
   }

   const handleEditNames = async (e) => {
      e.preventDefault()
      dispatch(userDataPending())
      try {
         const editUser = await userUpdateProfile(userFirstLastName)
         console.log(editUser)
         dispatch(userFirstName(editUser.body.firstName))
         dispatch(userLastName(editUser.body.lastName))

         setEditButton((cur) => !cur)
      } catch (error) {
         dispatch(userDataFail(error.response.data.message))
      }
   }

   return (
      <>
         {!editButton ? (
            <div className="header">
               <h1>
                  Welcome back
                  <br />
                  {firstName + ' ' + lastName}
               </h1>
               <button className="edit-button" onClick={handleEditButton}>
                  Edit Name
               </button>
            </div>
         ) : (
            <div className="header">
               <h1>Welcome back</h1>
               <form className="editNameContent" onSubmit={handleEditNames}>
                  <div className="headerUserContentSave">
                     <input
                        className="InputfirstName"
                        type="text"
                        placeholder={firstName}
                        name="firstName"
                        required
                        onChange={handleChange}
                     />
                     <button className="edit-button" type="submit">
                        Save
                     </button>
                  </div>
                  <div className="headerUserContentCancel">
                     <input
                        className="inputLastName"
                        type="text"
                        placeholder={lastName}
                        name="lastName"
                        onChange={handleChange}
                        required
                     />
                     <button className="edit-button" onClick={handleEditButton}>
                        Cancel
                     </button>
                  </div>
               </form>
            </div>
         )}
      </>
   )
}

export default Header

import { useState } from 'react'
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
   const [editFirstName, setEditFirstName] = useState('')
   const [editLastName, setEditLastName] = useState('')
   const [editButton, setEditButton] = useState(false)

   const handleEditButton = (e) => {
      e.preventDefault()
      setEditButton((cur) => !cur)
   }
   const handleOnChange = (e) => {
      const { name, value } = e.target
      switch (name) {
         case 'editFirstName':
            setEditFirstName(value)
            break
         case 'editLastName':
            setEditLastName(value)
            break
         default:
            break
      }
   }

   const handleEditNames = async (e) => {
      e.preventDefault()
      dispatch(userDataPending())
      try {
         const editUser = await userUpdateProfile({
            editFirstName,
            editLastName,
         })
         console.log(editUser)
         dispatch(userFirstName(editUser.body.firstName))
         dispatch(userLastName(editUser.body.lastName))
         setEditButton((cur) => !cur)
      } catch (error) {
         dispatch(userDataFail(error.response.data.message))
      }
   }

   console.log(editFirstName, editLastName)
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
                        name="editFirstName"
                        required
                        onChange={handleOnChange}
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
                        name="editLastName"
                        onChange={handleOnChange}
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

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdateProfile } from '../../api/userApi'
import {
   getEditMode,
   userDataFail,
   userDataPending,
   userFirstName,
   userLastName,
} from '../../redux/userData.slice'

import './Header.scss'

/**
 * Header component for profile page
 * @returns {JSX.Element}
 */
const Header = () => {
   const dispatch = useDispatch()
   const { token } = useSelector((state) => state.login)
   const { firstName, lastName, editMode } = useSelector((state) => state.user)
   const [userFirstLastName, setUserFirstLastName] = useState({
      firstName: '',
      lastName: '',
   })
   /**
    * change the state of editMode with redux
    * @function
    *  @param {object} e
    */
   const handleEditButton = (e) => {
      e.preventDefault()
      dispatch(getEditMode(!editMode))
   }

   /**
    * change value of userFirstLastName through input's change
    * @function
    * @param {HTML.Element} currentTarget
    */
   function handleChange({ currentTarget }) {
      console.log(currentTarget)
      const { value, name } = currentTarget
      setUserFirstLastName({
         ...userFirstLastName,
         [name]: value,
      })
   }
   /**
    * handle saving firstName & lastName to the database
    * @function
    * @param {object} e
    */
   const handleEditNames = async (e) => {
      e.preventDefault()
      dispatch(userDataPending())
      try {
         const editUser = await userUpdateProfile(userFirstLastName, token)
         dispatch(userFirstName(editUser.body.firstName))
         dispatch(userLastName(editUser.body.lastName))

         dispatch(getEditMode(!editMode))
      } catch (error) {
         dispatch(userDataFail(error.response.data.message))
      }
   }

   return (
      <>
         {/* ternary who listen editMode state to render the edition profile page or regular profile page */}
         {!editMode ? (
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
               <form className="editName" onSubmit={handleEditNames}>
                  <div className="firstInput-save">
                     <input
                        className="inputFirstName"
                        type="text"
                        placeholder={firstName}
                        name="firstName"
                        required
                        onChange={handleChange}
                     />
                     <button className="edit-button put save" type="submit">
                        Save
                     </button>
                  </div>
                  <div className="secondInput-cancel">
                     <input
                        className="inputLastName"
                        type="text"
                        placeholder={lastName}
                        name="lastName"
                        onChange={handleChange}
                        required
                     />
                     <button
                        className="edit-button put cancel"
                        onClick={handleEditButton}
                     >
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

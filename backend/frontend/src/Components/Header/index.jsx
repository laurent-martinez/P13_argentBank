import { useSelector } from 'react-redux'

import './Header.scss'

const Header = () => {
   const { firstName, lastName } = useSelector((state) => state.user)

   return (
      <div className="header">
         <h1>
            Welcome back
            <br />
            {firstName + ' ' + lastName}
         </h1>
         <button className="edit-button">Edit Name</button>
      </div>
   )
}

export default Header

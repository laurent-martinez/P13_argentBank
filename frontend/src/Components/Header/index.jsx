import { useState } from 'react'
import './Header.scss'

const Header = ({ name }) => {
   const [edit, setEdit] = useState(false)
   return (
      <div className="header">
         <h1>
            Welcome back
            <br />
            {`${name[0]} ${name[1]}`}
         </h1>
         <button className="edit-button">Edit Name</button>
      </div>
   )
}

export default Header

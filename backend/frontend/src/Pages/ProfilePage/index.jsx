import { useState } from 'react'
import Account from '../../Components/Account'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import { userInfos } from '../../api/userApi'
import './profilePage.scss'

const ProfilePage = () => {
   const [first, setFirst] = useState('')
   const [last, setLast] = useState('')

   const result = userInfos()
   console.log(result)

   return (
      <>
         <Nav />
         <main className="main bg-dark">
            <Header name={[first, last]} />
            <h2 className="sr-only">Accounts</h2>
            <Account />
            <Account />
            <Account />
         </main>
         <Footer />
      </>
   )
}

export default ProfilePage

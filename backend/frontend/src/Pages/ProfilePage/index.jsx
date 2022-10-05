import { useDispatch } from 'react-redux'
import { useInfos } from '../../api/userApi'
import Account from '../../Components/Account'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import { userFirstName, userLastName } from '../../redux/userData.slice'

import './profilePage.scss'

const ProfilePage = () => {
   const dispatch = useDispatch()
   useInfos().then((res) => {
      console.log(res.body.lastName)
      dispatch(userFirstName(res.body.firstName))
      dispatch(userLastName(res.body.lastName))
   })

   return (
      <>
         <Nav />
         <main className="main bg-dark">
            <Header />
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

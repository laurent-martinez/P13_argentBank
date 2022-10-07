import { useDispatch, useSelector } from 'react-redux'

import { useInfos } from '../../api/userApi'
import Account from '../../Components/Account'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import { userFirstName, userLastName } from '../../redux/userData.slice'

import './profilePage.scss'

const ProfilePage = () => {
   const dispatch = useDispatch()
   const { token } = useSelector((state) => state.login)
   useInfos(token)
      .then((res) => {
         dispatch(userFirstName(res.body.firstName))
         dispatch(userLastName(res.body.lastName))
      })
      .catch((err) => {
         console.log(err.message)
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

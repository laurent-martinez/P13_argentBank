import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInfos } from '../../api/userApi'
import Account from '../../Components/Account'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import {
   getEditMode,
   userFirstName,
   userLastName,
} from '../../redux/userData.slice'

import './profilePage.scss'

const ProfilePage = () => {
   const dispatch = useDispatch()
   const { token } = useSelector((state) => state.login)
   const { editMode } = useSelector((state) => state.user)
   useEffect(() => {
      dispatch(getEditMode(false))
   }, [dispatch])
   const values = [
      {
         title: 'Argent Bank Checking (x8349)',
         amount: 2082.79,
         amountDescription: 'Available Balance',
      },
      {
         title: 'Argent Bank Savings (x6712)',
         amount: 10928.42,
         amountDescription: 'Available Balance',
      },
      {
         title: 'Argent Bank Credit Card (x8349)',
         amount: 184.3,
         amountDescription: 'Current Balance',
      },
   ]
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
         <main className={editMode ? 'main edit-style' : 'main bg-dark'}>
            <Header />
            <h2 className="sr-only">Accounts</h2>
            <Account
               title={values[0].title}
               amount={values[0].amount}
               amountDescription={values[0].amountDescription}
            />
            <Account
               title={values[1].title}
               amount={values[1].amount}
               amountDescription={values[1].amountDescription}
            />
            <Account
               title={values[2].title}
               amount={values[2].amount}
               amountDescription={values[2].amountDescription}
            />
         </main>
         <Footer />
      </>
   )
}

export default ProfilePage

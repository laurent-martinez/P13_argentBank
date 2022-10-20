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

/**
 * component for the profile page
 * @component
 * @returns {JSX.Element}
 */
const ProfilePage = () => {
   const dispatch = useDispatch()
   const { token } = useSelector((state) => state.login)
   const { editMode } = useSelector((state) => state.user)

   /**
    * reset the state of editMode to initial value (useful after visiting transactions page)
    * @hooks useEffect
    */
   useEffect(() => {
      dispatch(getEditMode(false))
   }, [dispatch])

   /**
    * array of values for transactions page, wiil be replace with dynamic values later
    * @array
    */
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
   /**
    * calling the useInfos function who deal with the api & dispatching userFirstName, userLastName
    */
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
         {/* change style if editMode */}
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

import Account from '../../Components/Account'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import './profilePage.scss'

const ProfilePage = () => {
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

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../../Components/Footer'
import Nav from '../../Components/Nav'
import { getEditMode } from '../../redux/userData.slice'
import './transactions.scss'

/**
 * transactions page
 * @component
 * @returns {JSX.Element}
 */
const Transactions = () => {
   const dispatch = useDispatch()
   /**
    * change the editMode state to adapt style
    * @hooks useEffect
    */
   useEffect(() => {
      dispatch(getEditMode(true))
   }, [dispatch])

   return (
      <div>
         <Nav />
         <main className="main edit-style">
            <section className="transaction--hero">
               <h3 className="account-title">Argent Bank Checking (x8349)</h3>
               <p className="account-amount">$2,082.79</p>
               <p className="account-amount-description">Available Balance</p>
            </section>
            <section className="transactions">
               <div className="transactions__info">
                  <p>Date</p>
                  <p>Description</p>
                  <p>Amount</p>
                  <p>Balance</p>
               </div>
               <div className="transactions__items">
                  <p>June 20th, 2020</p>
                  <p>Golden sun bakery</p>
                  <p>$ 5.00</p>
                  <p>$ 2,082.79</p>
               </div>
               <div className="transactions__items">
                  <p>June 20th, 2020</p>
                  <p>Golden sun bakery</p>
                  <p>$ 10.00</p>
                  <p>$ 2,087.79</p>
               </div>
               <div className="transactions__items">
                  <p>June 20th, 2020</p>
                  <p>Golden sun bakery</p>
                  <p>$ 20.00</p>
                  <p>$ 2,097.79</p>
               </div>
               <div className="transactions__items">
                  <p>June 20th, 2020</p>
                  <p>Golden sun bakery</p>
                  <p>$ 30.00</p>
                  <p>$ 2,117.79</p>
               </div>
               <div className="transactions__items">
                  <p>June 20th, 2020</p>
                  <p>Golden sun bakery</p>
                  <p>$ 40.00</p>
                  <p>$ 2,147.79</p>
               </div>
            </section>
         </main>
         <Footer />
      </div>
   )
}

export default Transactions

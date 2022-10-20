import { Link } from 'react-router-dom'
import './Account.scss'
import { PropTypes } from 'prop-types'

/** account component who will change through props
 * @component
 * @param {string} title
 * @param {number} amount
 * @param {string} amountDescription
 * @returns {JSX.Element}
 */
const Account = ({ title, amount, amountDescription }) => {
   return (
      <section className="account">
         <div className="account-content-wrapper">
            <h3 className="account-title">{title}</h3>
            <p className="account-amount">${amount}</p>
            <p className="account-amount-description">{amountDescription}</p>
         </div>
         <div className="account-content-wrapper cta">
            <Link to="/transactions" className="transactions--page--link">
               <button className="transaction-button">View transactions</button>
            </Link>
         </div>
      </section>
   )
}

Account.propTypes = {
   title: PropTypes.string.isRequired,
   amount: PropTypes.number.isRequired,
   amountDescription: PropTypes.string.isRequired,
}
export default Account

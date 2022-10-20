import './Feature.scss'
import { PropTypes } from 'prop-types'
/**
 * Feature element of landing page
 * @component
 * @param {string} src
 * @param {string} title
 * @param {string} text
 * @returns {JSX.Element}
 */
const Feature = ({ src, title, text }) => {
   return (
      <div className="feature-item">
         <img src={src} alt="Chat Icon" className="feature-icon" />
         <h3 className="feature-item-title">{title}</h3>
         <p>{text}</p>
      </div>
   )
}

Feature.prototype = {
   src: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
}

export default Feature

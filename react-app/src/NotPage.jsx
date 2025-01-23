/* eslint-disable react/prop-types */
import { FaExclamationTriangle } from "react-icons/fa"
import './NotPage.css'

const NotPage = ({ BodyStyling }) => {

  const bodyStyleObject = {
    'background-color': 'crimson'
  }

  BodyStyling(bodyStyleObject);

  return (
    <>
      <div className="not-found-page">
        <FaExclamationTriangle size={200} color="yellow"/>
        <h1 style={{
          fontSize: '70px'
        }}>404 - Page Not found</h1>
      </div>
    </>
  )
}

export default NotPage
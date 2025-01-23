/* eslint-disable react/prop-types */
import { useState } from 'react';
import './LoginCard.css'
import { FaSignInAlt, FaUser, FaLock, FaEyeSlash } from 'react-icons/fa'

function LoginCard({ BodyStyling }) {
  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    inputType: 'password'
  }
);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  
  const bodyStyleObject = {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to bottom, aqua, white)',
    overflow: 'hidden',
  }

  BodyStyling(bodyStyleObject);

  const showHumanReadablePassword = () => { 
    passwordVisibility.showPassword ? setPasswordVisibility({
      showPassword: false,
      inputType: 'text'
    }) : setPasswordVisibility({
      showPassword: true,
      inputType: 'password'
    })
  }

  const handleSubmit = (event) => { 
    event.preventDefault();
    console.log({ "Credentials": credentials })
  }

  const handleChange = (event) => { 
    setCredentials((prevCredentials) => ({ ...prevCredentials, [event.target.name]: event.target.value}));
  }

  return (
    <>
      <div className="login-card">
        <div className="login-logo">
          <FaSignInAlt size={50} />
        </div>
        <div className='login-text'>
          <h1>Sign in with email</h1>
          <p>login to access the dashboard</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <FaUser size={30} style={{
              position: 'relative',
              top: '38',
              right: '130',
              opacity: '60%'
            }} />
            <input autoFocus
              id="username"
              name='username'
              type="text"
              placeholder="Username"
              required
              autoComplete='username' 
              onChange={handleChange}
              />
          </div>
          <div>
            <FaLock size={30} style={{
            position: 'relative',
            top: '38',
            right: '130',
            opacity: '60%'
          }} />
            <input autoFocus
              id="password"
              name='password'
              type={passwordVisibility.inputType}
              placeholder="Password"
              required 
              onChange={handleChange}
              />
            <FaEyeSlash size={30} style={{
              position: 'relative',
              bottom: '36',
              left: '130',
              opacity: '60%'
            }} onClick={showHumanReadablePassword}/>
          </div>
          <div className='forgot-password'>
            <a href=''>Forgot Password?</a>
          </div>
          <button type="submit" aria-label="Submit Credentials">Login</button>
        </form>
      </div>
    </>
  )
}

export default LoginCard

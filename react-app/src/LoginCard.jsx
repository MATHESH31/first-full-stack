/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaSignInAlt, FaUser, FaLock, FaEyeSlash } from 'react-icons/fa'
import './LoginCard.css'
import { useNavigate } from 'react-router-dom';

function LoginCard({ BodyStyling }) {
  const [error, setError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    inputType: 'password'
  }
);
const [credentials, setCredentials] = useState({
  username: '',
  password: ''
})
const navigate = useNavigate();
  
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

  const handleSubmit = async (event) => { 
    event.preventDefault();
    
    await fetch('http://localhost:4000/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }
    ).then(res => {
      if (res.ok) {
        res.json().then(data => {
          const { token } = data;
          localStorage.setItem('token', token);
          navigate('/dashboard')
        });
      }
      else {
        res.json().then(data => {
          const { message } = data;
          console.log(data);
          setError(message)
        });
      }
    })
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
          <p style={{
            marginTop: '-3%',
            marginBottom: '9%',
            color: 'red'
          }}> {error ? error : null}</p>
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

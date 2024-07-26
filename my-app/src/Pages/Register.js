import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';



import { FcGoogle } from "react-icons/fc";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useTheme } from '../theme/useTheme';



const Register = () => {
  const [conformPassword, setConformPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { isDarkMode } = useTheme();

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((res) => {
      toast.success('Sign-up successful.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 3000)
    })
      .catch((err) => {

        toast.error('Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: isDarkMode ? "dark" : "light",
        });



      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(password === conformPassword)
        {
          await createUserWithEmailAndPassword(auth, email, password);
          toast.success('Sign-up successful.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? "dark" : "light",
          });
  
  
        setTimeout(() => {
          window.location.href = '/sign-in';
        }, 3000)
        }
        else
        {
          toast.error('Password not match.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? "dark" : "light",
          });

        }
    
     
     

    } catch (error) {
   
      toast.error('Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };




  return (
    <div className="register-container gradient-background">

      <form className="register-form" onSubmit={handleSubmit}>
        <p className='form-title'>Register</p>


        <label className="register-label">

          <input
            className="register-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </label>

        <label className="register-label">

          <input
            className="register-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>

        <label className="register-label">

          <input
            className="register-input"
            type="password"
            value={conformPassword}
            onChange={(e) => setConformPassword(e.target.value)}
            required
            placeholder='Conform Password'
          />
        </label>

        <div className='btn-container'>
          <button className="register-button btn" type="submit">Register</button>
          <span className='form-text'>Don't have an account? </span><Link to="/sign-in" className="signin-link form-text">Sign in</Link>

          <button className="signin-with-google-button btn" onClick={googleLogin}><FcGoogle /> Sign up with Google</button>
        </div>

      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;

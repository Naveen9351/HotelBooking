import { useState} from 'react';

import { Link } from 'react-router-dom';

//firebase auth or google se signin
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { getDatabase, ref, push, set } from 'firebase/database';

import { FcGoogle } from "react-icons/fc";

// toaster notification k liye
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//context api dark or light mode k liye
import { useTheme } from '../theme/useTheme';


const SignIn = () => {

  // to find is dark mode or light mode
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //google dwara login
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((res) => {


      toast.success('Login Successfuly', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
      });

      // login k baad m sidha home page p
      setTimeout(() => {
        window.location.href = '/';
      }, 3000)

    })
      .catch((err) => {
        console.log(err);

        toast.error(err, {
          position: "top-right",
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

  // email or password dwara login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login Successfuly', {
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

    } catch (error) {

        toast.error('Login Unsuccessful', {
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


  // fatch firebase

  const db = getDatabase();
  const setData = async () => {
    if (db) {
      try {
        const newDataRef = push(ref(db, 'login'));
        const newKey = newDataRef.key;
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        await set(ref(db, `login/${newKey}`), {
          UserID: newKey,
          Email: email,
          Password: password,
          Date: currentDate,
          Time: currentTime
        });
        console.log("Data added successfully");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    } else {
      console.error("Database not available");
    }
  };



  const handleFormSubmit = (event) => {
    handleSubmit(event);
    setData();
  };

  return (
    <div className="signin-container gradient-background">

      <form className="signin-form" onSubmit={handleFormSubmit}>
        <p className='form-title'>Login</p>
        <label className="signin-label">

          <input
            className="signin-input form-text"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </label>

        <label className="signin-label">

          <input
            className="signin-input form-text"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        <p className='form-text forget' onClick={googleLogin}>Forget password?</p>


        <button type="submit" className="signin-button btn" >Login</button>
        <span className='form-text'>Don't have an account? </span><Link to="/register" className="signin-link form-text">Sign up</Link>


        <div className='or-section'>
          <hr className='or-hr' />
          <div className='or-text'>or</div>

        </div>
        <button className="signin-with-google-button btn" onClick={googleLogin}><FcGoogle /> Sign in with Google</button>


      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;

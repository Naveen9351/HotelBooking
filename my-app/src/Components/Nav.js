import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { FaBed, FaCar, FaInfoCircle, FaMoon, FaSun } from "react-icons/fa";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { MdAttractions } from "react-icons/md";
import { RiMessage3Fill, RiAdminFill, RiLogoutBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import logo from '../logos/logo.png';
import { useTheme } from "../theme/useTheme";
import { auth } from '../firebase';

const Nav = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  //for scroll hide nav
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);




  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setIsAdmin(user.email === 'naveen935186@gmail.com' || user.email === 'naveen@gmail.com');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signout = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then(result => {
      if (result.isConfirmed) {
        auth.signOut().then(() => {
          Swal.fire({
            title: "Logout!",
            text: "Confirm logout",
            icon: "success"
          });
          toast.success('Log out successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? "dark" : "light",
          });
          toggleDropdown();
        }).catch(error => {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? "dark" : "light",
          });
        });
      }
    });
  };

  return (
    <nav className={`nav ${isDarkMode ? 'dark' : 'light'} ${visible ? '' : 'hidden'}`}>

      <div className="logo-section">
        <img src={logo} alt="logo" />
        <div className="logo-text">YatraYojana</div>
      </div>


      <div className="dropdown-container">

        {isOpen ? null : <button onClick={toggleDropdown} className="dropdown-button"><RxHamburgerMenu /> </button>}

        <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
          <div className='drop'>

            <button onClick={toggleDropdown} className="dropdown-button"><RxCross2 /></button>

            <div onClick={toggleDropdown} className='drop-link'>
              <NavLink className='link-text' to="/" activeClassName="active">
                <div className="links-section">
                  <FaBed />
                  <div className="links-text">Stays</div>
                </div>
              </NavLink>
            </div>
            <div onClick={toggleDropdown} className='drop-link'>
              <NavLink className='link-text' to="/flight" activeClassName="active">
                <div className="links-section">
                  <PiAirplaneTiltFill />
                  <div className="links-text">Flight</div>
                </div>
              </NavLink>
            </div>
            <div onClick={toggleDropdown} className='drop-link'>
              <NavLink className='link-text' to="/car-rentals" activeClassName="active">
                <div className="links-section">
                  <FaCar />
                  <div className="links-text">Car Rentals</div>
                </div>
              </NavLink>
            </div>
            <div onClick={toggleDropdown} className='drop-link'>
              <NavLink className='link-text' to="/attraction" activeClassName="active">
                <div className="links-section">
                  <MdAttractions />
                  <div className="links-text">Attraction</div>
                </div>
              </NavLink>
            </div>
            <div onClick={toggleDropdown} className='drop-link'>
              <NavLink className='link-text' to="/contact" activeClassName="active">
                <div className="links-section">
                  <RiMessage3Fill />
                  <div className="links-text">Contact</div>
                </div>
              </NavLink>
            </div>
            <div onClick={toggleDropdown} className='drop-link'>
              <NavLink className='link-text' to="/about" activeClassName="active">
                <div className="links-section">
                  <FaInfoCircle />
                  <div className="links-text">About</div>
                </div>
              </NavLink>
            </div>
            {isAdmin && (
              <div onClick={toggleDropdown} className='drop-link'>
                <NavLink className='link-text' to="/admin" activeClassName="active">
                  <div className="links-section">
                    <RiAdminFill />
                    <div className="links-text">Admin</div>
                  </div>
                </NavLink>
              </div>
            )}
            {user === null ? (
              <div onClick={toggleDropdown} className='drop-link'>
                <NavLink className='link-text' to="/sign-in" activeClassName="active">
                  <div className="links-section">
                    <RiLogoutBoxRLine />
                    <div className="links-text">Login</div>
                  </div>
                </NavLink>
              </div>
            ) : (
              <div onClick={signout} className='drop-link'>
                <NavLink className="link-text" to="/sign-in" activeClassName="active">
                  <div className="links-section">
                    <RiLogoutBoxLine />
                    <div className="links-text">Logout</div>
                  </div>
                </NavLink>
              </div>
            )}
            <div className='dark-mode-container' onClick={toggleTheme}>
              {isDarkMode ? <FaMoon /> : <FaSun />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

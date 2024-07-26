// toaster notification k liye
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect ,useCallback } from 'react';


import { getDatabase, ref, onValue, remove } from 'firebase/database';

import { MdDelete } from "react-icons/md";


import { FaBed } from "react-icons/fa";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { MdAttractions } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { MdOutlinePayments } from "react-icons/md";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


import { useTheme } from '../theme/useTheme';
import FlightForm from './FlightForm';
import HotelForm from './HotelForm';
import CarsForm from './CarForm';
import AttractionForm from './AttractionForm';

import Swal from 'sweetalert2';

const AdminPanel = () => {

  const { isDarkMode } = useTheme();

  // Read data from database
  const database = getDatabase();




  const [ArrayContect, setArrayContect] = useState([]);
  const [ArraySignin, setArraySignin] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [flight, setFlight] = useState([]);
  const [car, setCar] = useState([]);
  const [att, setAtt] = useState([]);
  const [pay, setPay] = useState([]);

  const fetchDataFromDatabase = useCallback(async (path, setter) => {
    const Ref = ref(database, path);
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      setter(data ? Object.values(data) : []);
    });
  }, [database]);

  useEffect(() => {
    fetchDataFromDatabase('/contact', setArrayContect);
    fetchDataFromDatabase('/login', setArraySignin);
    fetchDataFromDatabase('/hotels', setHotel);
    fetchDataFromDatabase('/flight', setFlight);
    fetchDataFromDatabase('/cars', setCar);
    fetchDataFromDatabase('/attraction', setAtt);
    fetchDataFromDatabase('/payment', setPay);
  }, [fetchDataFromDatabase]); 


  // Delete Data

  const deleteData = (nodePath) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      customClass: {
        popup: 'custom-swal'
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        remove(ref(database, nodePath))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success"
            });
            toast.success('Data successfully deleted.', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: isDarkMode ? "dark" : "light",
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-center",
              autoClose: 5000,
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
  















  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow(prevState => !prevState);
  };





  const [selectedSection, setSelectedSection] = useState('hotels');

  const handleItemClick = (sectionId) => {
    setSelectedSection(sectionId);
  };





  return (
    <div className='admin-panel'>
      <h1 className='admin-panel-heading'>Admin Panel</h1>

      <div className='admin-panel-main'>

        <section className='admin-panel-main-first' style={{
          width: isShow ? '15rem' : '4rem',
          transition: 'width 0.1s ease'
        }}>
          <button className='admin-panel-main-first-btn' onClick={toggleShow}>
            {isShow ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
          <ul>
            <li onClick={() => handleItemClick('hotels')}> {isShow ? <> <FaBed /> Hotels</> : <FaBed />} </li>
            <li onClick={() => handleItemClick('flights')}>{isShow ? <> <PiAirplaneTiltFill /> Flights</> : <PiAirplaneTiltFill />}</li>
            <li onClick={() => handleItemClick('car-rent')}>{isShow ? <> <FaCar />Car Rent</> : <FaCar />} </li>
            <li onClick={() => handleItemClick('attractions')}>{isShow ? <> <MdAttractions /> Attractions</> : <MdAttractions />} </li>
            <li onClick={() => handleItemClick('contact')}> {isShow ? <> <IoMdContact /> Contact</> : <IoMdContact />}</li>
            <li onClick={() => handleItemClick('login')}>{isShow ? <> <GrLogin /> LogIn</> : <GrLogin />} </li>
            <li onClick={() => handleItemClick('payment')}> {isShow ? <> <MdOutlinePayments /> Payment</> : <MdOutlinePayments />} </li>
          </ul>
        </section>




        <section className='admin-panel-main-second'>

          {/* Contect */}
          <div style={{ display: selectedSection === 'contact' ? 'block' : 'none' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  ArrayContect.map((e, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{e.Name}</td>
                      <td>{e.Email}</td>
                      <td>{e.Message}</td>
                      <td> <button className='btn delete-btn' onClick={() => deleteData(`/contact/${e.Name}`)}>Delete <MdDelete /></button></td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>




          {/* Login */}

          <div style={{ display: selectedSection === 'login' ? 'block' : 'none' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  ArraySignin.map((e) => (
                    <tr>
                      <td>{e.Email}</td>
                      <td>{e.Password}</td>
                      <td>{e.Date}</td>
                      <td>{e.Time}</td>
                      <td> <button className='btn delete-btn' onClick={() => deleteData(`/login/${e.UserID}`)}>Delete <MdDelete /></button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>



          {/* Hotel */}

          <div style={{ display: selectedSection === 'hotels' ? 'block' : 'none' }}>





            <div className='admin-panel-hotel'>

              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Hotel Name</th>
                    <th>City</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    hotel.map((e) => (
                      <tr>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.city}</td>
                        <td>{e.price}₹</td>
                        <td> <button className='btn delete-btn' onClick={() => deleteData(`/hotels/${e.id - 1}`)}>Delete <MdDelete /></button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <HotelForm />

            </div>


          </div>

          {/* Flight */}
          <div style={{ display: selectedSection === 'flights' ? 'block' : 'none' }}>



            <table className="table">
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  flight.map((e, index) => (
                    <tr key={index}>
                      <td>{e.id}</td>
                      <td>{e.ArrivingCity} | {e.ArrivingTime}</td>
                      <td>{e.DepartingCity} | {e.DepartingTime}</td>
                      <td>{e.Duration}</td>
                      <td>{e.Price}</td>
                      <td> <button className='btn delete-btn' onClick={() => deleteData(`/flight/${e.id - 1}`)}>Delete <MdDelete /></button></td>

                    </tr>
                  ))
                }
              </tbody>
            </table>

            <FlightForm />
          </div>


          {/* car */}
          <div style={{ display: selectedSection === 'car-rent' ? 'block' : 'none' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Car ID</th>
                  <th>Mode</th>
                  <th>Type & Seates</th>
                  <th>City</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  car.map((e, index) => (
                    <tr key={index}>
                      <td>{e.id}</td>
                      <td>{e.car_model}</td>
                      <td>{e.type} | {e.seats}</td>
                      <td>{e.location}</td>
                      <td>{e.price_per_day}</td>
                      <td> <button className='btn delete-btn' onClick={() => deleteData(`/cars/${e.id - 1}`)}>Delete <MdDelete /></button></td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
            <CarsForm />

          </div>



          {/* Attraction */}
          <div style={{ display: selectedSection === 'attractions' ? 'block' : 'none' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  att.map((e, index) => (
                    <tr key={index}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.city}</td>
                      <td> <button className='btn delete-btn' onClick={() => deleteData(`/attraction/${e.id - 1}`)}>Delete <MdDelete /></button></td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
            <AttractionForm />

          </div>


           {/* Payment */}
           <div style={{ display: selectedSection === 'payment' ? 'block' : 'none' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Section</th>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Price</th>
                  <th>Card No.</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  pay.map((e, index) => (
                    <tr key={index}>
                    <td>{e.no}</td>
                      <td>{e.id}-{e.hotelid}</td>
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td>{e.email}</td>
                      <td>{e.amount}</td>
                      <td>{e.cardnumber}</td>
                      <td> <button className='btn delete-btn' onClick={() => deleteData(`/payment/${e.no - 1}`)}>Delete <MdDelete /></button></td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
      

          </div>






        </section>



      </div >
      <ToastContainer />
    </div >
  );
};

export default AdminPanel;


import React, { useEffect, useState, useCallback } from 'react';

import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { FaCloud, FaWind, FaBomb, FaSun, FaMoon } from 'react-icons/fa';
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { Link } from 'react-router-dom';

//toaster for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//context api
import { useTheme } from "../theme/useTheme";

import { getDatabase, ref,  update, get , onValue } from 'firebase/database';
// firebase for data
import Swal from 'sweetalert2';

import HotelService from './HotelService';
import HotelCard from './HotelCard';

function HotelDetails() {

    const { isDarkMode } = useTheme();

    //  dynamicly url se parameters lene k liye
    const { id } = useParams();
    const idNumber = parseInt(id, 10);




    const [hotelArray, setHotelArray] = useState([]);
    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);


    //firebase se data retrive kerna
    useEffect(() => {


        const fetchHotelData = async () => {
            const db = getDatabase();
            const hotelsRef = ref(db, '/hotels');

            try {
                const snapshot = await new Promise((resolve, reject) => {
                    onValue(hotelsRef, resolve, reject);
                });

                const data = snapshot.val();
                if (data) {
                    setHotelArray(data);
                } else {
                    setHotelArray([]);
                }

                setLoading(false);

            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchHotelData();
    }, []);





    // us id wale hotel ko find kerna
    const [suggestHotels, setSuggestHotels] = useState([]);
    useEffect(() => {
        if (hotelArray && idNumber) {
            const selectedHotel = hotelArray.find((hotel, index) => index + 1 === idNumber);
            if (selectedHotel) {
                setHotel(selectedHotel);

                if (selectedHotel) {
                    const suggestions = hotelArray.filter((e, index) =>
                        e.city === selectedHotel.city && index + 1 !== idNumber
                    );
                    setSuggestHotels(suggestions);
                }
            }

        }
    }, [idNumber, hotelArray]);




    //Weather api


    const [weatherData, setWeatherData] = useState({
        cloud_pct: 0,
        feels_like: 0,
        humidity: 0,
        max_temp: 0,
        min_temp: 0,
        sunrise: 0,
        sunset: 0,
        temp: 0,
        wind_degrees: 0,
        wind_speed: 0
    });

    const getWeather = useCallback(async (city) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7bcbfcac93msh7528585ed24f943p14f8d7jsn1dec83df5a8f',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options);
            const data = await response.json();

            if (data.temp === undefined) {
                console.warn(`No temperature data for ${city}, fetching weather for Jaipur instead.`);
                await getWeather("Jaipur");
            } else {
                setWeatherData({
                    cloud_pct: data.cloud_pct,
                    feels_like: data.feels_like,
                    humidity: data.humidity,
                    max_temp: data.max_temp,
                    min_temp: data.min_temp,
                    sunrise: data.sunrise,
                    sunset: data.sunset,
                    temp: data.temp,
                    wind_degrees: data.wind_degrees,
                    wind_speed: data.wind_speed
                });
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (hotel.city) {
                await getWeather(hotel.city);
            }
        };
        fetchWeather();
    }, [hotel.city, getWeather]);


    // Payment ki JS

    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0];
    const maxDateFormatted = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds
    const maxDate = maxDateFormatted.toISOString().split('T')[0];

    const [showPay, setShowPay] = useState(false);

    const showPayBtn = () => {
        if (showPay === false) {
            setShowPay(true);
        }

    }

    const crossPayBtn = () => {
        if (showPay === true) {
            setShowPay(false);
        }

    }

    const [formData, setFormData] = useState({
        id: 'Hotel',
        hotelid: hotel.id,
        firstName: '',
        lastName: '',
        email: '',
        datefrom: '',
        dateto: '',
        cardnumber: '',
        password: '',
        amount: hotel.price
    });


    useEffect(() => {
        setFormData({
            id: 'Hotel',
            hotelid: hotel.id,
            firstName: '',
            lastName: '',
            email: '',
            datefrom: '',
            dateto: '',
            cardnumber: '',
            password: '',
            amount: hotel.price
        });
    }, [hotel]);

    const db = getDatabase();


    const setData = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Edit it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Edited!",
                    text: "Your file has been edited.",
                    icon: "success"
                });

                try {
                    const Ref = ref(db, 'payment');
                    const snapshot = await get(Ref);
                    const maxId = Math.max(...Object.keys(snapshot.val() || {}).map(key => parseInt(key))) || 0;
                    const newId = maxId + 1;

                    await update(ref(db, `payment/${newId}`), {
                        no: newId,
                        id: 'Hotel',
                        hotelid: hotel.id,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        datefrom: formData.datefrom,
                        dateto: formData.dateto,
                        cardnumber: formData.cardnumber,
                        password: formData.password,
                        amount: hotel.price
                    });

                    toast.success('Payment Received', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: isDarkMode ? "dark" : "light",
                    });

                } catch (error) {
                    console.error("Error adding data:", error);

                    toast.error('Error receiving payment', {
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
            }
        });
    };
        const handleChange = (e) => {
            const { name, value } = e.target;

            if (name === 'datefrom' || name === 'dateto') {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: new Date(value).toISOString().split('T')[0]
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        };

   

        // Carousel JS

        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        const nextSlide = () => {
            if (hotel && hotel.photos && hotel.photos.length > 0) {
                setCurrentImageIndex((currentImageIndex + 1) % hotel.photos.length);
            } else {
                setCurrentImageIndex(0);
            }
        };

        const prevSlide = () => {
            if (hotel && hotel.photos && hotel.photos.length > 0) {
                setCurrentImageIndex((currentImageIndex - 1 + hotel.photos.length) % hotel.photos.length);
            } else if (hotel && hotel.photos) {
                setCurrentImageIndex(hotel.photos.length - 1);
            }
        };

        const [imgUrl, setImgUrl] = useState("");


        //import part
        useEffect(() => {
            if (hotel.photos && hotel.photos.length > 0) {
                setImgUrl(hotel.photos[currentImageIndex]);
            }
        }, [currentImageIndex, hotel.photos]);



        //stars ko string se int and int se element m convert kerna
        const [stars, setStars] = useState([]);

        useEffect(() => {
            const numStars = parseInt(hotel.star);
            console.log(numStars);
            const newStars = [];
            for (let i = 0; i < numStars; i++) {
                newStars.push(<FaStar key={i} />);
            }
            setStars(newStars);
        }, [hotel.star]);


        if (loading) {
            return (
    
    
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
    
            );
        }

        return (

            <div className='hotel-details'>
                <div className='hotel-details-container'>
                    <div className='hotel-details-image-container'>
                        <div className="hotel-details-carousel-container">
                            <button className="prev-button" onClick={prevSlide}>
                                <MdKeyboardArrowLeft />
                            </button>
                            <img className="carousel-image" src={imgUrl} alt="" />

                            <button className="next-button" onClick={nextSlide}>
                                <MdKeyboardArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className='hotel-details-text-container'>
                        <h3 className='hotel-details-name'>{hotel.name}</h3>
                        <p className='hotel-details-dis'>{hotel.description}</p>
                        <p className='hotel-details-star'>{stars}</p>
                        <p className='hotel-details-address'><FaLocationDot /> {hotel.address}</p>
                        <p className='hotel-details-insta'><FaInstagram /> {hotel.insta}</p>
                        <p className='hotel-details-insta'>Price: {hotel.price}</p>

                        <button className='btn hotel-details-price' onClick={showPayBtn}>Book Now</button>

                    </div>
                </div>
                <div className='hotel-details-map-container'>
                    <iframe className='hotel-details-map' src={hotel.map} title={hotel.id}></iframe>
                </div>



                {
                    showPay && (<div className={`payment-model-form-container ${isDarkMode ? 'dark' : 'light'} `} >
                        <div className="payment-model-form-card">
                            <button className='payment-model-form-cross-btn' onClick={crossPayBtn}><RxCross2 /></button>
                            <h3>Payment Section</h3>


                            <form onSubmit={setData}>
                                <div className="payment-model-form-group">
                                    <label htmlFor="firstName">First Name </label>
                                    <input className='payment-model-form-name' type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='eg Naveen' required />
                                </div>


                                <div className="payment-model-form-group">
                                    <label htmlFor="lastName"> Last Name </label>
                                    <input className='payment-model-form-name' type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='eg Sharma' required />
                                </div>


                                <div className="payment-model-form-group">
                                    <label htmlFor="email">Email </label>
                                    <input className='payment-model-form-email' type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='eg xyz@gmail.com' required />
                                </div>


                                <div className="payment-model-form-group">
                                    <label htmlFor="cardnumber">Card No.:</label>
                                    <input className='payment-model-form-password' type="number" id="cardnumber" name="cardnumber" value={formData.cardnumber} onChange={handleChange} placeholder='eg 123 123 123' required />
                                </div>


                                <div className="payment-model-form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input className='payment-model-form-password' type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='eg ******' required />
                                </div>


                                <div className="payment-model-form-group">
                                    <label htmlFor="password">Date From:</label>
                                    <input className="payment-model-form-date1" type="date" min={minDate} max={maxDate} value={formData.datefrom ? formData.datefrom.split('T')[0] : ''} onChange={handleChange} name="datefrom" />
                                </div>


                                <div className="payment-model-form-group">
                                    <label htmlFor="password">Date To:</label>
                                    <input className="payment-model-form-date2" type="date" min={minDate} max={maxDate} value={formData.dateto ? formData.dateto.split('T')[0] : ''} onChange={handleChange} name="dateto" />
                                </div>



                                <button className='btn' type="submit" >PAY</button>
                            </form>
                        </div>
                        <ToastContainer />

                    </div>)

                }


                {/* Weather section */}

                <div className="hotel-details-card-cantainer">
                    <div className="hotel-details-card-body">
                        <h5 className="hotel-details-card-title">Weather Today in {hotel.city}</h5>
                        <div className="hotel-details-ct-body">
                            <div>
                                <p className="hotel-details-tem">{weatherData.temp} °c</p>
                                <p className="hotel-details-feels"> Feels Like- {weatherData.feels_like} °c</p>
                            </div>
                            <div className="hotel-details-info">
                                <div className="hotel-details-info1">
                                    <div className="hotel-details-a"><FaCloud />
                                        <p className="hotel-details-card-text"> Cloud PCT is- {weatherData.cloud_pct}</p>
                                    </div>
                                    <hr />
                                    <div className="hotel-details-a">    <FaTemperatureArrowDown />
                                        <p className="hotel-details-card-text"> Minimum Temperature-  {weatherData.min_temp} °c</p>
                                    </div>
                                    <hr />
                                    <div className="hotel-details-a">      <FaTemperatureArrowUp />
                                        <p className="hotel-details-card-text"> Maximum Temperature-   {weatherData.max_temp} °c</p>
                                    </div>
                                    <hr />
                                    <div className="hotel-details-a"> <WiHumidity />
                                        <p className="hotel-details-card-text"> Humidity-  {weatherData.humidity} %</p>
                                    </div>
                                    <hr />
                                </div>
                                <div className="hotel-details-info2">
                                    <div className="hotel-details-a"> <FaWind />
                                        <p className="hotel-details-card-text"> Wind Speed-   {weatherData.wind_speed} km/h</p>
                                    </div>
                                    <hr />
                                    <div className="hotel-details-a"> <FaBomb />
                                        <p className="hotel-details-card-text"> Wind Degree-  {weatherData.wind_degrees} °</p>
                                    </div>
                                    <hr />
                                    <div className="hotel-details-a"> <FaSun />
                                        <p className="hotel-details-card-text"> Sunrise-  {weatherData.sunrise}</p>
                                    </div>
                                    <hr />
                                    <div className="hotel-details-a"> <FaMoon />
                                        <p className="hotel-details-card-text"> Sunset-   {weatherData.sunset}</p>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HotelService />
                <h1>Suggested Hotels</h1>
                <div className="stays-card-container">
                    {
                        suggestHotels.map((hotel) => (
                            <Link to={`/${hotel.id}`}  >
                                <HotelCard key={hotel.id} hotel={hotel} />
                            </Link>
                        ))
                    }
                </div>


            </div>
        );
    }



    export default HotelDetails;



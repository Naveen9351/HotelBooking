import Hero from '../Components/Hero';
import vid from '../logos/vid2.mp4';

import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Swal from 'sweetalert2';


import { getDatabase, ref, onValue } from 'firebase/database';


function Flight() {





    //firebase data fatching
    const [Array1, setArray1] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const Ref = ref(db, '/flight');
            onValue(Ref, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setArray1(Object.values(data));
                } else {
                    setArray1([]);
                }
                setLoading(false);


            });
        };

        fetchData();
    }, []);


    // hero section ka object
    const heroObj = {
        heading: "Fly Beyond Boundaries: Your Next Adventure Awaits!",
        p: "Welcome to Fly Beyond Boundaries, your gateway to seamless travel experiences. Whether you're planning a quick getaway or a journey of a lifetime, we're here to make your flight booking experience effortless and exciting. Explore our wide range of destinations and airlines, and discover the thrill of discovering new horizons.",
        video: vid
    }


    //form section ke liye date ka filter
    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0];
    const maxDateFormatted = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds
    const maxDate = maxDateFormatted.toISOString().split('T')[0];


    // form ke liye ArrivingCity and DepartingCity ka filter
    const [cityAname, setCityAname] = useState('');
    const [cityDname, setCityDname] = useState('');
    const [searchFlight, setSearchFlight] = useState([]);

    const getAname = (val) => {
        setCityAname(val);
    };

    const getDname = (val) => {
        setCityDname(val);
    };



    const searchBtn = (el) => {
        el.preventDefault();
        const filteredFlight = Array1.filter((e) => {


            if (cityAname === '' && cityDname === '') {
                return e;
            }

            else if (e.ArrivingCity.toLowerCase().includes(cityAname.toLowerCase()) && cityDname === '') {
                return e;
            }

            else if (e.DepartingCity.toLowerCase().includes(cityDname.toLowerCase()) && cityAname === '') {
                return e;
            }

            else if (e.ArrivingCity.toLowerCase().includes(cityAname.toLowerCase()) && e.DepartingCity.toLowerCase().includes(cityDname.toLowerCase())) {
                return e;
            }
      

            return 0;


        });
        setSearchFlight(filteredFlight);
        if (filteredFlight.length === 0) {
            Swal.fire("Data is not available for this city!");
        }
    };


    if (loading) {
        return (


            <div className="loading-spinner">
          <div className="spinner"></div>
        </div>

        );
    }



    return (

        <>
            <Hero heroObj={heroObj} />



            <div className='flight-container'>
                <div className="flight-form-container">
                    <form className="flight-form" onSubmit={searchBtn}>
                        <input
                            className="flight-form-city"
                            type="text"
                            placeholder="Arriving City"
                            onChange={(e) => getAname(e.target.value)}

                        ></input>

                        <input
                            className="flight-form-city"
                            type="text"
                            placeholder="Departing City"
                            onChange={(e) => getDname(e.target.value)}

                        ></input>

                        <input className="flight-form-date" type="date" min={minDate} max={maxDate} ></input>
                        <button className="btn" type="submit" >Search</button>
                    </form>
                </div>

                {searchFlight.length > 0 ? (
                    searchFlight.map((flight) =>
                    (
                        <div className='flight-card-container'>
                            <Link to={`${flight.id}`} key={flight.id} >
                                <div className='flight-card'>
                                    <div className='flight-card-part-0'>
                                        <img className='flight-card-img' src={flight.img} alt={flight.img} />
                                        <h5>{flight.FlightName}</h5>
                                    </div>
                                    <div className='flight-card-part-1'>
                                        <h3>{flight.ArrivingTime}</h3>
                                        <p>{flight.ArrivingCity}</p>
                                    </div>
                                    <div className='flight-card-part-2'><p>{flight.Duration}</p><hr /><p>{flight.Price}₹</p></div>
                                    <div className='flight-card-part-3'>
                                        <h3>{flight.DepartingTime}</h3>
                                        <p>{flight.DepartingCity}</p>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    Array1.map((flight) =>
                    (
                        <div className='flight-card-container'>
                            <Link to={`${flight.id}`} key={flight.id} >
                                <div className='flight-card'>
                                    <div className='flight-card-part-0'>
                                        <img className='flight-card-img' src={flight.img} alt={flight.img} />
                                        <h5>{flight.FlightName}</h5>
                                    </div>
                                    <div className='flight-card-part-1'>
                                        <h3>{flight.ArrivingTime}</h3>
                                        <p>{flight.ArrivingCity}</p>
                                    </div>
                                    <div className='flight-card-part-2'><p>{flight.Duration}</p><hr /><p>{flight.Price}₹</p></div>
                                    <div className='flight-card-part-3'>
                                        <h3>{flight.DepartingTime}</h3>
                                        <p>{flight.DepartingCity}</p>
                                    </div>

                                </div>
                            </Link>
                        </div>

                    ))
                )}



            </div>
            <ToastContainer />
        </>
    );
}

export default Flight;
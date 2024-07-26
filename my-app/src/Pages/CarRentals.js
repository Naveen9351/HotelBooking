import { useState, useEffect } from "react";
import Hero from "../Components/Hero";
import vid from '../logos/vid3.mp4';


import { Link } from "react-router-dom";

import { MdLocalOffer } from "react-icons/md";
import { MdOnlinePrediction } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
import { TbRoadOff } from "react-icons/tb";
import { MdMyLocation } from "react-icons/md";

import { getDatabase, ref, onValue } from 'firebase/database';
import Swal from 'sweetalert2';


const CarRentals = () => {

    const [selectkey, setSelectkey] = useState(1);
    const handleHotelClick = (id) => {
        setSelectkey(id);
        console.log(selectkey)
    };

    const heroObj = {
        heading: "Hit the Road in Style: Your Ultimate Car Rental Destination!",
        p: "Welcome to Hit the Road, where your dream road trip is just a click away. Discover the freedom of the open road with our wide range of rental cars, from sleek city cruisers to rugged off-road adventurers. With Hit the Road, booking your rental car is easy and hassle-free. Choose your destination, select your dates.",
        video: vid
    }


    const [cityname, setCityname] = useState('');
    const [searchCars, setSearchCars] = useState([]);
    const [loading, setLoading] = useState(true);


    const [Array1, setArray1] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const hotelsRef = ref(db, '/cars');
            onValue(hotelsRef, (snapshot) => {
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




    const getname = (val) => {
        setCityname(val);
    };


    const searchBtn = (el) => {
        el.preventDefault();
        const filteredCars = Array1.filter((e) => {
            if (cityname === '') {
                return true;
            } else if (e.location.toLowerCase().includes(cityname.toLowerCase())) {
                return true;
            }
     
            return false;

        });
        setSearchCars(filteredCars);
        if (filteredCars.length === 0) {
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

            <div className="stay-form-container">
                <form className="stay-form" onSubmit={searchBtn}>
                    <input
                        className="stay-form-city"
                        type="search"
                        placeholder="City Name"
                        onChange={(e) => getname(e.target.value)}
                    ></input>





                    <button className="btn" type="submit" >Search</button>
                </form>
            </div>
            <div className="car-rent-section">
                {searchCars.length > 0 ? (
                    searchCars.map((car) => (
                        <Link to={`/car-rentals/${car.id}`} key={car.id} onClick={() => handleHotelClick(car.id)}>
                            <div className="car-rent-card">
                                <img className="car-rent-card-img" src={car.photo} alt={car.photo} />
                                <h3>{car.car_model}</h3>

                                <p><b><MdMyLocation /> {car.location}</b></p>

                                <button className="car-rent-card-btn btn">{car.price_per_day} ₹</button>
                            </div>
                        </Link>
                    )

                    )) : (
                    Array1.map((car) =>
                    (
                        <Link to={`${car.id}`} key={car.id} onClick={() => handleHotelClick(car.id)}>
                            <div className="car-rent-card">
                                <img className="car-rent-card-img" src={car.photo} alt={car.photo} />
                                <h3>{car.car_model}</h3>

                                <p><b><MdMyLocation />  {car.location}</b></p>
                                <button className="car-rent-card-btn btn">{car.price_per_day} ₹</button>

                            </div>
                        </Link>
                    )
                    ))
                }




            </div>

            <div className="car-rent-sevice-section">
                <div className="car-rent-sevice-card">
                    <h2><MdLocalOffer /> Special rates on booking</h2>
                    <p>Special rates on booking are a fantastic way to attract customers and boost bookings. Offering discounts or exclusive deals for a limited time or to specific customer segments can create a sense of urgency and increase the perceived value of your services. </p>
                </div>

                <div className="car-rent-sevice-card">
                    <h2><MdOnlinePrediction /> Online Reservation</h2>
                    <p> online reservation systems streamline the booking process, reduce the risk of overbooking, and provide valuable data for analyzing booking patterns and customer behavior. They also enhance customer experience by offering convenience, flexibility.</p>
                </div>

                <div className="car-rent-sevice-card">
                    <h2><RiRoadMapFill /> Unlimited Miles Car Rental</h2>
                    <p>Unlimited miles car rental is a popular option for travelers who plan to cover long distances without worrying about additional charges for exceeding mileage limits. This type of rental allows customers to drive the rental car as much as they want within the rental period. </p>
                </div>

                <div className="car-rent-sevice-card">
                    <h2><TbRoadOff /> One way Car Rentals</h2>
                    <p>One-way car rentals allow customers to pick up a rental car at one location and return it to a different location, providing flexibility for travelers who do not want to return to their original starting point. This option is popular among travelers planning road trips. </p>
                </div>

            </div>
        </>

    )
};

export default CarRentals;
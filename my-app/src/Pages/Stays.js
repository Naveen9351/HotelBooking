// components
import HotelCard from "../Components/HotelCard";
import Hero from "../Components/Hero";
import HotelService from "../Components/HotelService";

//link
import { Link } from 'react-router-dom';

//hero video
import vid from '../logos/vid1.mp4';

//banner
import b1 from '../banner-images/b1.jpg';
import b2 from '../banner-images/b2.jpg';
import b3 from '../banner-images/b3.jpg';
import b4 from '../banner-images/b4.jpg';

import React, { useState, useEffect } from 'react';

//firebase
import { getDatabase, ref, onValue } from 'firebase/database';

//icons
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import Swal from 'sweetalert2';


function Stays() {

    // firebase data retriveing 
    const [hotelArray, setHotelArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotelData = async () => {
            const db = getDatabase();
            const hotelsRef = ref(db, '/hotels');
            onValue(hotelsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setHotelArray(Object.values(data));
                } else {
                    setHotelArray([]);
                }
                setLoading(false);
            });
        };

        fetchHotelData();
    }, []);





    // hero object
    const heroObj = {
        heading: ' Discover Your Next Adventure: Explore The World with Us! ',
        p: 'Embark on a journey of discovery with Explore The World. We invite you to wander beyond familiar horizons, to seek out the beauty of diverse cultures, landscapes, and traditions that make our world so rich and fascinating. Exploration isnt just about visiting new places; its about opening our minds to new perspectives and possibilities.',
        video: vid
    }


    //date filtering/restriction
    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0];
    const maxDateFormatted = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds
    const maxDate = maxDateFormatted.toISOString().split('T')[0];



    //to sending key/id of hotel
   
    //to fitering by city name or hotel name
    const [cityname, setCityname] = useState('');
    const [searchHotels, setSearchHotels] = useState([]);






    const getname = (val) => {
        setCityname(val);
    };


    //find hotel by name and city name
    const searchBtn = (el) => {
        el.preventDefault();
        const filteredHotels = hotelArray.filter((e) => {
            if (cityname === '') {
                return true;
            } else if (e.city.toLowerCase().includes(cityname.toLowerCase())) {
                return true;
            } else if (e.name.toLowerCase().includes(cityname.toLowerCase())) {
                return true;
            }
        });
    
        setSearchHotels(filteredHotels);
    
        
        if (filteredHotels.length === 0) {
            Swal.fire("Data is not available for this city!");
        }
    };
    




    // Carousel JS

    const images = [b1, b2, b3, b4]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
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

            {/* form */}
            <div className="stay-form-container">
                <form className="stay-form" onSubmit={searchBtn}>
                    <input
                        className="stay-form-city"
                        type="text"
                        placeholder="City Name"
                        onChange={(e) => getname(e.target.value)}
                    ></input>
                    <input
                        className="stay-form-rooms"
                        type="number"
                        placeholder="Rooms"
                        min="1"
                        max="10"

                    ></input>
                    <input className="stay-form-date" type="date" min={minDate} max={maxDate} ></input>
                    <input className="stay-form-date" type="date" min={minDate} max={maxDate} ></input>
                    <button className="btn" type="submit" >Search</button>
                </form>
            </div>


            {/* hotel filtering */}
            <div className="stays-card-container">
                {searchHotels.length > 0 ? (
                    searchHotels.map((hotel) => (
                        <Link to={`/${hotel.id}`} key={hotel.id} >
                            <HotelCard key={hotel.id} hotel={hotel} />
                        </Link>
                    ))
                ) : (
                    hotelArray.map((hotel) => (
                        <Link to={`/${hotel.id}`} key={hotel.id} >
                            <HotelCard key={hotel.id} hotel={hotel} />
                        </Link>
                    ))
                )}
            </div>

            {/* banner */}
            <div className="hotel-carousel-container">
                <button className="prev-button" onClick={prevSlide}>
                    <MdKeyboardArrowLeft />
                </button>
                <img className="carousel-image" src={images[currentImageIndex]} alt="" />
                <button className="next-button" onClick={nextSlide}>
                    <MdKeyboardArrowRight />
                </button>
            </div>

            <HotelService />

        </>
    );
}

export default Stays;

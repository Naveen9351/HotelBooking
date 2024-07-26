import React from 'react'
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import { useState, useEffect } from 'react';


import { LuClipboardType } from "react-icons/lu";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";

export default function CarRentalsDetails() {

    const { id } = useParams();
    const idNumber = parseInt(id, 10);


    //firebase data fatching
    const [Array1, setArray1] = useState([]);
    const [car, setCar] = useState([]);
    const [suggestCar, setSuggestCar] = useState([]);



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
            });
        };

        fetchData();
    }, []);




    // us id wale hotel ko find kerna

    useEffect(() => {
        if (Array1.length > 0 && idNumber) {
            const selectedCar = Array1.find((_, index) => index + 1 === idNumber);
            if (selectedCar) {
                setCar(selectedCar);
                const suggestions = Array1.filter((car, index) =>
                    car.location === selectedCar.location && index + 1 !== idNumber
                );
                setSuggestCar(suggestions);
            }
        }
    }, [idNumber, Array1]);





    return (
        <div className='car-detail-container'>
            <div className='car-detail-card'>
                <div className='car-detail-img-section'>
                    <img src={car.photo} alt={car.car_model} />
                </div>
                <div className='car-detail-text-section'>
                    <h2>{car.car_model}</h2>
                    <p><b><MdAirlineSeatReclineExtra />Seats </b> {car.seats}</p>
                    <p><b><MdEventAvailable /> Available </b>{car.available}</p>
                    <p><b><LuClipboardType /> Type </b>{car.type}</p>
                    <p><b><MdMyLocation /> Location </b> {car.location}</p>
                    <p><b><IoIosPricetags /> Price Per Day </b> {car.price_per_day} ₹</p>
                    <button className="car-rent-card-btn btn">Book Now</button>
                </div>
            </div>

            <h1>Suggested Cars</h1>
            <div className="car-rent-section">
                {suggestCar.map((car) => (
                    <Link to={`/car-rentals/${car.id}`} key={car.id} >
                        <div className="car-rent-card">
                            <img className="car-rent-card-img" src={car.photo} alt={car.car_model} />
                            <h3>{car.car_model}</h3>
                            <p><b><MdMyLocation /> {car.location}</b></p>
                            <button className="car-rent-card-btn btn">{car.price_per_day} ₹</button>
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    )
}

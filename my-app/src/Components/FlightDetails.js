import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';


export default function FlightDetails() {
    const { id } = useParams();
    const idNumber = parseInt(id, 10);

    const [Array1, setArray1] = useState([]);
    const [flight, setFlight] = useState(null);
    const [suggestFlights, setSuggestFlights] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const flightsRef = ref(db, '/flight');
            onValue(flightsRef, (snapshot) => {
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

    useEffect(() => {
        if (Array1.length > 0 && idNumber) {
            const selectedFlight = Array1.find((_, index) => index + 1 === idNumber);
            if (selectedFlight) {
                setFlight(selectedFlight);
                const suggestions = Array1.filter((flight, index) => 
                    flight.ArrivingCity === selectedFlight.ArrivingCity && index + 1 !== idNumber
                );
                setSuggestFlights(suggestions);
            }
        }
    }, [idNumber, Array1]);

    return (
        <div className='flight-detail-container'>
            {flight && (
                <div className='flight-detail-card'>
                    <div className='flight-detail-card-text'>
                        <div className='flight-detail-card-part-0'>
                            <img className='flight-detail-card-img' src={flight.img} alt={flight.FlightName} />
                            <h3>{flight.FlightCode}</h3>
                            <h2>{flight.FlightName}</h2>
                        </div>
                        <div className='flight-detail-card-part-1'>
                            <div className='flight-detail-card-part-11'>
                                <h2>{flight.ArrivingTime}</h2>
                                <p>{flight.ArrivingCity}</p>
                            </div>
                            <div className='flight-detail-card-part-22'>
                                <p>{flight.Duration}</p>
                                <hr />
                                <p>{flight.Price}₹</p>
                            </div>
                            <div className='flight-detail-card-part-33'>
                                <h2>{flight.DepartingTime}</h2>
                                <p>{flight.DepartingCity}</p>
                            </div>
                        </div>
                        <button className='btn flight-detail-btn'>Book Now</button>
                    </div>
                    <div className='flight-detail-card-img-section'>
                        <img className='flight-detail-card-img-section-img' src="https://www.pngall.com/wp-content/uploads/5/Aeroplane-PNG-HD-Image.png" alt="Aeroplane" />
                    </div>
                </div>
            )}

            <h1>Suggested Flights</h1>
            {suggestFlights.map((flight) => (
                <div className='flight-card-container' key={flight.id}>
                    <Link to={`/flight/${flight.id}`} >
                        <div className='flight-card'>
                            <div className='flight-card-part-0'>
                                <img className='flight-card-img' src={flight.img} alt={flight.FlightName} />
                                <h5>{flight.FlightName}</h5>
                            </div>
                            <div className='flight-card-part-1'>
                                <h3>{flight.ArrivingTime}</h3>
                                <p>{flight.ArrivingCity}</p>
                            </div>
                            <div className='flight-card-part-2'>
                                <p>{flight.Duration}</p>
                                <hr />
                                <p>{flight.Price}₹</p>
                            </div>
                            <div className='flight-card-part-3'>
                                <h3>{flight.DepartingTime}</h3>
                                <p>{flight.DepartingCity}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

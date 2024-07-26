import React, { useState, useEffect } from 'react';
import Hero from "../Components/Hero";
import vid from '../logos/vid4.mp4';
import Swal from 'sweetalert2';
import { getDatabase, ref, onValue } from 'firebase/database';

const Attraction = () => {
    const [Array1, setArray1] = useState([]);
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cityname, setCityname] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const attractionsRef = ref(db, '/attraction');
            onValue(attractionsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const attractionsArray = Object.values(data);
                    setArray1(attractionsArray);
                    setFilteredAttractions(attractionsArray); // Initially show all attractions
                } else {
                    setArray1([]);
                    setFilteredAttractions([]);
                }
                setLoading(false);
            });
        };

        fetchData();
    }, []);

    const heroObj = {
        heading: ' Explore The World ',
        p: '"Explore The World" is an invitation to embark on a journey of discovery, where every step brings new experiences and insights. Its a call to wander beyond familiar horizons, to seek out the beauty of diverse cultures, landscapes, and traditions that make our world so rich and fascinating.',
        video: vid
    };

    const searchAttraction = (el) => {
        el.preventDefault();

        const filtered = Array1.filter((e) => {
            if (cityname === '') {
                return true;
            } else if (e.city.toLowerCase().includes(cityname.toLowerCase())) {
                return true;
            } else if (e.name.toLowerCase().includes(cityname.toLowerCase())) {
                return true;
            }
            return false;
        });

        if (filtered.length === 0) {
            Swal.fire("Data is not available for this city!");
        } else {
            setFilteredAttractions(filtered);
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
                <form className="stay-form" onSubmit={searchAttraction}>
                    <input 
                        className="stay-form-city" 
                        type="text" 
                        placeholder="City Name" 
                        onChange={e => setCityname(e.target.value)}
                    />
                    <button className='btn'>Search</button>
                </form>
            </div>
            <div className="attraction-section">
                {filteredAttractions.map((e) => (
                    <div className="attraction-card" key={e.id}>
                        <div>
                            <img className="attraction-card-photo" src={e.img} alt={e.name} />
                        </div>
                        <div className="attraction-card-text">
                            <h1>{e.name}</h1>
                            <p>{e.dis}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Attraction;

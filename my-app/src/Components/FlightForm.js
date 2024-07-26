import React from 'react'
// toaster notification k liye
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

import { getDatabase, ref, onValue, update, get } from 'firebase/database';
import { useTheme } from '../theme/useTheme';

import Swal from 'sweetalert2';


export default function FlightForm() {


    const { isDarkMode } = useTheme();

    const database = getDatabase();
    const fetchDataFromDatabase = async (path, setter) => {
        const Ref = ref(database, path);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            setter(data ? Object.values(data) : []);
        });
    };


    const [flight, setFlight] = useState([]);

    useEffect(() => {
        fetchDataFromDatabase('/flight', setFlight);
    }, []);






    // Create Flight


    const [ArrivingCityFlight, setArrivingCityFlight] = useState('');
    const [ArrivingTimeFlight, setArrivingTimeFlight] = useState('');
    const [DepartingCityFlight, setDepartingCityFlight] = useState('');
    const [DepartingTimeFlight, setDepartingTimeFlight] = useState('');
    const [DurationFlight, setDurationFlight] = useState('');
    const [FlightCode, setFlightCode] = useState('');
    const [FlightName, setFlightName] = useState('');
    const [FlightImg, setFlightImg] = useState('');
    const [priceFlight, setPriceFlight] = useState('');



    async function addFlight(event) {
        event.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!"
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Added!",
                    text: "Your Data has been added.",
                    icon: "success"
                });
                const flightRef = ref(database, 'flight');
                get(flightRef).then(snapshot => {
                    const maxId = Math.max(...Object.keys(snapshot.val() || {}).map(key => parseInt(key))) || 0;
                    const newId = maxId + 1;
                    const newIdPlusOne = newId + 1;
                    update(ref(database, `flight/${newId}`), {
                        id: newIdPlusOne,
                        ArrivingCity: ArrivingCityFlight,
                        ArrivingTime: ArrivingTimeFlight,
                        DepartingCity: DepartingCityFlight,
                        DepartingTime: DepartingTimeFlight,
                        Duration: DurationFlight,
                        FlightCode: FlightCode,
                        img: FlightImg,
                        Price: priceFlight,
                        FlightName: FlightName
                    }).then(() => {

                        toast.success('Data added successfully', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: isDarkMode ? "dark" : "light",
                        });
                    }).catch(error => {
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
                });
            }
        });
    }


    // Update Flight

    const [updateArrivingCityFlight, setUpdateArrivingCityFlight] = useState('');
    const [updateArrivingTimeFlight, setUpdateArrivingTimeFlight] = useState('');
    const [updateDepartingCityFlight, setUpdateDepartingCityFlight] = useState('');
    const [updateDepartingTimeFlight, setUpdateDepartingTimeFlight] = useState('');
    const [updateDurationFlight, setUpdateDurationFlight] = useState('');
    const [updateFlightCode, setUpdateFlightCode] = useState('');
    const [updateFlightName, setUpdateFlightName] = useState('');
    const [updateFlightImg, setUpdateFlightImg] = useState('');
    const [updatepriceFlight, setUpdatePriceFlight] = useState('');
    const [updateIdFlight, setUpdateIdFlight] = useState('');

    const [selectedFlightId, setSelectedFlightId] = useState(null);

    async function updateFlight(event) {
        event.preventDefault();
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
                    text: "Your data has been edited.",
                    icon: "success"
                });
                if (!selectedFlightId) {
                    return;
                }
                const FlightRef = ref(database, `flight/${selectedFlightId}`);
                try {
                    await update(FlightRef, {
                        id: updateIdFlight,
                        ArrivingCity: updateArrivingCityFlight,
                        ArrivingTime: updateArrivingTimeFlight,
                        DepartingCity: updateDepartingCityFlight,
                        DepartingTime: updateDepartingTimeFlight,
                        Duration: updateDurationFlight,
                        FlightCode: updateFlightCode,
                        img: updateFlightImg,
                        Price: updatepriceFlight,
                        FlightName: updateFlightName
                    });
                    toast.success('Data updated successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: isDarkMode ? "dark" : "light",
                    });
                } catch (error) {
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
                }
            }
        });
    }


    //Privioue values of flight

    useEffect(() => {
        if (!selectedFlightId) {
            // Reset the update form fields if no hotel is selected
            setUpdateIdFlight('');
            setUpdateArrivingCityFlight('');
            setUpdateArrivingTimeFlight('');
            setUpdateDepartingCityFlight('');
            setUpdateDepartingTimeFlight('');
            setUpdateDurationFlight('');
            setUpdateFlightCode('');
            setUpdateFlightImg('');
            setUpdatePriceFlight('');
            setUpdateFlightName('');

            return;
        }

        const FlightRef = ref(database, `flight/${selectedFlightId}`);
        get(FlightRef)
            .then((snapshot) => {
                const flightData = snapshot.val();
                console.log('Fetched flight data:', flightData);
                if (flightData) {
                    setUpdateIdFlight(flightData.id || updateIdFlight);
                    setUpdateArrivingCityFlight(flightData.ArrivingCity || updateArrivingCityFlight);
                    setUpdateArrivingTimeFlight(flightData.ArrivingTime || updateArrivingTimeFlight);
                    setUpdateDepartingCityFlight(flightData.DepartingCity || updateDepartingCityFlight);
                    setUpdateDepartingTimeFlight(flightData.DepartingTime || updateDepartingTimeFlight);
                    setUpdateDurationFlight(flightData.Duration || updateDurationFlight);
                    setUpdateFlightCode(flightData.FlightCode || updateFlightCode);
                    setUpdateFlightImg(flightData.img || updateFlightImg);
                    setUpdatePriceFlight(flightData.Price || updatepriceFlight);
                    setUpdateFlightName(flightData.FlightName || updateFlightName);

                }
            })
            .catch((error) => {
                console.error('Error fetching flight data:', error);
            });
    }, [selectedFlightId]);



    return (
        <div className='admin-hotel-forms'>
            <form className='create-hotel-section' onSubmit={addFlight}>
                <h2>Create Flight Data</h2>
                <input type='text' placeholder='Arriving City' required value={ArrivingCityFlight} onChange={(e) => setArrivingCityFlight(e.target.value)} /><br />
                <input type='text' placeholder='Arriving Time' required value={ArrivingTimeFlight} onChange={(e) => setArrivingTimeFlight(e.target.value)} /><br />
                <input type='text' placeholder='Departing City' required value={DepartingCityFlight} onChange={(e) => setDepartingCityFlight(e.target.value)} /><br />
                <input type='text' placeholder='Departing Time' required value={DepartingTimeFlight} onChange={(e) => setDepartingTimeFlight(e.target.value)} /><br />
                <input type='text' placeholder='DurationFlight' required value={DurationFlight} onChange={(e) => setDurationFlight(e.target.value)} /><br />
                <input type='text' placeholder='Flight Code' required value={FlightCode} onChange={(e) => setFlightCode(e.target.value)} /><br />
                <input type='text' placeholder='Flight Name' required value={FlightName} onChange={(e) => setFlightName(e.target.value)} /><br />
                <input type='text' placeholder='Flight Img URL' required value={FlightImg} onChange={(e) => setFlightImg(e.target.value)} /><br />
                <input type='text' placeholder='Price' required value={priceFlight} onChange={(e) => setPriceFlight(e.target.value)} /><br />


                <button className='btn create-hotel-section-btn' type='submit'>Create Hotel <MdCreateNewFolder /></button>
            </form>

            <form className='create-hotel-section' onSubmit={updateFlight}>
                <div className='create-hotel-section-update-heading'>
                    <h2>Update Flight Data</h2>

                    <select value={selectedFlightId} onChange={(e) => setSelectedFlightId(e.target.value)}>
                        <option value="">Select a hotel</option>
                        {flight.map((e) => (
                            <option key={e.id} value={e.id - 1}>{e.id} from {e.ArrivingCity} - {e.DepartingCity}</option>
                        ))}
                    </select>

                </div>

                <input type='text' placeholder='Arriving City' required value={updateArrivingCityFlight} onChange={(e) => setUpdateArrivingCityFlight(e.target.value)} /><br />
                <input type='text' placeholder='Arriving Time' required value={updateArrivingTimeFlight} onChange={(e) => setUpdateArrivingTimeFlight(e.target.value)} /><br />
                <input type='text' placeholder='Departing City' required value={updateDepartingCityFlight} onChange={(e) => setUpdateDepartingCityFlight(e.target.value)} /><br />
                <input type='text' placeholder='Departing Time' required value={updateDepartingTimeFlight} onChange={(e) => setUpdateDepartingTimeFlight(e.target.value)} /><br />
                <input type='text' placeholder='Duration' required value={updateDurationFlight} onChange={(e) => setUpdateDurationFlight(e.target.value)} /><br />
                <input type='text' placeholder='Flight Code' required value={updateFlightCode} onChange={(e) => setUpdateFlightCode(e.target.value)} /><br />
                <input type='text' placeholder='Flight Name' required value={updateFlightName} onChange={(e) => setUpdateFlightName(e.target.value)} /><br />
                <input type='text' placeholder='Flight Img URL' required value={updateFlightImg} onChange={(e) => setUpdateFlightImg(e.target.value)} /><br />
                <input type='text' placeholder='Price' required value={updatepriceFlight} onChange={(e) => setUpdatePriceFlight(e.target.value)} /><br />

                <button className='btn create-hotel-section-btn' type='submit'>Edit Hotel <FaEdit /></button>
            </form>
            <ToastContainer />
        </div>
    )
}

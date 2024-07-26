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
export default function CarsForm() {


    const { isDarkMode } = useTheme();

    const database = getDatabase();
    const fetchDataFromDatabase = async (path, setter) => {
        const Ref = ref(database, path);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            setter(data ? Object.values(data) : []);
        });
    };


    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchDataFromDatabase('/cars', setCars);
    }, []);






    // Create Flight


    const [available, setAvailable] = useState('');
    const [car_model, setCar_model] = useState('');
    const [location, setLoaction] = useState('');
    const [photo, setPhoto] = useState('');
    const [price_per_day, setPrice_per_day] = useState('');
    const [seats, setSeats] = useState('');
    const [type, setType] = useState('');




    async function addCar(event) {
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
                const carRef = ref(database, 'cars');
                get(carRef).then(snapshot => {
                    const maxId = Math.max(...Object.keys(snapshot.val() || {}).map(key => parseInt(key))) || 0;
                    const newId = maxId + 1;
                    const newIdPlusOne = newId + 1;
                    update(ref(database, `cars/${newId}`), {
                        id: newIdPlusOne,
                        available: available,
                        car_model: car_model,
                        location: location,
                        photo: photo,
                        price_per_day: price_per_day,
                        seats: seats,
                        type: type

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


    // Update Car
    const [updateCar_model, setUpdateCar_model] = useState('');
    const [updateAvailable, setUpdateAvailable] = useState('');
    const [updateLocation, setUpdateLoaction] = useState('');
    const [updatePhoto, setUpdatePhoto] = useState('');
    const [updatePrice_per_day, setUpdatePrice_per_day] = useState('');
    const [updateSeats, setUpdateSeats] = useState('');
    const [updateType, setUpdateType] = useState('');
    const [updateId, setUpdateId] = useState('');

    const [selectedCarId, setSelectedCarId] = useState(null);

    async function updateCar(event) {
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
                    text: "Your Data has been edited.",
                    icon: "success"
                });
                if (!selectedCarId) {
                    return;
                }
                const CarRef = ref(database, `cars/${selectedCarId}`);
                try {
                    await update(CarRef, {
                        available: updateAvailable,
                        car_model: updateCar_model,
                        location: updateLocation,
                        photo: updatePhoto,
                        price_per_day: updatePrice_per_day,
                        seats: updateSeats,
                        type: updateType
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
        if (!selectedCarId) {

            setUpdateAvailable('');
            setUpdateLoaction('');
            setUpdatePhoto('');
            setUpdatePrice_per_day('');
            setUpdateSeats('');
            setUpdateType('');
            setUpdateCar_model('');
            return;
        }

        const Ref = ref(database, `cars/${selectedCarId}`);
        get(Ref)
            .then((snapshot) => {
                const Data = snapshot.val();
                console.log('Fetched car data:', Data);
                if (Data) {

                    setUpdateAvailable(Data.available || '');
                    setUpdateLoaction(Data.location || '');
                    setUpdatePhoto(Data.photo || '');
                    setUpdatePrice_per_day(Data.price_per_day || '');
                    setUpdateSeats(Data.seats || '');
                    setUpdateType(Data.type || '');
                    setUpdateCar_model(Data.car_model || '');


                }
            })
            .catch((error) => {
                console.error('Error fetching car data:', error);
            });
    }, [selectedCarId]);



    return (
        <div className='admin-hotel-forms'>
            <form className='create-hotel-section' onSubmit={addCar}>
                <h2>Create Car Data</h2>
                <input type='text' placeholder='Car Model' required value={car_model} onChange={(e) => setCar_model(e.target.value)} /><br />
                <input type='text' placeholder='Available' required value={available} onChange={(e) => setAvailable(e.target.value)} /><br />
                <input type='text' placeholder='location' required value={location} onChange={(e) => setLoaction(e.target.value)} /><br />
                <input type='text' placeholder='photo' required value={photo} onChange={(e) => setPhoto(e.target.value)} /><br />
                <input type='text' placeholder='price_per_day' required value={price_per_day} onChange={(e) => setPrice_per_day(e.target.value)} /><br />
                <input type='text' placeholder='seats' required value={seats} onChange={(e) => setSeats(e.target.value)} /><br />
                <input type='text' placeholder='type' required value={type} onChange={(e) => setType(e.target.value)} /><br />



                <button className='btn create-hotel-section-btn' type='submit'>Create Car Data <MdCreateNewFolder /></button>
            </form>

            <form className='create-hotel-section' onSubmit={updateCar}>
                <div className='create-hotel-section-update-heading'>
                    <h2>Update Car Data</h2>

                    <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)}>
                        <option value="">Select a Car</option>
                        {cars.map((e) => (
                            <option key={e.id} value={e.id - 1}>{e.id} {e.car_model}</option>
                        ))}
                    </select>

                </div>



                <input type='text' placeholder='Car Model' required value={updateCar_model} onChange={(e) => setUpdateCar_model(e.target.value)} /><br />
                <input type='text' placeholder='Available' required value={updateAvailable} onChange={(e) => setUpdateAvailable(e.target.value)} /><br />
                <input type='text' placeholder='location' required value={updateLocation} onChange={(e) => setUpdateLoaction(e.target.value)} /><br />
                <input type='text' placeholder='photo' required value={updatePhoto} onChange={(e) => setUpdatePhoto(e.target.value)} /><br />
                <input type='text' placeholder='price_per_day' required value={updatePrice_per_day} onChange={(e) => setUpdatePrice_per_day(e.target.value)} /><br />
                <input type='text' placeholder='seats' required value={updateSeats} onChange={(e) => setUpdateSeats(e.target.value)} /><br />
                <input type='text' placeholder='type' required value={updateType} onChange={(e) => setUpdateType(e.target.value)} /><br />


                <button className='btn create-hotel-section-btn' type='submit'>Edit Hotel <FaEdit /></button>
            </form>
            <ToastContainer />
        </div>
    )
}

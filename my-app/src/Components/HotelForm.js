import React from 'react'
// toaster notification k liye
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

import { getDatabase, ref, onValue, remove, set, update, get } from 'firebase/database';
import { useTheme } from '../theme/useTheme';

import Swal from 'sweetalert2';


export default function HotelForm() {


    const { isDarkMode } = useTheme();

    const database = getDatabase();
    const fetchDataFromDatabase = async (path, setter) => {
        const Ref = ref(database, path);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            setter(data ? Object.values(data) : []);
        });
    };


    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        fetchDataFromDatabase('/hotels', setHotel);
    }, []);








    // Create Hotel


    const [nameHotel, setNameHotel] = useState('');
    const [addressHotel, setAddressHotel] = useState('');
    const [cityHotel, setCityHotel] = useState('');
    const [descriptionHotel, setDescriptionHotel] = useState('');
    const [instaHotel, setInstaHotel] = useState('');
    const [mapHotel, setMapHotel] = useState('');
    const [url1Hotel, setUrl1Hotel] = useState('');
    const [url2Hotel, setUrl2Hotel] = useState('');
    const [url3Hotel, setUrl3Hotel] = useState('');
    const [priceHotel, setPriceHotel] = useState('');
    const [starHotel, setStarHotel] = useState('');


    async function addHotel(event) {
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
                    text: "Your file has been added.",
                    icon: "success"
                });
                const hotelsRef = ref(database, 'hotels');
                get(hotelsRef).then(snapshot => {
                    const maxId = Math.max(...Object.keys(snapshot.val() || {}).map(key => parseInt(key))) || 0;
                    const newId = maxId + 1;
                    const newIdPlusOne = newId + 1;
                    update(ref(database, `hotels/${newId}`), {
                        id: newIdPlusOne,
                        name: nameHotel,
                        address: addressHotel,
                        city: cityHotel,
                        description: descriptionHotel,
                        insta: instaHotel,
                        map: mapHotel,
                        photos: [url1Hotel, url2Hotel, url3Hotel],
                        price: priceHotel,
                        star: starHotel
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


    // Update Hotel

    const [updatenameHotel, setUpdateNameHotel] = useState('');
    const [updateaddressHotel, setUpdateAddressHotel] = useState('');
    const [updatecityHotel, setUpdateCityHotel] = useState('');
    const [updatedescriptionHotel, setUpdateDescriptionHotel] = useState('');
    const [updateinstaHotel, setUpdateInstaHotel] = useState('');
    const [updatemapHotel, setUpdateMapHotel] = useState('');
    const [updateurl1Hotel, setUpdateUrl1Hotel] = useState('');
    const [updateurl2Hotel, setUpdateUrl2Hotel] = useState('');
    const [updateurl3Hotel, setUpdateUrl3Hotel] = useState('');
    const [updatepriceHotel, setUpdatePriceHotel] = useState('');
    const [updatestarHotel, setUpdateStarHotel] = useState('');
    const [updateIdHotel, seUpdateIdHotel] = useState('');

    const [selectedHotelId, setSelectedHotelId] = useState(null);

    async function updateHotel(event) {
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
                    text: "Your file has been edited.",
                    icon: "success"
                });
                if (!selectedHotelId) {
                    return;
                }
                const hotelRef = ref(database, `hotels/${selectedHotelId}`);
                try {
                    await update(hotelRef, {
                        id: updateIdHotel,
                        name: updatenameHotel,
                        address: updateaddressHotel,
                        city: updatecityHotel,
                        description: updatedescriptionHotel,
                        insta: updateinstaHotel,
                        map: updatemapHotel,
                        photos: [updateurl1Hotel, updateurl2Hotel, updateurl3Hotel],
                        price: updatepriceHotel,
                        star: updatestarHotel
                    });
                    toast.success('Data Edit successfully', {
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



    //Privioue values

    useEffect(() => {
        if (!selectedHotelId) {
            // Reset the update form fields if no hotel is selected
            setUpdateNameHotel('');
            setUpdateAddressHotel('');
            setUpdateCityHotel('');
            setUpdateDescriptionHotel('');
            setUpdateInstaHotel('');
            setUpdateMapHotel('');
            setUpdateUrl1Hotel('');
            setUpdateUrl2Hotel('');
            setUpdateUrl3Hotel('');
            setUpdatePriceHotel('');
            setUpdateStarHotel('');
            seUpdateIdHotel('');
            return;
        }

        const hotelRef = ref(database, `hotels/${selectedHotelId}`);
        get(hotelRef)
            .then((snapshot) => {
                const hotelData = snapshot.val();
                console.log('Fetched hotel data:', hotelData);
                if (hotelData) {
                    setUpdateNameHotel(hotelData.name || '');
                    setUpdateAddressHotel(hotelData.address || '');
                    setUpdateCityHotel(hotelData.city || '');
                    setUpdateDescriptionHotel(hotelData.description || '');
                    setUpdateInstaHotel(hotelData.insta || '');
                    setUpdateMapHotel(hotelData.map || '');
                    setUpdateUrl1Hotel(hotelData.photos && hotelData.photos[0] ? hotelData.photos[0] : '');
                    setUpdateUrl2Hotel(hotelData.photos && hotelData.photos[1] ? hotelData.photos[1] : '');
                    setUpdateUrl3Hotel(hotelData.photos && hotelData.photos[2] ? hotelData.photos[2] : '');
                    setUpdatePriceHotel(hotelData.price || '');
                    setUpdateStarHotel(hotelData.star || '');
                    seUpdateIdHotel(hotelData.id || '');
                }
            })
            .catch((error) => {
                console.error('Error fetching hotel data:', error);
            });
    }, [selectedHotelId]);







    return (
        <div className='admin-hotel-forms'>

            <form className='create-hotel-section' onSubmit={addHotel}>
                <h2>Create Hotel</h2>
                <input type='text' placeholder='URL 1' required value={url1Hotel} onChange={(e) => setUrl1Hotel(e.target.value)} /><br />
                <input type='text' placeholder='URL 2' required value={url2Hotel} onChange={(e) => setUrl2Hotel(e.target.value)} /><br />
                <input type='text' placeholder='URL 3' required value={url3Hotel} onChange={(e) => setUrl3Hotel(e.target.value)} /><br />
                <input type='text' placeholder='Hotel Name' required value={addressHotel} onChange={(e) => setAddressHotel(e.target.value)} /><br />
                <input type='text' placeholder='Hotel Name' required value={cityHotel} onChange={(e) => setCityHotel(e.target.value)} /><br />
                <input type='text' placeholder='Hotel Name' required value={nameHotel} onChange={(e) => setNameHotel(e.target.value)} /><br />
                <input type='text' placeholder='Description' required value={descriptionHotel} onChange={(e) => setDescriptionHotel(e.target.value)} /><br />
                <input type='text' placeholder='Rating' required value={starHotel} onChange={(e) => setStarHotel(e.target.value)} /><br />
                <input type='text' placeholder='Instagram' required value={instaHotel} onChange={(e) => setInstaHotel(e.target.value)} /><br />
                <input type='text' placeholder='Map' required value={mapHotel} onChange={(e) => setMapHotel(e.target.value)} /><br />
                <input type='text' placeholder='Price' required value={priceHotel} onChange={(e) => setPriceHotel(e.target.value)} /><br />

                <button className='btn create-hotel-section-btn' type='submit'>Create Hotel <MdCreateNewFolder /></button>
            </form>

            <form className='create-hotel-section' onSubmit={updateHotel}>
                <div className='create-hotel-section-update-heading'>
                    <h2>Update Hotel</h2>

                    <select value={selectedHotelId} onChange={(e) => setSelectedHotelId(e.target.value)}>
                        <option value="">Select a hotel</option>
                        {hotel.map((hotel) => (
                            <option key={hotel.id} value={hotel.id - 1}>{hotel.id} {hotel.name}</option>
                        ))}
                    </select>

                </div>




                <input type='text' placeholder='URL 1' required value={updateurl1Hotel} onChange={(e) => setUpdateUrl1Hotel(e.target.value)} /><br />
                <input type='text' placeholder='URL 2' required value={updateurl2Hotel} onChange={(e) => setUpdateUrl2Hotel(e.target.value)} /><br />
                <input type='text' placeholder='URL 3' required value={updateurl3Hotel} onChange={(e) => setUpdateUrl3Hotel(e.target.value)} /><br />
                <input type='text' placeholder='Hotel Name' required value={updateaddressHotel} onChange={(e) => setUpdateAddressHotel(e.target.value)} /><br />
                <input type='text' placeholder='Hotel Name' required value={updatecityHotel} onChange={(e) => setUpdateCityHotel(e.target.value)} /><br />
                <input type='text' placeholder='Hotel Name' required value={updatenameHotel} onChange={(e) => setUpdateNameHotel(e.target.value)} /><br />
                <input type='text' placeholder='Description' required value={updatedescriptionHotel} onChange={(e) => setUpdateDescriptionHotel(e.target.value)} /><br />
                <input type='text' placeholder='Rating' required value={updatestarHotel} onChange={(e) => setUpdateStarHotel(e.target.value)} /><br />
                <input type='text' placeholder='Instagram' required value={updateinstaHotel} onChange={(e) => setUpdateInstaHotel(e.target.value)} /><br />
                <input type='text' placeholder='Map' required value={updatemapHotel} onChange={(e) => setUpdateMapHotel(e.target.value)} /><br />
                <input type='text' placeholder='Price' required value={updatepriceHotel} onChange={(e) => setUpdatePriceHotel(e.target.value)} /><br />

                <button className='btn create-hotel-section-btn' type='submit'>Edit Hotel <FaEdit /></button>
            </form>
            <ToastContainer />
        </div>
    )
}

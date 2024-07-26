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






export default function AttractionForm() {


    const { isDarkMode } = useTheme();

    const database = getDatabase();
    const fetchDataFromDatabase = async (path, setter) => {
        const Ref = ref(database, path);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            setter(data ? Object.values(data) : []);
        });
    };


    const [attraction, setAttraction] = useState([]);

    useEffect(() => {
        fetchDataFromDatabase('/attraction', setAttraction);
    }, []);






    // Create Attraction


    const [city, setCity] = useState('');
    const [dis, setDis] = useState('');
    const [img, setImg] = useState('');
    const [name, setName] = useState('');





    async function addAttraction(event) {
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
    
                const attractionRef = ref(database, 'attraction');
                get(attractionRef).then(snapshot => {
                    const maxId = Math.max(...Object.keys(snapshot.val() || {}).map(key => parseInt(key))) || 0;
                    const newId = maxId + 1;
                    const newIdPlusOne = newId + 1;
                    update(ref(database, `attraction/${newId}`), {
                        id: newIdPlusOne,
                        city: city,
                        dis: dis,
                        img: img,
                        name: name
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

    // Update Attraction
    const [updateCity, setUpdateCity] = useState('');
    const [updateDis, setUpdateDis] = useState('');
    const [updateImg, setUpdateImg] = useState('');
    const [updateName, setUpdateName] = useState('');


    const [selectedAttractionId, setSelectedAttractionId] = useState(null);



    async function updateAttraction(event) {
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
    
                if (!selectedAttractionId) {
                    return;
                }
    
                const CarRef = ref(database, `attraction/${selectedAttractionId}`);
                try {
                    await update(CarRef, {
                        city: updateCity,
                        dis: updateDis,
                        img: updateImg,
                        name: updateName
                    });
    
                    toast.success('data updated successfully', {
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
    



    //Privioue values of Attraction

    useEffect(() => {
        if (!selectedAttractionId) {

            setUpdateCity('');
            setUpdateDis('');
            setUpdateImg('');
            setUpdateName('');

            return;
        }

        const Ref = ref(database, `attraction/${selectedAttractionId}`);
        get(Ref)
            .then((snapshot) => {
                const Data = snapshot.val();
                console.log('Fetched car data:', Data);
                if (Data) {

                    setUpdateCity(Data.city || '');
                    setUpdateDis(Data.dis || '');
                    setUpdateImg(Data.img || '');
                    setUpdateName(Data.name || '');



                }
            })
            .catch((error) => {
                console.error('Error fetching Attraction data:', error);
            });
    }, [selectedAttractionId]);





    return (
        <div className='admin-hotel-forms'>
            <form className='create-hotel-section' onSubmit={addAttraction}>
                <h2>Create Attraction Data</h2>
                <input type='text' placeholder='Name of Attraction' required value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type='text' placeholder='City of Attraction' required value={city} onChange={(e) => setCity(e.target.value)} /><br />
                <input type='text' placeholder='Description' required value={dis} onChange={(e) => setDis(e.target.value)} /><br />
                <input type='text' placeholder='photo' required value={img} onChange={(e) => setImg(e.target.value)} /><br />



                <button className='btn create-hotel-section-btn' type='submit'>Create Attraction Data <MdCreateNewFolder /></button>
            </form>

            <form className='create-hotel-section' onSubmit={updateAttraction}>
                <div className='create-hotel-section-update-heading'>
                    <h2>Update Attraction Data</h2>

                    <select value={selectedAttractionId} onChange={(e) => setSelectedAttractionId(e.target.value)}>
                        <option value="">Select a Attraction</option>
                        {attraction.map((e) => (
                            <option key={e.id} value={e.id - 1}>{e.id} {e.name}</option>
                        ))}
                    </select>

                </div>



                <input type='text' placeholder='Name of Attraction' required value={updateName} onChange={(e) => setUpdateName(e.target.value)} /><br />
                <input type='text' placeholder='City of Attraction' required value={updateCity} onChange={(e) => setUpdateCity(e.target.value)} /><br />
                <input type='text' placeholder='Description' required value={updateDis} onChange={(e) => setUpdateDis(e.target.value)} /><br />
                <input type='text' placeholder='photo' required value={updateImg} onChange={(e) => setUpdateImg(e.target.value)} /><br />


                <button className='btn create-hotel-section-btn' type='submit'>Edit Attraction <FaEdit /></button>
            </form>


            <ToastContainer />
        
        </div>
    )
}

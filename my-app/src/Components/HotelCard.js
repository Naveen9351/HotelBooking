import { useState, useEffect } from 'react';

import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const HotelCard = ({ hotel }) => {

    // whan someone hover on card image changes

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentPhotoIndex((prevIndex) =>
                    prevIndex === hotel.photos.length - 1 ? 0 : prevIndex + 1
                );
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isHovered, hotel.photos.length]);






    //Description and Address restiction

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength
            ? `${description.substring(0, maxLength)}...`
            : description;
    };
    const truncateAddress = (address, maxLength) => {
        return address.length > maxLength
            ? `${address.substring(0, maxLength)}...`
            : address;
    };




    // to convert int star into element star

    const [stars, setStars] = useState([]);

    useEffect(() => {
        const numStars = parseInt(hotel.star);

        const newStars = [];
        for (let i = 0; i < numStars; i++) {
            newStars.push(<FaStar key={i} />);
        }
        setStars(newStars);
    }, [hotel.star]);







    return (

        <div className="c-ard" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}  >
            <div className="c-ard-photos">

                <img
                    src={hotel.photos[currentPhotoIndex]}
                    alt={`Photo ${currentPhotoIndex + 1}`}
                />
            </div>

            <div className='c-ard-text'>
                <h3 className='text1'>{hotel.name}</h3>
                <p className='text2'>{truncateDescription(hotel.description, 90)}</p>
                <div className="rating">{stars}</div>
                <div className='c-ard-text-combine'>
                    <p className='text2'><FaLocationDot /> {truncateAddress(hotel.address, 20)}</p>
                </div>


            </div>
            <button className='btn c-ard-price'>{hotel.price}₹</button>



        </div>

    )
}

export default HotelCard;




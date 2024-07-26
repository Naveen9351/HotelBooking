import { useTheme } from '../theme/useTheme';

import { FaWifi } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { TbBath } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { FaPersonSwimming } from "react-icons/fa6";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { MdOutlineBreakfastDining } from "react-icons/md";
import { FaSpa } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { PiWine } from "react-icons/pi";

const HotelService = () => {
    const { isDarkMode } = useTheme();
    return (
        <>
            <div className="hotel-service-heading"> <h1>SERVICES</h1> </div>
            <div className={`hotel-service-section ${isDarkMode ? 'dark' : 'light'}`}>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><FaWifi /></div>
                    <div className="hotel-service-card-text">FAST WIFI</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><FiCoffee /></div>
                    <div className="hotel-service-card-text">COFFEE</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><TbBath /></div>
                    <div className="hotel-service-card-text">BATH</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><FaCar /></div>
                    <div className="hotel-service-card-text">PARKING SPACE</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><FaPersonSwimming /></div>
                    <div className="hotel-service-card-text">SWIMMING POOL</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><MdOutlineLocalLaundryService /></div>
                    <div className="hotel-service-card-text">LAUNDRY SERVICE</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><MdOutlineBreakfastDining /></div>
                    <div className="hotel-service-card-text">BREAKFAST</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><FaSpa /></div>
                    <div className="hotel-service-card-text">SPA</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><MdFastfood /></div>
                    <div className="hotel-service-card-text">ROOM DELEVARY</div>
                </div>

                <div className="hotel-service-card">
                    <div className="hotel-service-card-logo"><PiWine /></div>
                    <div className="hotel-service-card-text">WELCOM DRINK</div>
                </div>
            </div>
        </>
    );
}

export default HotelService;
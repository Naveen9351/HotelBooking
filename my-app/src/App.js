import React, { useEffect, Suspense, lazy } from "react";
import './CSS/style.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";



import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import { useTheme } from "./theme/useTheme";


const Stays = lazy(() => import("./Pages/Stays"));
const Flight = lazy(() => import("./Pages/Flight"));
const CarRentals = lazy(() => import("./Pages/CarRentals"));
const Attraction = lazy(() => import("./Pages/Attraction"));
const Register = lazy(() => import("./Pages/Register"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const Contact = lazy(() => import("./Components/Contact"));
const About = lazy(() => import("./Components/About"));
const NoPage = lazy(() => import("./Components/NoPage"));
const HotelDetails = lazy(() => import("./Components/HotelDetails"));
const FlightDetails = lazy(() => import("./Components/FlightDetails"));
const AdminPanel = lazy(() => import("./Components/AdminPanel"));
const CarRentalsDetails = lazy(() => import("./Components/CarRentalsDetails"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const App = () => {
  const { isDarkMode } = useTheme();



  return (
    <div className={`b ${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <Nav />
        <ScrollToTop />
        <Suspense fallback={<div className="loading-spinner">
          <div className="spinner"></div>
        </div>}>
          <Routes>
            <Route path="/" element={<Stays />} />
            <Route path="/flight" element={<Flight />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            <Route path="/attraction" element={<Attraction />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/:id" element={<HotelDetails />} />
            <Route path="/flight/:id" element={<FlightDetails />} />
            <Route path="/car-rentals/:id" element={<CarRentalsDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

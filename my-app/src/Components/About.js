// About.js
import { useTheme } from '../theme/useTheme';
import CustomerService from './CustomerService';

const About = () => {

    const { isDarkMode } = useTheme();
    return (
        <div className='about-section'>
            <div className={`about-container ${isDarkMode ? 'dark' : 'light'}`}>
                <h2 className="about-title">About Us</h2>
                <p className="about-text">
                    YatraYojana ( यात्रा योजना ) is a hotel booking web application that makes travel planning easier and more enjoyable.
                    With our app, you can explore a wide range of hotels, find the perfect accommodation for your trip, and book with confidence.
                </p>
                <div className="highlights">
                    <h3 className="highlight-title">Key Features</h3>
                    <ul className="highlight-list">
                        <li className="highlight-item">Robust hotel booking web application developed using React and Firebase authentication.</li>
                        <li className="highlight-item">User authentication features, including login and registration, using Firebase Authentication API.</li>
                        <li className="highlight-item">Seamless navigation with React Router for a smooth user experience.</li>
                        <li className="highlight-item">Dynamic hotel card section displaying various hotel details fetched from an API.</li>
                        <li className="highlight-item">Responsive web design for seamless access on different devices.</li>
                    </ul>
                </div>
                <p className="about-text">
                    We are dedicated to providing you with the best travel experience possible.
                    Our team works tirelessly to ensure that every aspect of your trip is taken care of, so you can focus on making memories that last a lifetime.
                    Whether you're traveling for business or pleasure, YatraYojana is here to help you every step of the way.
                </p>

           
        <p>
          Welcome to <strong>Explore the World Tours</strong>, your premier destination for unforgettable travel experiences. Our mission is to provide you with exceptional tour planning services that cater to your unique interests and preferences. Whether you're seeking adventure, relaxation, cultural immersion, or a combination of all three, we have the perfect itinerary for you.
        </p>
        <p>
          Founded in 2010, our company has been dedicated to making travel dreams come true. With a team of experienced travel experts and local guides, we ensure that every aspect of your journey is meticulously planned and executed, allowing you to fully immerse yourself in the beauty and wonder of your chosen destination.
        </p>
        <h3>Our Values</h3>
        <ul>
          <li><strong>Customer Satisfaction:</strong> Your happiness is our top priority. We go above and beyond to provide personalized service and support throughout your travel experience.</li>
          <li><strong>Integrity:</strong> We believe in honesty and transparency in all our dealings. You can trust us to deliver what we promise.</li>
          <li><strong>Passion for Travel:</strong> Our love for travel drives us to create unique and memorable experiences for our clients. We are passionate about exploring new destinations and sharing that passion with you.</li>
          <li><strong>Sustainability:</strong> We are committed to responsible tourism practices that minimize our impact on the environment and support local communities.</li>
        </ul>
        <h3>Our Services</h3>
        <ul>
          <li>Customized tour packages tailored to your interests and budget</li>
          <li>Expert travel advice and itinerary planning</li>
          <li>Local guides with in-depth knowledge of the destinations</li>
          <li>Accommodation, transportation, and activity arrangements</li>
          <li>24/7 customer support during your trip</li>
        </ul>
        <p>
          Thank you for choosing <strong>Explore the World Tours</strong> as your travel partner. We look forward to helping you create lasting memories on your next adventure!
        </p>

        <CustomerService />

            </div>
          

        </div>
    );
};

export default About;

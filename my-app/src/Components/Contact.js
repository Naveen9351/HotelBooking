// Contact.js
import { useState } from 'react';
import { useTheme } from '../theme/useTheme';

// toaster notification k liye
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//firebase
import { getDatabase, ref, push, set } from 'firebase/database';

const Contact = () => {
    const { isDarkMode } = useTheme();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    // fatch firebase

    const db = getDatabase();
    const setData = async (e) => {
        e.preventDefault();
        if (db) {
            try {
                const newDataRef = push(ref(db, 'contact'));
                const currentDate = new Date().toLocaleDateString();
                const currentTime = new Date().toLocaleTimeString();
                await set(ref(db, `contact/${name}`), {
                    Name: name,
                    Email: email,
                    Message: message,
                    Date: currentDate,
                    Time: currentTime
                });
                

                if (isDarkMode === true) {
                    toast.success('Your message has been successfully sent', {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
            
                    });
                  }
                  else {
                    toast.success('Your message has been successfully sent', {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
            
                    });
                  }


            } catch (error) {
                console.error("Error adding data:", error);
            }
        } else {
            if (isDarkMode === true) {
                toast.error('Failed to send message. Please try again later', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
        
                });
              }
              else {
                toast.error('Failed to send message. Please try again later', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
        
                });
              }
             
        }

        setName("");
        setEmail("");
        setMessage("");
    };



    return (
        <div className={`contact-container ${isDarkMode ? 'dark' : 'light'}`}>
            
            <form onSubmit={setData}>
            <h2>Message Us</h2>
            <p>Feel free to reach out to us for any inquiries or feedback!</p>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required />

                <label htmlFor="email">Email:</label>
                <input type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required />

                <label htmlFor="message">Message:</label>
                <textarea id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    required></textarea>

                <button type="submit">Submit</button>
            </form>
            <img src='https://img.freepik.com/free-vector/contact-concept_23-2147503162.jpg?t=st=1716204584~exp=1716208184~hmac=bdcdae01cfd6aa1506f08aa50145f6d21dae57829bc825f81bec965aca4ee566&w=740'/>
            <ToastContainer />
        </div>
    );
};

export default Contact;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC3JdLJsryjNPhs4Pv0JRMDldApx2M_giU",
  authDomain: "hotal-booking-app-da1ed.firebaseapp.com",
  projectId: "hotal-booking-app-da1ed",
  storageBucket: "hotal-booking-app-da1ed.appspot.com",
  messagingSenderId: "326104370003",
  appId: "1:326104370003:web:2bf9a7fc6493f09826efa6",
  measurementId: "G-4ZCTKD0N0S",
  databaseURL: "https://hotal-booking-app-da1ed-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };

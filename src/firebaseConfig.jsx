import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";   
const firebaseConfig = {
    apiKey: "AIzaSyDZEuROwnzh5iJc08wPQAtCZ8mpyUyABX0",
    authDomain: "movie-recommendation-9451b.firebaseapp.com",
    projectId: "movie-recommendation-9451b",
    storageBucket: "movie-recommendation-9451b.firebasestorage.app",
    messagingSenderId: "643041126023",
    appId: "1:643041126023:web:810cb0b816b11313f5ba22",
    measurementId: "G-57217BEXKZ"
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
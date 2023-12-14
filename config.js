import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyB4bFDNGPhxWyBc3b9DSU3W1Ung1mOopTE",
    authDomain: "my-app-f0b6b.firebaseapp.com",
    projectId: "my-app-f0b6b",
    storageBucket: "my-app-f0b6b.appspot.com",
    messagingSenderId: "1096630887765",
    appId: "1:1096630887765:web:b7e86fb2927696613d7bdc",
    measurementId: "G-G775KHD85Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
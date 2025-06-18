// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfqRBYp5SMMsXCncinjxftrExC2163LG8",
    authDomain: "salonsage-d7ad1.firebaseapp.com",
    projectId: "salonsage-d7ad1",
    storageBucket: "salonsage-d7ad1.firebasestorage.app",
    messagingSenderId: "666064992805",
    appId: "1:666064992805:web:94e6466f8ef4d54eae9dcc",
    measurementId: "G-C6H181TFC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
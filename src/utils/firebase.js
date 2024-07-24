// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuGi6yDjmgbBrQPPUU2N-AUuitPkTgJRo",
  authDomain: "netflixgpt-a8548.firebaseapp.com",
  projectId: "netflixgpt-a8548",
  storageBucket: "netflixgpt-a8548.appspot.com",
  messagingSenderId: "767431879778",
  appId: "1:767431879778:web:56c4e6546c34e2f2eef53b",
  measurementId: "G-D47FC4705G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
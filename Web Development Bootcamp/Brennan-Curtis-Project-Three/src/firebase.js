// Import the functions to configure and initialize our firebase app.
import { initializeApp } from "firebase/app";
// Import the function to pull in the Firebase realtime database service
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpa0x7UIQYEwMWB6ckwCLQpb4F5Ie2asM",
  authDomain: "neuromancy-73107.firebaseapp.com",
  projectId: "neuromancy-73107",
  storageBucket: "neuromancy-73107.appspot.com",
  messagingSenderId: "497151143955",
  appId: "1:497151143955:web:34b676c7250ee1b60b8fe6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a to the database
const realtime = getDatabase(app);

export default realtime;
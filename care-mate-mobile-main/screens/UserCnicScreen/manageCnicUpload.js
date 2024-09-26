import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
// import {initializeApp} from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyC6AzRqWG3Cnh1H9lepFWevCoP5S6pmQ",
    authDomain: "care-mate-ab834.firebaseapp.com",
    projectId: "care-mate-ab834",
    storageBucket: "care-mate-ab834.appspot.com",
    
    appId: "1:120868483448:web:9fc8172c1aac229941588d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase};

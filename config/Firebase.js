// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbo3KztF85aebBcEyhBY8u9JaCZLI8lfI",
  authDomain: "vroom-412215.firebaseapp.com",
  projectId: "vroom-412215",
  storageBucket: "vroom-412215.appspot.com",
  messagingSenderId: "982525205172",
  appId: "1:982525205172:web:f3293338a259415ec5d5e1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

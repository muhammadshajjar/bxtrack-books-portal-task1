// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa29HdkaewJVz2hPVYBHI7qOkIl83QNzI",
  authDomain: "books-portal-98d4b.firebaseapp.com",
  projectId: "books-portal-98d4b",
  storageBucket: "books-portal-98d4b.appspot.com",
  messagingSenderId: "816837612360",
  appId: "1:816837612360:web:41c8241421651f0ddd997d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

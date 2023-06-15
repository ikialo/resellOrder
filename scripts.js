// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, getDoc , collection, addDoc} from  'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsaZwPkGNOPUJcezRIQtL-wm885DKE8zQ",
    authDomain: "orderfood-529e4.firebaseapp.com",
    projectId: "orderfood-529e4",
    storageBucket: "orderfood-529e4.appspot.com",
    messagingSenderId: "661462235816",
    appId: "1:661462235816:web:646e1bf0e7fe8f03c2a09d",
    measurementId: "G-VRN1W4CC77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, getDoc , collection, addDoc} from  'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

var Latte;
var Cappuccino;
var Espresso;
var sum;

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

const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

// try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }


function total() {

  Latte = parseInt(document.getElementById("qty1").value);
  Cappuccino = parseInt(document.getElementById("qty2").value);
  Espresso = parseInt(document.getElementById("qty3").value);
  sum = (Latte * 2) + (Cappuccino * 5) + (Espresso * 3);
  document.getElementById("total_cost").innerHTML = "USD "+sum+".00";

}
async function submit( )  {
 
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        Chicken: Latte,
        Beef: Cappuccino,
        Lamb: Espresso,
        Total: sum
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Your Order has been Submitted, Successfully!"+ uid);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // ...
  } else {
    // User is signed out
    // ...

    console.log("signed out ");
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }
});


}


document.getElementById('total').addEventListener('click', total);

document.getElementById('submit').addEventListener('click', submit);
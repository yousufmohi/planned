// USING version 9.6.10 as newer versions requires using the SDK (i.e installing with npm)
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
   getFirestore,
   collection,
   getDocs,
   addDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    "[REDACTED]"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth,function(user) {
    if (user) {
        window.location.href = 'logged.html'
    } else {
      console.log("no user");
    }
});


const db = getFirestore();
// collection has documents which contains fields like "names"
const ref = collection(db, 'users');

// form elements
const email = document.getElementById("log-email");
const password = document.getElementById("log-password");
const form = document.getElementById("log-form");

document.getElementById("log-form").addEventListener("invalid", function (event) {
   event.preventDefault();
   console.log("invalid");
}, true);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.email);
      console.log(user.displayName);
      window.location.href = 'logged.html';
    })
    .catch((error) => {
        console.log(error.message);
    });
});



document.addEventListener('DOMContentLoaded', () => {
   const txt = 'Planned';
   let i = 0;
   const textElement = document.querySelector('.demo');
   const cursor = document.querySelector('.cursor');
   function typeWriter() {
       if (i < txt.length) {
           textElement.innerHTML += txt[i];
           i++;
           setTimeout(typeWriter, 100); 
       } else {
         cursor.style.display = 'inline';
       }
   }

   typeWriter();
   cursor.style.display = 'none';
});
    
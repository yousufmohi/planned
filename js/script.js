// USING version 9.6.10 as newer versions requires using the SDK (i.e installing with npm)
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
   getFirestore,
   collection,
   getDocs,
   addDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
   "REDACTED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth,function(user) {
   if (user) {
      if(window.location.href == '/planned/pages/Home.html') {
         console.log("outta here");
      }
   } else {
     console.log("no user");
   }
});


const db = getFirestore();
// collection has documents which contains fields like "names"
const ref = collection(db, 'users');

// waiting for promise to be fulfilled
getDocs(ref).then((snapshot) => {
   let users = []
   snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id })
   })
})
   .catch(err => {
      console.log(err.message)
   })

// form elements
const email = document.getElementById("reg-email");
const name = document.getElementById("reg-name");
const password = document.getElementById("reg-password");
const form = document.getElementById("reg-form");

document.getElementById("reg-form").addEventListener("invalid", function (event) {
   event.preventDefault();
   console.log("invalid");
}, true);

// signup form
form.addEventListener("submit", (e) => {
   // prevents page from auto refreshing, allowing for data to save
   e.preventDefault();

   createUserWithEmailAndPassword(auth,email.value,password.value).then(cred => {
      var add = {
         uid: cred.user.accessToken,
         name: name.value
      }
      // setting display name of user with "name" input field
      updateProfile(cred.user, {
         displayName: name.value
     }).then(() => {
         console.log("name set");
     }).catch((err) => {
         console.log(err.message);
     });
      form.reset();
      addDoc(ref,add);
   }).catch(err => {
      console.log(err.message);
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
    
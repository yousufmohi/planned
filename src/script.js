// USING version 9.6.10 as newer versions requires using the SDK (i.e installing with npm)
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
   getFirestore,
   collection,
   getDocs,
   addDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
   "[REDACTED]"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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

// 
const email = document.getElementById("email");
const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.getElementById("reg-form");

document.getElementById("reg-form").addEventListener("invalid", function (event) {
   event.preventDefault();
   console.log("invalid");
}, true);


// signup form



form.addEventListener("submit", (e) => {
   // prevents page from auto refreshing, allowing for data to save
   e.preventDefault();
   console.log(email.value);
   console.log(name.value);
   console.log(password.value);

   createUserWithEmailAndPassword(auth,email.value,password.value).then(cred => {

      form.reset();

      var add = {
         uid: cred.user.accessToken,
         name:name.value
      }
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

      console.log(err);
   });
});


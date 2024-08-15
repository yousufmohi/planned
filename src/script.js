// USING version 9.6.10 as newer versions requires using the SDK (i.e installing with npm)
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  "[REDACTED]"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
// collection has documents which contains fields like "names"
const ref = collection(db, 'users');

// waiting for promise to be fulfilled
getDocs(ref).then((snapshot) => {
   let users = []
   snapshot.docs.forEach((doc) => {
      users.push({...doc.data(),id: doc.id})
   })
   console.log(users);
})
.catch(err => {
   console.log(err.message)
}) 

 const email = document.getElementById("email");
 const name = document.getElementById("name");
 const password = document.getElementById("password");
 const form = document.getElementById("reg-form");

 document.getElementById( "reg-form" ).addEventListener("invalid", function( event ) {
     event.preventDefault();
     console.log("invalid");
 }, true );

 function submitHandler (e) {
  // prevents page from auto refreshing, allowing for data to save
   e.preventDefault();
   console.log(email.value);
   console.log(name.value);
   console.log(password.value);
  //  storing name,email,password in an object
   var docData = {
     name: name.value || null,
     email: email.value || null,
     password: password.value || null,
   }
  // using addDoc to add the document(data) to table
   addDoc(ref,docData).then(() => {
     console.log(docData);
   })
   .catch(err => {
     console.log(err.message);
   }) 
}

 form.addEventListener("submit", submitHandler);

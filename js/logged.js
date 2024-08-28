// USING version 9.6.10 as newer versions requires using the SDK (i.e installing with npm)
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
   getFirestore,
   collection,
   getDocs,
   addDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    "REDACTED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// checking the current user's status
const user = auth.currentUser;
const profileName = document.getElementById("profile-name");
const h1 = document.createElement("h1");

const sidebar = document.querySelector(".sidebar");
const sidebarRetract = document.querySelector(".retract");

sidebar.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

onAuthStateChanged(auth,function(user) {
    if (user) {
        // appending name to DOM if user is signed in
        profileName.innerHTML= user.displayName;
    } else {
        window.location.href = '/planned/pages/Home.html'
        document.body.classList.remove('hidden');
    }
});

// signing user out
document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href = '/planned/pages/Home.html';
      }).catch((error) => {
        console.log(error.message);
      });
})


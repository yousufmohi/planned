// USING version 9.6.10 as newer versions requires using the SDK (i.e installing with npm)
import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
   getFirestore,
   collection,
   getDocs,
   addDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


const firebaseConfig = {
    "[REDACTED]"
};
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// checking the current user's status 
onAuthStateChanged(auth, function(user) {
    if (user) {
        // Redirect if user is authenticated
        window.location.href = 'logged.html';
    } else {
        // Show the homepage content if no user is authenticated
        document.body.classList.remove('hidden');
    }
});
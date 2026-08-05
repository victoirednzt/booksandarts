import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyAGM6HzZvyxq431YReIRph6uA0IERnGJZ0",
    authDomain: "books-and-arts.firebaseapp.com",
    projectId: "books-and-arts",
    storageBucket: "books-and-arts.firebasestorage.app",
    messagingSenderId: "771831331479",
    appId: "1:771831331479:web:e8b1dc5e5ddfce6e25c7d2"
};



const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
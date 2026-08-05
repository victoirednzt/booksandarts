import { db } from "./firebase.js";


import {
    collection,
    getDocs
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const container =
    document.getElementById("booksContainer");



async function loadCommunity() {


    container.innerHTML =
        "Chargement des recommandations 🌸";


    const snapshot =
        await getDocs(
            collection(db, "recommendations")
        );


    container.innerHTML = "";


    snapshot.forEach(doc => {


        const item = doc.data();


        const card =
            document.createElement("article");


        card.className = "book-card";


        card.innerHTML = `

        <div class="book-info">

            <span class="tag">
                ${item.category}
            </span>


            <h3>
                ${item.title}
            </h3>


            <p class="author">
    ${item.author || ""}
</p>

<p class="recommended-by">
    ✨ Recommandé par ${item.username || "Anonyme"}
</p>

            <div class="rating">
                ${item.rating} ⭐
            </div>


            <p class="review">
                ${item.recommendation}
            </p>


        </div>

        `;


        container.appendChild(card);


    });

}


window.loadCommunity = loadCommunity;
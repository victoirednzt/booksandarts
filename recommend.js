import { db } from "./firebase.js";

import {
    collection,
    addDoc
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const form =
    document.getElementById("recommendForm");

async function getCover(title, author) {

    try {

        const query = encodeURIComponent(
            `${title} ${author}`
        );


        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );


        const data = await response.json();


        console.log("Google Books :", data);



        if (data.items) {


            for (const item of data.items) {


                const info = item.volumeInfo;


                if (info.imageLinks) {

                    return info.imageLinks.thumbnail
                        .replace("http://", "https://");

                }

            }

        }


    } catch (error) {

        console.log(error);

    }


    return "https://via.placeholder.com/150x220?text=No+Cover";

}

form.addEventListener(
    "submit",
    async (e) => {


        e.preventDefault();

        const cover =
            await getCover(
                document.getElementById("title").value,
                document.getElementById("author").value
            );

        console.log("cover trouvée :", cover);

        await addDoc(
            collection(db, "recommendations"),
            {


                category:
                    document.getElementById("category").value,


                title:
                    document.getElementById("title").value,


                author:
                    document.getElementById("author").value,


                rating:
                    Number(
                        document.getElementById("rating").value
                    ),

                username:
                    document.getElementById("username").value || "anonaïïïme",

                cover: cover,

                recommendation:
                    document.getElementById("recommendation").value,


                date:
                    new Date()

            }
        );



        alert("Merci pour ta recommandation 🌸");

        form.reset();

        window.location.href = "index.html";


    });
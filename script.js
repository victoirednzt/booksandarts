const container = document.getElementById("booksContainer");

const searchInput = document.getElementById("searchInput");

const filters = document.querySelectorAll(".category");


let currentFilter = "Books";


/* =========================
   ETOILES
========================= */


function createRating(rating) {

    let result = "";

    const fullStars = Math.floor(rating);

    const halfStar = rating % 1 !== 0;

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);



    for (let i = 0; i < fullStars; i++) {

        result += `<span class="star full">★</span>`;

    }



    if (halfStar) {

        result += `<span class="star half">★</span>`;

    }



    for (let i = 0; i < emptyStars; i++) {

        result += `<span class="star empty">☆</span>`;

    }


    return result;

}



/* =========================
   AFFICHAGE BOOKS
========================= */


function displayBooks(list) {


    container.innerHTML = "";


    list.forEach(book => {



        const card = document.createElement("article");


        card.className = "book-card";



        card.onclick = () => {

            window.location.href =
                `book.html?id=${book.id}`;

        };



        card.innerHTML = `


        <div class="cover">

            <img 
            src="${book.cover}"
            alt="${book.title}"
            >

        </div>



        <div class="book-info">


            <span class="tag">
                ${book.genre}
            </span>



            <h3>
                ${book.title}
            </h3>



            <p class="author">
                ${book.author}
            </p>



            <div class="rating">

                ${createRating(book.rating)}

            </div>



            <div class="keywords">

                ${book.keywords.map(word =>
            `<span>${word}</span>`
        ).join("")}

            </div>



            <h4 class="date">

                📖 ${book.date}

            </h4>



        </div>


        `;



        container.appendChild(card);


    });


}




/* =========================
   AFFICHAGE ARTS
========================= */


function displayArts(list) {


    container.innerHTML = "";


    list.forEach(art => {



        const card = document.createElement("article");


        card.className = "book-card art-card";



        card.onclick = () => {

            window.location.href =
                `book.html?art=${art.id}`;

        };



        card.innerHTML = `


        <div class="cover">

            <img 
            src="${art.cover}"
            alt="${art.title}"
            >

        </div>



        <div class="book-info">


            <span class="tag">

                ${art.type}

            </span>



            <h3>

                ${art.title}

            </h3>



            <p class="author">

                ${art.artist}

            </p>



            <div class="rating">

                ${createRating(art.rating)}

            </div>



            <div class="keywords">

                ${art.keywords.map(word =>
            `<span>${word}</span>`
        ).join("")}

            </div>



            <p class="review">

                ${art.review}

            </p>



            <h4 class="date">

                ✨ ${art.date}

            </h4>


        </div>


        `;



        container.appendChild(card);


    });


}





/* =========================
   FILTRAGE
========================= */


function filterContent() {


    let result;



    if (currentFilter === "Books") {


        result = books;



        const search =
            searchInput.value.toLowerCase();



        if (search) {

            result = result.filter(book =>

                book.title
                    .toLowerCase()
                    .includes(search)

                ||

                book.author
                    .toLowerCase()
                    .includes(search)

            );

        }



        displayBooks(result);


    }



    else if (currentFilter === "Arts") {


        result = arts;



        const search =
            searchInput.value.toLowerCase();



        if (search) {

            result = result.filter(art =>

                art.title
                    .toLowerCase()
                    .includes(search)

                ||

                art.artist
                    .toLowerCase()
                    .includes(search)

            );

        }



        displayArts(result);

    }

    else if (currentFilter === "Community") {

        loadCommunity();

    }
}


async function loadCommunity() {


    container.innerHTML = "Chargement des recommandations 🌸";


    const response =
        await fetch(
            "https://firestore.googleapis.com/v1/projects/books-and-arts/databases/(default)/documents/recommendations"
        );


    const data =
        await response.json();


    const recommendations =
        data.documents.map(doc => {


            return {

                category:
                    doc.fields.category.stringValue,


                title:
                    doc.fields.title.stringValue,


                author:
                    doc.fields.author?.stringValue || "",


                rating:
                    Number(
                        doc.fields.rating.doubleValue ||
                        doc.fields.rating.integerValue
                    ),


                recommendation:
                    doc.fields.recommendation.stringValue

            };


        });


    displayCommunity(recommendations);


}


/* =========================
   BOUTONS
========================= */


filters.forEach(button => {


    button.addEventListener(
        "click",
        () => {


            filters.forEach(btn =>
                btn.classList.remove("active")
            );



            button.classList.add("active");



            currentFilter =
                button.dataset.filter;



            filterContent();


        }
    );


});




/* =========================
   RECHERCHE
========================= */


searchInput.addEventListener(
    "input",
    filterContent
);





/* =========================
   DEMARRAGE
========================= */


filterContent();

async function displayCommunity(list) {


    container.innerHTML = "";


    list.forEach(item => {


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
${item.author || "Anonyme"}
</p>


<div class="rating">

${createRating(item.rating)}

</div>


<p class="review">
${item.recommendation}
</p>


</div>

`;


        container.appendChild(card);


    });


}
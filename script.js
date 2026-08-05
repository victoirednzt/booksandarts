const container = document.getElementById("booksContainer");

const searchInput = document.getElementById("searchInput");

const filters = document.querySelectorAll(".category");


let currentFilter = "Tout";

function createRating(rating) {

    let result = "";

    const fullStars = Math.floor(rating);

    const halfStar = rating % 1 !== 0;

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);



    // étoiles pleines
    for (let i = 0; i < fullStars; i++) {

        result += `<span class="star full">★</span>`;

    }



    // demi étoile
    if (halfStar) {

        result += `<span class="star half">★</span>`;

    }



    // étoiles vides
    for (let i = 0; i < emptyStars; i++) {

        result += `<span class="star empty">☆</span>`;

    }


    return result;

}

function displayBooks(list) {


    container.innerHTML = "";



    list.forEach(book => {


        const stars = createRating(book.rating);



        const card = document.createElement("article");


        card.className = "book-card";



        card.onclick = () => {

            window.location.href = `book.html?id=${book.id}`;

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

                ${stars}

            </div>



            <p class="review">

                ${book.keywords}

            </p>

            <h4 class="date">
            
                ${book.date}
            </h4>


        </div>


        `;



        container.appendChild(card);


    });


}





function filterBooks() {


    let result = books;



    if (currentFilter !== "Tout") {


        result = result.filter(book =>

            book.genre === currentFilter

        );


    }



    const search = searchInput.value.toLowerCase();



    if (search) {


        result = result.filter(book =>


            book.title.toLowerCase().includes(search)

            ||

            book.author.toLowerCase().includes(search)

        );


    }



    displayBooks(result);


}





searchInput.addEventListener(
    "input",
    filterBooks
);




filters.forEach(button => {


    button.addEventListener(
        "click",
        () => {


            filters.forEach(btn =>
                btn.classList.remove("active")
            );



            button.classList.add("active");



            currentFilter = button.innerText
                .replace("📖 ", "")
                .replace("🎨 ", "")
                .replace("📝 ", "");



            filterBooks();


        }
    );


});



displayBooks(books);
const detail = document.getElementById("bookDetail");


const params = new URLSearchParams(
    window.location.search
);


const id = Number(
    params.get("id")
);



const book = books.find(
    b => b.id === id
);



detail.innerHTML = `


<img 
class="detail-cover"
src="${book.cover}"
>



<h1>
${book.title}
</h1>


<h3>
${book.author}
</h3>



<div class="keywords">

${book.keywords.map(word =>

    `<span>${word}</span>`

).join("")}

</div>




<p>

${book.description}

</p>



<div>

⭐ ${book.rating}/5

</div>


<p class="reading-date">

📖 ${book.date}

</p>


`;
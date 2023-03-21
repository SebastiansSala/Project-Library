const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const add = document.querySelector("#add");
const main = document.querySelector(".main-flex");

const myLibrary = [];
let idCounter = 0;

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = ++idCounter;
}

function removeBook(book, card){
  const index = myLibrary.findIndex(b => b.id === book.id);
    myLibrary.splice(index, 1);
    main.removeChild(card);
    console.log(myLibrary)
}

function displayBook(book) {
  const card = document.createElement("div");

  const title = document.createElement("p");
  card.classList.add("card");
  title.textContent = `${book.title}`;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `${book.author}`;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `${book.pages}`;
  card.appendChild(pages);

  const read = document.createElement("button");
  read.textContent = `In progress`;
  read.setAttribute("id", `read-${book.id}`);
  read.classList.add("progress");
  card.appendChild(read);

  const remove = document.createElement("button");
  remove.textContent = `Remove`;
  remove.setAttribute("id", `remove-${book.id}`);
  remove.classList.add("remove");
  card.appendChild(remove);

  main.appendChild(card);

  read.addEventListener("click", (event) => {
    if (event.target.textContent === "In progress") {
      event.target.textContent = "Completed";
      event.target.classList.remove("progress");
      event.target.classList.add("completed");
    } else {
      event.target.textContent = "In progress";
      event.target.classList.remove("completed");
      event.target.classList.add("progress");
    }
  });

  remove.addEventListener('click', () => removeBook(book, card));
}


function addBookToLibrary(event) {
    event.preventDefault();
    const book = new Book(title.value, author.value, pages.value);
    myLibrary.push(book);
    displayBook(book);
    console.log(myLibrary)
}

add.addEventListener("click", (event) => addBookToLibrary(event));





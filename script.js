let myLibrary = [];
const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");

const add = document.querySelector("#add");
const main = document.querySelector(".main-flex");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function displayBook() {
  const book = document.createElement("div");
  book.classList.add("card");
  main.appendChild(book);
}

function addBookToLibrary() {
  add.addEventListener("click", (event) => {
    event.preventDefault();
    const book = new Book(title, author, pages);
    console.log(book)
    myLibrary.push(book);
    displayBook();
  });
}

addBookToLibrary();

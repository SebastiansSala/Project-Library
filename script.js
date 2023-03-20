const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const add = document.querySelector("#add");
const main = document.querySelector(".main-flex");

let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
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
  read.setAttribute('id', 'button');
  read.classList.add('progress');
  card.appendChild(read); 

  main.appendChild(card);

  read.addEventListener('click', (event) => {
    if(event.target.textContent === 'In progress'){
      event.target.textContent = 'Completed';
      event.target.classList.remove('progress');
      event.target.classList.add('completed');
    }else{
      event.target.textContent = 'In progress';
      event.target.classList.remove('completed');
      event.target.classList.add('progress');
    }
  })
}

function addBookToLibrary() {
  add.addEventListener("click", (event) => {
    event.preventDefault();
    const book = new Book(title.value, author.value, pages.value);
    myLibrary.push(book)
    console.log(myLibrary)
    displayBook(book);
  });
}

addBookToLibrary();


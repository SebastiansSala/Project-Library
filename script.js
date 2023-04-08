const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const add = document.querySelector("#add");
const main = document.querySelector(".main-flex");

const myLibrary = [];
let idCounter = 0;

function Book(title, author, pages, readState) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
  this.id = ++idCounter;
}

function removeBook(book, card) {
  const index = myLibrary.findIndex((b) => b.id === book.id);
  myLibrary.splice(index, 1);
  main.removeChild(card);
}

function displayBook(book) {
  const card = document.createElement("div");

  const title = document.createElement("p");
  card.classList.add("bookCard");
  title.textContent = `${book.title}`;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `${book.author}`;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `${book.pages}`;
  card.appendChild(pages);

  const read = document.createElement("button");
  if(book.readState === false){
    read.textContent = `Completed`;
    read.setAttribute("id", `read-${book.id}`);
    read.classList.add("completed");
  }else{
    read.textContent = `In progress`;
    read.setAttribute("id", `read-${book.id}`);
    read.classList.add("progressBook");
  }
  card.appendChild(read);

  const remove = document.createElement("button");
  remove.textContent = `Remove`;
  remove.setAttribute("id", `remove-${book.id}`);
  remove.classList.add("removed");
  card.appendChild(remove);

  main.appendChild(card);

  read.addEventListener("click", (event) => {
    if (event.target.textContent === "In progress") {
      event.target.textContent = "Completed";
      event.target.classList.remove("progressBook");
      event.target.classList.add("completed");
      book.readState = false;
    } else {
      event.target.textContent = "In progress";
      event.target.classList.remove("completed");
      event.target.classList.add("progressBook");
      book.readState = true
    }
    console.log( myLibrary)
  });

  remove.addEventListener("click", () => removeBook(book, card));
}

const renderModal = (event) => {
  event.preventDefault();
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="miModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="miModalLabel">Create Task</h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" placeholder="Book title">
              </div>
              <div class="form-group">
                <label for="author">Author</label>
                <input type='number' class="form-control" id="author" rows="3" placeholder="Author's Name"></input>
              </div>
              <div class="form-group">
                <label for="pages">Pages</label>
                <input type='text' class="form-control" id="pages" rows="3" placeholder="# pages"></input>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="read">
                <label class="form-check-label" for="read">
                  Read
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="notRead" checked>
                <label class="form-check-label" for="notRead">
                  Not read
                </label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="save-name">Guardar tarea</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  const saveButton = modalContainer.querySelector("#save-name");
  saveButton.addEventListener("click", () => {
    const titleInput = modalContainer.querySelector("#title");
    const authorInput = modalContainer.querySelector("#author");
    const pagesInput = modalContainer.querySelector("#pages");
    const readInput = modalContainer.querySelector("#read");
    const notReadInput = modalContainer.querySelector("#notRead");
    let readState = null;

    if (readState) {
      readState = readInput.checked;
    } else {
      readState = notReadInput.checked;
    }

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;

    if (!title || !author || !pages) {
      return;
    } else {
      addBookToLibrary(title, author, pages, readState)
      modal.hide();
    }
  });

  const modal = new bootstrap.Modal(modalContainer.querySelector("#miModal"));

  modal.show();
};

function addBookToLibrary(title, author, pages, readState) {
  const book = new Book(title, author, pages, readState);
  myLibrary.push(book);
  displayBook(book);
  console.log(myLibrary);
}

add.addEventListener("click", (event) => renderModal(event));
